"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { randomBytes } from "crypto";
import { getPrisma } from "@/lib/db/prisma";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { sendRawEmail } from "@/lib/integrations/email";
import { site } from "@/config/site";
import {
  hashPassword,
  verifyPassword,
  verifyDummyPassword,
  isPasswordStrong,
} from "./password";
import {
  createSession,
  destroySession,
  invalidateUserSessions,
  hashToken,
} from "./session";
import { getCurrentUser, requirePermission } from "./rbac";
import { writeAuditLog } from "./audit";
import { getAdminDict } from "@/lib/adminI18n";
import { clientIp } from "@/lib/http/clientIp";
import { ROLE_KEYS, ADMIN_ASSIGNABLE_ROLES } from "./permissions";

export type ActionState = { error?: string; ok?: boolean; info?: string };

async function reqMeta() {
  const h = await headers();
  return {
    ipAddress: clientIp(h),
    userAgent: h.get("user-agent") ?? undefined,
  };
}

const INVITE_TTL_MS = 72 * 60 * 60 * 1000;
const RESET_TTL_MS = 60 * 60 * 1000;

// ── In-memory login throttle (single-instance; mirrors the lead limiter) ──
// Caps failed attempts per IP and per email over a rolling window so bcrypt
// cost isn't the only brute-force speed bump. Swap for a shared store when
// scaling to multiple instances.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILS = 10;
const loginFails = new Map<string, number[]>();

function recentLoginFails(key: string): number {
  const now = Date.now();
  const recent = (loginFails.get(key) ?? []).filter((t) => now - t < LOGIN_WINDOW_MS);
  if (recent.length === 0) loginFails.delete(key);
  else loginFails.set(key, recent);
  return recent.length;
}
function recordLoginFail(key: string): void {
  const recent = loginFails.get(key) ?? [];
  recent.push(Date.now());
  loginFails.set(key, recent);
}
function clearLoginFails(...keys: string[]): void {
  for (const k of keys) loginFails.delete(k);
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const t = await getAdminDict();
  const db = getPrisma();
  if (!db) return { error: t.errors.notAvailable };

  const meta = await reqMeta();
  const generic: ActionState = { error: t.errors.invalidCreds };
  const ipKey = `ip:${meta.ipAddress}`;
  const emailKey = `em:${email}`;

  // Throttle brute force per IP and per email before touching the hash.
  if (
    process.env.RATE_LIMIT_ENABLED !== "false" &&
    (recentLoginFails(ipKey) >= LOGIN_MAX_FAILS ||
      recentLoginFails(emailKey) >= LOGIN_MAX_FAILS)
  ) {
    await logSystemEvent({
      severity: "WARNING",
      eventType: "auth.login_throttled",
      message: "Login throttled (too many attempts)",
      ipAddress: meta.ipAddress,
    });
    return { error: t.errors.tooManyAttempts };
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    // Run a throwaway hash compare so unknown users cost the same as real ones.
    await verifyDummyPassword(password);
    recordLoginFail(ipKey);
    recordLoginFail(emailKey);
    await logSystemEvent({
      severity: "WARNING",
      eventType: "auth.login_failed",
      message: "Login failed (unknown user)",
      ipAddress: meta.ipAddress,
    });
    return generic;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    recordLoginFail(ipKey);
    recordLoginFail(emailKey);
    await writeAuditLog({
      action: "auth.login_failed",
      entityType: "user",
      entityId: user.id,
      ...meta,
    });
    return generic;
  }

  if (user.status !== "ACTIVE") {
    return { error: t.errors.notActive };
  }

  clearLoginFails(ipKey, emailKey);
  await createSession(user.id, meta);
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await writeAuditLog({
    actorUserId: user.id,
    action: "auth.login_success",
    entityType: "user",
    entityId: user.id,
    ...meta,
  });
  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<void> {
  const user = await getCurrentUser();
  if (user) {
    await writeAuditLog({
      actorUserId: user.id,
      action: "auth.logout",
      entityType: "user",
      entityId: user.id,
    });
  }
  await destroySession();
  redirect("/admin/login");
}

export async function acceptInviteAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const t = await getAdminDict();
  if (!isPasswordStrong(password)) {
    return { error: t.errors.passwordShort };
  }

  const db = getPrisma();
  if (!db) return { error: t.errors.notAvailable };

  const invite = await db.inviteToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    return { error: t.errors.inviteInvalid };
  }

  // Never let an invite re-activate a suspended/deactivated/rejected account.
  const existingUser = await db.user.findUnique({
    where: { email: invite.email },
    select: { status: true },
  });
  if (
    existingUser &&
    existingUser.status !== "ACTIVE" &&
    existingUser.status !== "PENDING_APPROVAL"
  ) {
    return { error: t.errors.inviteInvalid };
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.upsert({
    where: { email: invite.email },
    update: { passwordHash, status: "ACTIVE", name: name || undefined },
    create: {
      email: invite.email,
      name: name || invite.email.split("@")[0],
      passwordHash,
      status: "ACTIVE",
    },
  });

  if (invite.roleKey) {
    const role = await db.role.findUnique({ where: { key: invite.roleKey } });
    if (role) {
      await db.userRole.upsert({
        where: { userId_roleId: { userId: user.id, roleId: role.id } },
        update: {},
        create: { userId: user.id, roleId: role.id, assignedBy: invite.createdById },
      });
    }
  }

  await db.inviteToken.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date() },
  });
  await writeAuditLog({
    action: "auth.invite_accepted",
    entityType: "user",
    entityId: user.id,
  });
  redirect("/admin/login?invited=1");
}

export async function requestResetAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const db = getPrisma();
  // Always return the same generic response — never reveal if the email exists.
  if (!db) return { ok: true };

  const user = await db.user.findUnique({ where: { email } });
  if (user && user.status === "ACTIVE") {
    const token = randomBytes(32).toString("hex");
    await db.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt: new Date(Date.now() + RESET_TTL_MS),
      },
    });
    const link = `${site.url}/admin/reset?token=${token}`;
    await sendRawEmail({
      to: user.email,
      subject: "MenQ admin — password reset",
      text: `Reset your password:\n${link}\n\nThis link expires in 1 hour.`,
    }).catch(() => {});
    await writeAuditLog({
      actorUserId: user.id,
      action: "auth.password_reset_requested",
      entityType: "user",
      entityId: user.id,
    });
  }
  return { ok: true };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const t = await getAdminDict();
  if (!isPasswordStrong(password)) {
    return { error: t.errors.passwordShort };
  }

  const db = getPrisma();
  if (!db) return { error: t.errors.notAvailable };

  const prt = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!prt || prt.usedAt || prt.expiresAt < new Date()) {
    return { error: t.errors.resetInvalid };
  }

  const passwordHash = await hashPassword(password);
  await db.user.update({ where: { id: prt.userId }, data: { passwordHash } });
  await db.passwordResetToken.update({
    where: { id: prt.id },
    data: { usedAt: new Date() },
  });
  await invalidateUserSessions(prt.userId); // reset invalidates all sessions
  await writeAuditLog({
    action: "auth.password_reset_completed",
    entityType: "user",
    entityId: prt.userId,
  });
  redirect("/admin/login?reset=1");
}

/** Admin-only: create an invite for a non-super-admin role. Returns the link
 * (also emailed) so it can be shown/copied in the admin UI. */
export async function createInviteAction(input: {
  email: string;
  roleKey: string;
}): Promise<ActionState & { link?: string }> {
  const actor = await requirePermission("users.create");
  const t = await getAdminDict();
  if (input.roleKey === "super_admin") {
    return { error: t.errors.superAdminInvite };
  }
  if (!(ROLE_KEYS as readonly string[]).includes(input.roleKey)) {
    return { error: t.errors.roleNotAllowed };
  }
  // Only a Super Admin may invite an Admin; Admins are limited to the lower tier.
  if (
    !actor.isSuperAdmin &&
    !(ADMIN_ASSIGNABLE_ROLES as readonly string[]).includes(input.roleKey)
  ) {
    return { error: t.errors.roleNotAllowed };
  }
  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) return { error: t.errors.invalidEmail };

  const db = getPrisma();
  if (!db) return { error: t.errors.notAvailable };

  const token = randomBytes(32).toString("hex");
  await db.inviteToken.create({
    data: {
      email,
      tokenHash: hashToken(token),
      roleKey: input.roleKey,
      createdById: actor.id,
      expiresAt: new Date(Date.now() + INVITE_TTL_MS),
    },
  });
  const link = `${site.url}/admin/accept-invite?token=${token}`;
  await sendRawEmail({
    to: email,
    subject: "You're invited to the MenQ admin panel",
    text: `You've been invited as ${input.roleKey}. Set your password:\n${link}\n\nThis link expires in 72 hours.`,
  }).catch(() => {});
  await writeAuditLog({
    actorUserId: actor.id,
    action: "auth.invite_created",
    entityType: "user",
    metadata: { email, roleKey: input.roleKey },
  });
  return { ok: true, link };
}
