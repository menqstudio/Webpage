import { getPrisma } from "./prisma";

type Severity = "INFO" | "WARNING" | "ERROR" | "CRITICAL";

/**
 * Logs a system event to console always (no secrets/PII) and to the
 * system_events table when a database is configured. Never throws.
 */
export async function logSystemEvent(input: {
  severity: Severity;
  eventType: string;
  message: string;
  metadata?: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  const line = `[${input.severity}] ${input.eventType}: ${input.message}`;
  if (input.severity === "ERROR" || input.severity === "CRITICAL") {
    console.error(line);
  } else {
    console.info(line);
  }

  const db = getPrisma();
  if (!db) return;
  try {
    await db.systemEvent.create({
      data: {
        severity: input.severity,
        eventType: input.eventType,
        message: input.message,
        metadata: input.metadata as object | undefined,
        userId: input.userId,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {
    /* logging must never break the request */
  }
}
