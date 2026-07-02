import { PrismaClient } from "@prisma/client";
import {
  ALL_PERMISSIONS,
  ROLE_PERMISSIONS,
  ROLE_META,
  ROLE_KEYS,
  permissionParts,
} from "../src/lib/auth/permissions";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  // 1) Permission catalog
  for (const key of ALL_PERMISSIONS) {
    const { domain, action } = permissionParts(key);
    await prisma.permission.upsert({
      where: { key },
      update: { domain, action },
      create: { key, domain, action },
    });
  }
  console.log(`Seeded ${ALL_PERMISSIONS.length} permissions.`);

  // 2) Roles + role→permission assignments
  for (const roleKey of ROLE_KEYS) {
    const meta = ROLE_META[roleKey];
    const role = await prisma.role.upsert({
      where: { key: roleKey },
      update: { name: meta.name, description: meta.description, isSystem: true },
      create: { key: roleKey, name: meta.name, description: meta.description, isSystem: true },
    });

    const assigned = ROLE_PERMISSIONS[roleKey];
    const keys = assigned.includes("*") ? ALL_PERMISSIONS : assigned;
    const permRows = await prisma.permission.findMany({ where: { key: { in: keys } } });

    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    await prisma.rolePermission.createMany({
      data: permRows.map((p) => ({ roleId: role.id, permissionId: p.id })),
      skipDuplicates: true,
    });
    console.log(`Role ${roleKey}: ${permRows.length} permissions.`);
  }

  // 3) Super admin user (created once; never overwrites an existing password)
  const email = (process.env.ADMIN_EMAIL ?? "admin@menq.local").toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });

  // Never mint a brand-new super admin with the known default password in prod.
  if (!existing && !process.env.ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
    throw new Error(
      "Refusing to seed a super admin with the default password in production. Set ADMIN_PASSWORD and re-run.",
    );
  }

  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Super Admin", passwordHash, status: "ACTIVE" },
  });

  const superRole = await prisma.role.findUnique({ where: { key: "super_admin" } });
  if (superRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: superRole.id } },
      update: {},
      create: { userId: user.id, roleId: superRole.id },
    });
  }

  if (existing) {
    console.log(`Super admin already exists: ${email} (password unchanged).`);
  } else {
    console.log(`Created super admin: ${email}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.log("⚠  Using default password 'ChangeMe123!' — set ADMIN_PASSWORD and re-seed, or reset it.");
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
