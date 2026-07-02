"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission, userHasPermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { ignoreMissingRecord } from "@/lib/errors";

const LOCALES = ["hy", "en", "ru"];

function readForm(fd: FormData) {
  const features = String(fd.get("features") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const lang = String(fd.get("language") ?? "hy");
  return {
    language: LOCALES.includes(lang) ? lang : "hy",
    title: String(fd.get("title") ?? "").trim().slice(0, 200),
    slug: String(fd.get("slug") ?? "").trim().slice(0, 200),
    category: String(fd.get("category") ?? "").trim() || null,
    shortDescription: String(fd.get("shortDescription") ?? "").trim() || null,
    businessValue: String(fd.get("businessValue") ?? "").trim() || null,
    fullDescription: String(fd.get("fullDescription") ?? "").trim() || null,
    iconKey: String(fd.get("iconKey") ?? "").trim() || null,
    order: Number(fd.get("order")) || 0,
    features,
    seoTitle: String(fd.get("seoTitle") ?? "").trim() || null,
    seoDescription: String(fd.get("seoDescription") ?? "").trim() || null,
  };
}

export async function createServiceAction(fd: FormData): Promise<void> {
  const actor = await requirePermission("services.create");
  const db = getPrisma();
  if (!db) return;
  const data = readForm(fd);
  if (data.title.length < 2 || !data.slug) return;
  const created = await db.service.create({ data: { ...data, status: "DRAFT" } });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "service.created",
    entityType: "service",
    entityId: created.id,
  });
  revalidatePath("/admin/services");
  redirect(`/admin/services/${created.id}`);
}

export async function updateServiceAction(fd: FormData): Promise<void> {
  const actor = await requirePermission("services.edit");
  const id = String(fd.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) return;
  const data = readForm(fd);
  // Non-publishers (e.g. Editor) can edit but never push changes live.
  const canPublish = userHasPermission(actor, "services.publish");
  const updated = await ignoreMissingRecord(
    db.service.update({
      where: { id },
      data: canPublish ? data : { ...data, status: "DRAFT" },
    }),
  );
  if (!updated) return;
  await writeAuditLog({
    actorUserId: actor.id,
    action: "service.updated",
    entityType: "service",
    entityId: id,
  });
  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  redirect(`/admin/services/${id}`);
}

export async function setServiceStatusAction(fd: FormData): Promise<void> {
  const id = String(fd.get("id") ?? "");
  const status = String(fd.get("status") ?? "");
  if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) return;
  const perm =
    status === "PUBLISHED"
      ? "services.publish"
      : status === "ARCHIVED"
        ? "services.archive"
        : "services.edit";
  const actor = await requirePermission(perm);
  const db = getPrisma();
  if (!db || !id) return;
  const updated = await ignoreMissingRecord(
    db.service.update({ where: { id }, data: { status: status as never } }),
  );
  if (!updated) return;
  await writeAuditLog({
    actorUserId: actor.id,
    action: `service.${status.toLowerCase()}`,
    entityType: "service",
    entityId: id,
  });
  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
}
