"use server";

import { revalidatePath } from "next/cache";
import type { PrismaClient } from "@prisma/client";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { invalidateUserSessions } from "./session";
import { ROLE_KEYS, ADMIN_ASSIGNABLE_ROLES } from "./permissions";

async function targetHasRole(
  db: PrismaClient,
  userId: string,
  roleKey: string,
): Promise<boolean> {
  const roles = await db.userRole.findMany({
    where: { userId },
    include: { role: true },
  });
  return roles.some((r) => r.role.key === roleKey);
}

function targetIsSuperAdmin(db: PrismaClient, userId: string): Promise<boolean> {
  return targetHasRole(db, userId, "super_admin");
}

export async function deactivateUserAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("users.deactivate");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id || id === actor.id) return; // never deactivate yourself
  if (await targetIsSuperAdmin(db, id)) return; // never touch a super admin
  // Only a Super Admin may act on another Admin.
  if (!actor.isSuperAdmin && (await targetHasRole(db, id, "admin"))) return;

  await db.user.update({
    where: { id },
    data: { status: "DEACTIVATED", deactivatedAt: new Date(), deactivatedById: actor.id },
  });
  await invalidateUserSessions(id);
  await writeAuditLog({
    actorUserId: actor.id,
    action: "user.deactivated",
    entityType: "user",
    entityId: id,
  });
  revalidatePath("/admin/users");
}

export async function reactivateUserAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("users.reactivate");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id || id === actor.id) return;
  if (await targetIsSuperAdmin(db, id)) return;
  if (!actor.isSuperAdmin && (await targetHasRole(db, id, "admin"))) return;

  await db.user.update({
    where: { id },
    data: { status: "ACTIVE", deactivatedAt: null, deactivatedById: null },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "user.reactivated",
    entityType: "user",
    entityId: id,
  });
  revalidatePath("/admin/users");
}

export async function changeUserRoleAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("users.edit");
  const id = String(formData.get("id") ?? "");
  const roleKey = String(formData.get("roleKey") ?? "");
  const db = getPrisma();
  if (!db || !id) return;
  if (roleKey === "super_admin") return; // can't grant super admin from the UI
  if (!(ROLE_KEYS as readonly string[]).includes(roleKey)) return;
  if (id === actor.id) return; // don't change your own role here
  if (await targetIsSuperAdmin(db, id)) return; // can't modify a super admin
  // Non-super admins may only assign the lower tier and never touch an Admin.
  if (!actor.isSuperAdmin) {
    if (!(ADMIN_ASSIGNABLE_ROLES as readonly string[]).includes(roleKey)) return;
    if (await targetHasRole(db, id, "admin")) return;
  }

  const role = await db.role.findUnique({ where: { key: roleKey } });
  if (!role) return;

  // Single-role model for MVP: replace existing roles.
  await db.userRole.deleteMany({ where: { userId: id } });
  await db.userRole.create({ data: { userId: id, roleId: role.id, assignedBy: actor.id } });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "user.role_changed",
    entityType: "user",
    entityId: id,
    newValue: roleKey,
  });
  revalidatePath("/admin/users");
}
