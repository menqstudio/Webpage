import { getPrisma } from "@/lib/db/prisma";

/** Writes an immutable audit-log entry. Never throws. */
export async function writeAuditLog(input: {
  actorUserId?: string;
  actorRole?: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  const db = getPrisma();
  if (!db) return;
  try {
    await db.auditLog.create({
      data: {
        actorUserId: input.actorUserId,
        actorRole: input.actorRole,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        oldValue: input.oldValue as object | undefined,
        newValue: input.newValue as object | undefined,
        metadata: input.metadata as object | undefined,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {
    /* audit logging must never break the request */
  }
}
