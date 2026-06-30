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
