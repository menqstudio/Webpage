import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db/prisma";
import { SESSION_COOKIE, hashToken } from "./session";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  status: string;
  roles: string[];
  permissions: Set<string>;
  isSuperAdmin: boolean;
};

/**
 * Resolves the authenticated admin user from the session cookie, with their
 * roles + flattened permission set. Cached per request via React `cache`.
 * Returns null when no DB, no/invalid/expired session, or user not ACTIVE.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const db = getPrisma();
  if (!db) return null;

  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  let session;
  try {
    session = await db.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: { include: { permissions: { include: { permission: true } } } },
              },
            },
          },
        },
      },
    });
  } catch {
    // DB configured but unreachable → treat as unauthenticated (no crash).
    return null;
  }

  if (!session || session.expiresAt < new Date()) return null;

  const user = session.user;
  if (user.status !== "ACTIVE") return null;

  const roleKeys = user.roles.map((ur) => ur.role.key);
  const permissions = new Set<string>();
  for (const ur of user.roles) {
    for (const rp of ur.role.permissions) {
      permissions.add(rp.permission.key);
    }
  }
  const isSuperAdmin = roleKeys.includes("super_admin") || permissions.has("*");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    roles: roleKeys,
    permissions,
    isSuperAdmin,
  };
});

export function userHasPermission(
  user: CurrentUser | null,
  permission: string,
): boolean {
  if (!user) return false;
  if (user.isSuperAdmin) return true;
  return user.permissions.has(permission);
}

export function userHasAnyPermission(
  user: CurrentUser | null,
  permissions: string[],
): boolean {
  if (!user) return false;
  if (user.isSuperAdmin) return true;
  return permissions.some((p) => user.permissions.has(p));
}

/** Server guard: redirect to login if unauthenticated. */
export async function requireUser(loginPath = "/admin/login"): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(loginPath);
  return user;
}

/** Server guard: 403 page if the user lacks the permission. */
export async function requirePermission(permission: string): Promise<CurrentUser> {
  const user = await requireUser();
  if (!userHasPermission(user, permission)) {
    redirect("/admin/forbidden");
  }
  return user;
}

/** Server guard: requires ANY of the given permissions. */
export async function requireAnyPermission(
  permissions: string[],
): Promise<CurrentUser> {
  const user = await requireUser();
  if (!userHasAnyPermission(user, permissions)) {
    redirect("/admin/forbidden");
  }
  return user;
}
