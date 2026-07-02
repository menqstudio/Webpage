import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { errSummary } from "@/lib/errors";
import { clientIp } from "@/lib/http/clientIp";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCALES = ["hy", "en", "ru"];

// In-memory rate limit (per IP). Single-instance; mirrors /api/leads.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  if (process.env.RATE_LIMIT_ENABLED === "false") return false;
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  // Honeypot — silently accept bots.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const name = str(body.name, 120);
  const company = str(body.company, 160);
  const phone = str(body.phone, 40);
  const email = str(body.email, 180);
  const message = str(body.message, 2000);
  const locale = LOCALES.includes(String(body.locale)) ? String(body.locale) : "hy";

  let preferredAt: Date | null = null;
  if (typeof body.preferredAt === "string" && body.preferredAt) {
    const d = new Date(body.preferredAt);
    if (!Number.isNaN(d.getTime())) preferredAt = d;
  }

  if (name.length < 2) {
    return NextResponse.json({ error: "VALIDATION" }, { status: 400 });
  }
  if (!phone && (!email || !EMAIL_RE.test(email))) {
    return NextResponse.json({ error: "VALIDATION" }, { status: 400 });
  }

  const db = getPrisma();
  if (!db) {
    await logSystemEvent({
      severity: "WARNING",
      eventType: "booking.no_db",
      message: "DATABASE_URL not set — booking not persisted (dev fallback)",
    });
    return NextResponse.json({ ok: true });
  }

  try {
    await db.booking.create({
      data: {
        name,
        company: company || undefined,
        phone: phone || undefined,
        email: email || undefined,
        message: message || undefined,
        locale,
        preferredAt,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    await logSystemEvent({
      severity: "ERROR",
      eventType: "booking.save_failed",
      message: "Failed to persist booking",
      metadata: { error: errSummary(error) },
    });
    return NextResponse.json({ error: "PERSIST_FAILED" }, { status: 500 });
  }
}
