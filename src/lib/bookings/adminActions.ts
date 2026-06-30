"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { BOOKING_STATUSES } from "./constants";

export async function updateBookingStatusAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("bookings.update_status");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(BOOKING_STATUSES as readonly string[]).includes(status)) return;

  const db = getPrisma();
  if (!db) return;
  const before = await db.booking.findUnique({ where: { id }, select: { status: true } });
  await db.booking.update({
    where: { id },
    data:
      status === "ARCHIVED"
        ? { status: status as never, archivedAt: new Date() }
        : { status: status as never },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    actorRole: actor.roles[0],
    action: "booking.status_changed",
    entityType: "booking",
    entityId: id,
    oldValue: before?.status,
    newValue: status,
  });
  revalidatePath("/admin/bookings");
}

export async function archiveBookingAction(formData: FormData): Promise<void> {
  const actor = await requirePermission("bookings.archive");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = getPrisma();
  if (!db) return;
  await db.booking.update({
    where: { id },
    data: { status: "ARCHIVED", archivedAt: new Date() },
  });
  await writeAuditLog({
    actorUserId: actor.id,
    action: "booking.archived",
    entityType: "booking",
    entityId: id,
  });
  revalidatePath("/admin/bookings");
}
