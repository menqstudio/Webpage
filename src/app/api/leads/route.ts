import { NextResponse, type NextRequest } from "next/server";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n";
import {
  validateLead,
  isHoneypotTripped,
  LEAD_MAX_LENGTHS,
  type LeadInput,
} from "@/lib/forms/lead";
import { createLead } from "@/lib/leads/createLead";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { clientIp } from "@/lib/http/clientIp";

export const runtime = "nodejs";

// ── In-memory tiered rate limiting (per docs/must/SPAM_AND_RATE_LIMITING.md) ──
// Single-instance only; swap for a shared store (Redis/Upstash) when scaling.
const buckets = new Map<string, number[]>();

function overLimit(key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}

const MIN = 60_000;
function isRateLimited(ip: string, email?: string, phone?: string): boolean {
  if (process.env.RATE_LIMIT_ENABLED === "false") return false;
  let limited = false;
  if (overLimit(`ip10:${ip}`, 10 * MIN, 5)) limited = true;
  if (overLimit(`ip60:${ip}`, 60 * MIN, 10)) limited = true;
  if (email && overLimit(`em:${email}`, 60 * MIN, 3)) limited = true;
  if (phone && overLimit(`ph:${phone}`, 60 * MIN, 3)) limited = true;
  return limited;
}

function cap(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Reject oversized payloads before parsing (fields are capped again below).
const MAX_BODY_BYTES = 50_000;

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const userAgent = req.headers.get("user-agent") ?? undefined;
  const referrer = req.headers.get("referer") ?? undefined;

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  let body: Partial<LeadInput>;
  try {
    body = (await req.json()) as Partial<LeadInput>;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't learn they were caught.
  if (isHoneypotTripped(body)) {
    await logSystemEvent({
      severity: "INFO",
      eventType: "lead.honeypot",
      message: "Honeypot tripped",
      ipAddress: ip,
      userAgent,
    });
    return NextResponse.json({ ok: true });
  }

  const email = cap(body.email, LEAD_MAX_LENGTHS.email) || undefined;
  const phone = cap(body.phone, LEAD_MAX_LENGTHS.phone) || undefined;

  if (isRateLimited(ip, email, phone)) {
    await logSystemEvent({
      severity: "WARNING",
      eventType: "lead.rate_limited",
      message: "Lead submission rate limited",
      ipAddress: ip,
      userAgent,
    });
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const dict = getDictionary(locale);

  const errors = validateLead(body, dict.cta.form.validation);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "VALIDATION", fields: errors }, { status: 400 });
  }

  // Sanitize UTM: coerce + cap each known key; drop anything else.
  const rawUtm =
    body.utm && typeof body.utm === "object"
      ? (body.utm as Record<string, unknown>)
      : undefined;
  const utm = rawUtm
    ? {
        source: cap(rawUtm.source, 200) || undefined,
        medium: cap(rawUtm.medium, 200) || undefined,
        campaign: cap(rawUtm.campaign, 200) || undefined,
        term: cap(rawUtm.term, 200) || undefined,
        content: cap(rawUtm.content, 200) || undefined,
      }
    : undefined;

  const lead: LeadInput & { ipAddress?: string; referrer?: string } = {
    name: cap(body.name, LEAD_MAX_LENGTHS.name),
    company: cap(body.company, LEAD_MAX_LENGTHS.company) || undefined,
    phone,
    email,
    interestedSolution: cap(body.interestedSolution, LEAD_MAX_LENGTHS.interestedSolution),
    message: cap(body.message, LEAD_MAX_LENGTHS.message),
    consent: Boolean(body.consent),
    locale,
    sourcePage: cap(body.sourcePage, 200) || undefined,
    utm,
    ipAddress: ip,
    referrer,
  };

  const result = await createLead(lead);

  if (!result.ok) {
    // DB save failed — do not claim success; client shows fallback error.
    return NextResponse.json({ error: "PERSIST_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
