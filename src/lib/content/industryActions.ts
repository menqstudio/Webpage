"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";

const LOCALES = ["hy", "en", "ru"];

function readForm(fd: FormData) {
  const lang = String(fd.get("language") ?? "hy");
  return {
    language: LOCALES.includes(lang) ? lang : "hy",
    title: String(fd.get("title") ?? "").trim().slice(0, 200),
    slug: String(fd.get("slug") ?? "").trim().slice(0, 200),
    group: String(fd.get("group") ?? "").trim() || null,
    description: String(fd.get("description") ?? "").trim() || null,
    recommendedSolutions: String(fd.get("recommendedSolutions") ?? "").trim() || null,
    iconKey: String(fd.get("iconKey") ?? "").trim() || null,
    order: Number(fd.get("order")) || 0,
    seoTitle: String(fd.get("seoTitle") ?? "").trim() || null,
    seoDescription: String(fd.get("seoDescription") ?? "").trim() || null,
  };
}

export async function createIndustryAction(fd: FormData): Promise<void> {
  const actor = await requirePermission("industries.create");
  const db = getPrisma();
  if (!db) return;
  const data = readForm(fd);
  if (data.title.length < 2 || !data.slug) return;
  const created = await db.industry.create({ data: { ...data, status: "DRAFT" } });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "industry.created",
    entityType: "industry",
    entityId: created.id,
  });
  revalidatePath("/admin/industries");
  redirect(`/admin/industries/${created.id}`);
}

export async function updateIndustryAction(fd: FormData): Promise<void> {
  const actor = await requirePermission("industries.edit");
  const id = String(fd.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) return;
  const data = readForm(fd);
  await db.industry.update({ where: { id }, data });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "industry.updated",
    entityType: "industry",
    entityId: id,
  });
  revalidatePath("/admin/industries");
  revalidatePath(`/admin/industries/${id}`);
  redirect(`/admin/industries/${id}`);
}

export async function setIndustryStatusAction(fd: FormData): Promise<void> {
  const id = String(fd.get("id") ?? "");
  const status = String(fd.get("status") ?? "");
  if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) return;
  const perm =
    status === "PUBLISHED"
      ? "industries.publish"
      : status === "ARCHIVED"
        ? "industries.archive"
        : "industries.edit";
  const actor = await requirePermission(perm);
  const db = getPrisma();
  if (!db || !id) return;
  await db.industry.update({ where: { id }, data: { status: status as never } });
  await writeAuditLog({
    actorUserId: actor.id,
    action: `industry.${status.toLowerCase()}`,
    entityType: "industry",
    entityId: id,
  });
  revalidatePath("/admin/industries");
  revalidatePath(`/admin/industries/${id}`);
}
