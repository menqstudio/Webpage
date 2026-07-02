import { getPrisma } from "@/lib/db/prisma";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { sendLeadEmail } from "@/lib/integrations/email";
import { sendLeadTelegram } from "@/lib/integrations/telegram";
import { errSummary } from "@/lib/errors";
import type { ChannelResult, LeadNotification } from "@/lib/integrations/notifyTypes";
import type { LeadInput } from "@/lib/forms/lead";

export type CreateLeadResult = {
  ok: boolean;
  leadId?: string;
  persisted: boolean;
  duplicate: boolean;
};

const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

function resolveNotificationStatus(results: ChannelResult[]): string {
  const email = results.find((r) => r.channel === "email")!;
  const telegram = results.find((r) => r.channel === "telegram")!;
  const sent = results.filter((r) => r.outcome === "sent").length;
  const failed = results.filter((r) => r.outcome === "failed").length;

  if (email.outcome === "sent" && telegram.outcome === "sent") return "BOTH_SENT";
  if (email.outcome === "sent" && telegram.outcome !== "failed") return "EMAIL_SENT";
  if (telegram.outcome === "sent" && email.outcome !== "failed") return "TELEGRAM_SENT";
  if (sent >= 1 && failed >= 1) return "PARTIALLY_FAILED";
  if (sent === 0 && failed >= 1) return "FAILED";
  return "PENDING"; // nothing configured
}

export async function createLead(
  input: LeadInput & { ipAddress?: string; referrer?: string },
): Promise<CreateLeadResult> {
  const db = getPrisma();
  const createdAt = new Date();
  let leadId: string | undefined;
  let persisted = false;
  let duplicate = false;

  // 1) Persist FIRST (per ERROR_LOGGING + SPAM specs).
  if (db) {
    try {
      const since = new Date(createdAt.getTime() - DUPLICATE_WINDOW_MS);
      const contactOr: { email?: string; phone?: string }[] = [];
      if (input.email) contactOr.push({ email: input.email });
      if (input.phone) contactOr.push({ phone: input.phone });

      if (contactOr.length > 0) {
        const existing = await db.lead.findFirst({
          where: {
            message: input.message,
            createdAt: { gte: since },
            OR: contactOr,
          },
          select: { id: true },
        });
        duplicate = Boolean(existing);
      }

      const lead = await db.lead.create({
        data: {
          status: duplicate ? "DUPLICATE" : "NEW",
          notificationStatus: "PENDING",
          name: input.name,
          company: input.company,
          phone: input.phone,
          email: input.email,
          interestedSolution: input.interestedSolution,
          message: input.message,
          locale: input.locale ?? "hy",
          sourcePage: input.sourcePage,
          referrer: input.referrer,
          utmSource: input.utm?.source,
          utmMedium: input.utm?.medium,
          utmCampaign: input.utm?.campaign,
          utmTerm: input.utm?.term,
          utmContent: input.utm?.content,
          consent: Boolean(input.consent),
          ipAddress: input.ipAddress,
        },
        select: { id: true },
      });
      leadId = lead.id;
      persisted = true;
    } catch (error) {
      // DB save failed → do NOT claim success.
      await logSystemEvent({
        severity: "CRITICAL",
        eventType: "lead.db_save_failed",
        message: "Failed to persist lead",
        metadata: { error: errSummary(error) },
        ipAddress: input.ipAddress,
      });
      return { ok: false, persisted: false, duplicate: false };
    }
  } else {
    // No DB — persist the lead to the log so it is never silently dropped
    // (per FORM_AND_LEAD_FLOW: file/log fallback when the database is down).
    console.warn(
      "[lead.no_db] Unpersisted lead:",
      JSON.stringify({
        name: input.name,
        company: input.company,
        phone: input.phone,
        email: input.email,
        interestedSolution: input.interestedSolution,
        message: input.message,
        locale: input.locale ?? "hy",
        sourcePage: input.sourcePage,
        referrer: input.referrer,
        utm: input.utm,
        createdAt: createdAt.toISOString(),
      }),
    );
    await logSystemEvent({
      severity: "WARNING",
      eventType: "lead.no_db",
      message: "DATABASE_URL not set — lead written to log only (fallback)",
    });
  }

  // 2) Notify (only for non-duplicates).
  const notification: LeadNotification = {
    id: leadId,
    name: input.name,
    company: input.company,
    phone: input.phone,
    email: input.email,
    interestedSolution: input.interestedSolution,
    message: input.message,
    locale: input.locale ?? "hy",
    sourcePage: input.sourcePage,
    utm: input.utm,
    createdAt: createdAt.toISOString(),
  };

  let results: ChannelResult[] = [
    { channel: "email", outcome: "skipped" },
    { channel: "telegram", outcome: "skipped" },
  ];
  if (!duplicate) {
    results = await Promise.all([
      sendLeadEmail(notification),
      sendLeadTelegram(notification),
    ]);
  }

  const notificationStatus = resolveNotificationStatus(results);

  // 3) Record notification outcome.
  if (db && persisted && leadId) {
    try {
      await db.lead.update({
        where: { id: leadId },
        data: { notificationStatus: notificationStatus as never },
      });
      await db.leadNotificationLog.createMany({
        data: results.map((r) => ({
          leadId: leadId!,
          channel: r.channel,
          status: r.outcome,
          errorMessage: r.error,
        })),
      });
      await db.leadEvent.create({
        data: { leadId, eventType: "lead.created", payload: { notificationStatus } },
      });
    } catch (error) {
      await logSystemEvent({
        severity: "ERROR",
        eventType: "lead.post_save_update_failed",
        message: "Failed to update notification status / logs",
        metadata: { error: errSummary(error), leadId },
      });
    }
  }

  // Log notification failures for admin visibility.
  for (const r of results) {
    if (r.outcome === "failed") {
      await logSystemEvent({
        severity: "ERROR",
        eventType: `lead.notify_${r.channel}_failed`,
        message: `${r.channel} notification failed`,
        metadata: { error: r.error, leadId },
      });
    }
  }

  return { ok: true, leadId, persisted, duplicate };
}
