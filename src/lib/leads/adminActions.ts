"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { ignoreMissingRecord } from "@/lib/errors";
import { LEAD_STATUSES } from "./constants";

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("leads.update_status");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(LEAD_STATUSES as readonly string[]).includes(status)) return;

  const db = getPrisma();
  if (!db) return;
  const before = await db.lead.findUnique({ where: { id }, select: { status: true } });
  const updated = await ignoreMissingRecord(
    db.lead.update({
      where: { id },
      data:
        status === "ARCHIVED"
          ? { status: status as never, archivedAt: new Date(), archivedById: actor.id }
          : { status: status as never },
    }),
  );
  if (!updated) return;
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
  const note = await ignoreMissingRecord(
    db.leadNote.create({ data: { leadId: id, body, createdById: actor.id } }),
  );
  if (!note) return;
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
  // Only assign to an existing ACTIVE user (ignore bogus/inactive assignees).
  if (assignedToId) {
    const assignee = await db.user.findFirst({
      where: { id: assignedToId, status: "ACTIVE" },
      select: { id: true },
    });
    if (!assignee) return;
  }
  const updated = await ignoreMissingRecord(
    db.lead.update({
      where: { id },
      data: {
        assignedToId: assignedToId || null,
        assignedById: actor.id,
        assignedAt: assignedToId ? new Date() : null,
      },
    }),
  );
  if (!updated) return;
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
  const updated = await ignoreMissingRecord(
    db.lead.update({
      where: { id },
      data: { status: "ARCHIVED", archivedAt: new Date(), archivedById: actor.id },
    }),
  );
  if (!updated) return;
  await writeAuditLog({
    actorUserId: actor.id,
    action: "lead.archived",
    entityType: "lead",
    entityId: id,
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}
