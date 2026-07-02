/**
 * A safe, short summary of an error for logging — never the full message,
 * which can contain secrets (DB DSN, SMTP host/user) or PII.
 */
export function errSummary(error: unknown): string {
  if (error && typeof error === "object") {
    const e = error as { code?: unknown; name?: unknown };
    if (typeof e.code === "string" && e.code) return e.code;
    if (typeof e.name === "string" && e.name) return e.name;
  }
  return "Error";
}

/**
 * True when a Prisma write failed because the target row (P2025) or a
 * referenced row (P2003, FK) doesn't exist — i.e. a stale/bogus id, not a
 * real fault. Lets admin mutations no-op instead of 500-ing.
 */
export function isMissingRecord(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  return code === "P2025" || code === "P2003";
}

/** Awaits a Prisma op, returning null instead of throwing on a missing row. */
export async function ignoreMissingRecord<T>(op: Promise<T>): Promise<T | null> {
  try {
    return await op;
  } catch (error) {
    if (isMissingRecord(error)) return null;
    throw error;
  }
}
