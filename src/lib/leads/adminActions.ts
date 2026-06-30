"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { LEAD_STATUSES } from "./constants";

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("leads.update_status");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(LEAD_STATUSES as readonly string[]).includes(status)) return;

  const db = getPrisma();
  if (!db) return;
  const before = await db.lead.findUnique({ where: { id }, select: { status: true } });
  await db.lead.update({
    where: { id },
    data:
      status === "ARCHIVED"
        ? { status: status as never, archivedAt: new Date(), archivedById: actor.id }
        : { status: status as never },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    actorRole: actor.roles[0],
    action: "lead.status_changed",
    entityType: "lead",
    entityId: id,
    oldValue: before?.status,
    newValue: status,
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function addLeadNoteAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("leads.add_note");
  const id = String(formData.get("id") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!id || !body) return;

  const db = getPrisma();
  if (!db) return;
  await db.leadNote.create({ data: { leadId: id, body, createdById: actor.id } });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "lead.note_added",
    entityType: "lead",
    entityId: id,
  });
  revalidatePath(`/admin/leads/${id}`);
}

export async function assignLeadAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("leads.assign");
  const id = String(formData.get("id") ?? "");
  const assignedToId = String(formData.get("assignedToId") ?? "");
  if (!id) return;

  const db = getPrisma();
  if (!db) return;
  await db.lead.update({
    where: { id },
    data: {
      assignedToId: assignedToId || null,
      assignedById: actor.id,
      assignedAt: assignedToId ? new Date() : null,
    },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "lead.assigned",
    entityType: "lead",
    entityId: id,
    newValue: assignedToId || null,
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function archiveLeadAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("leads.archive");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = getPrisma();
  if (!db) return;
  await db.lead.update({
    where: { id },
    data: { status: "ARCHIVED", archivedAt: new Date(), archivedById: actor.id },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "lead.archived",
    entityType: "lead",
    entityId: id,
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}
