/**
 * Derives the client IP from a *trusted* proxy hop.
 *
 * `x-forwarded-for` is a client-appendable list — the LEFTMOST entry is
 * attacker-controlled, so keying rate limits off it lets an attacker rotate
 * fake IPs and bypass the limit (and poison the stored `ipAddress`). We trust
 * only the last `TRUSTED_PROXY_COUNT` hops (the reverse proxies / load
 * balancers we actually run in front of the app) and read the entry the
 * outermost trusted proxy observed.
 *
 * Set `TRUSTED_PROXY_COUNT` to the number of proxies between the public
 * internet and this app: Vercel = 1, a single nginx = 1, nginx behind
 * Cloudflare = 2, etc. Defaults to 1.
 */
export function clientIp(headers: { get(name: string): string | null }): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_COUNT ?? 1) || 1);
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const list = xff
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length > 0) {
      const idx = Math.max(0, list.length - hops);
      return list[idx] ?? "unknown";
    }
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
