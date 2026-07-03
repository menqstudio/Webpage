import { getPrisma } from "@/lib/db/prisma";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { sendLeadEmail } from "@/lib/integrations/email";
import { sendLeadTelegram } from "@/lib/integrations/telegram";
import { errSummary } from "@/lib/errors";
import type { ChannelResult, LeadNotification } from "@/lib/integrations/notifyTypes";
import { resolveNotificationStatus } from "./createLead";

export type ResendResult = {
  ok: boolean;
  notFound?: boolean;
  notificationStatus?: string;
};

/**
 * Re-sends Email + Telegram for an existing lead and records the outcome,
 * reusing the same channel senders + status resolver as the initial
 * createLead notify. The lead is flipped to RETRY_PENDING for the duration of
 * the send (observable while the channels — which have timeouts — run), then
 * to the freshly resolved status. Never throws.
 */
export async function resendLeadNotifications(leadId: string): Promise<ResendResult> {
  const db = getPrisma();
  if (!db) return { ok: false };

  const lead = await db.lead.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      name: true,
      company: true,
      phone: true,
      email: true,
      interestedSolution: true,
      message: true,
      locale: true,
      sourcePage: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      utmTerm: true,
      utmContent: true,
      createdAt: true,
    },
  });
  if (!lead) return { ok: false, notFound: true };

  // Mark the retry as in-flight (this is the RETRY_PENDING state's real use).
  try {
    await db.lead.update({
      where: { id: lead.id },
      data: { notificationStatus: "RETRY_PENDING" as never },
    });
  } catch {
    /* non-fatal — proceed with the send regardless */
  }

  const notification: LeadNotification = {
    id: lead.id,
    name: lead.name,
    company: lead.company ?? undefined,
    phone: lead.phone ?? undefined,
    email: lead.email ?? undefined,
    interestedSolution: lead.interestedSolution,
    message: lead.message,
    locale: lead.locale,
    sourcePage: lead.sourcePage ?? undefined,
    utm: {
      source: lead.utmSource ?? undefined,
      medium: lead.utmMedium ?? undefined,
      campaign: lead.utmCampaign ?? undefined,
      term: lead.utmTerm ?? undefined,
      content: lead.utmContent ?? undefined,
    },
    createdAt: lead.createdAt.toISOString(),
  };

  const results: ChannelResult[] = await Promise.all([
    sendLeadEmail(notification),
    sendLeadTelegram(notification),
  ]);
  const notificationStatus = resolveNotificationStatus(results);

  try {
    await db.lead.update({
      where: { id: lead.id },
      data: { notificationStatus: notificationStatus as never },
    });
    await db.leadNotificationLog.createMany({
      data: results.map((r) => ({
        leadId: lead.id,
        channel: r.channel,
        status: r.outcome,
        errorMessage: r.error,
      })),
    });
    await db.leadEvent.create({
      data: {
        leadId: lead.id,
        eventType: "lead.notify_retried",
        payload: { notificationStatus },
      },
    });
  } catch (error) {
    await logSystemEvent({
      severity: "ERROR",
      eventType: "lead.notify_retry_record_failed",
      message: "Failed to record lead notify retry",
      metadata: { error: errSummary(error), leadId },
    });
  }

  for (const r of results) {
    if (r.outcome === "failed") {
      await logSystemEvent({
        severity: "ERROR",
        eventType: `lead.notify_${r.channel}_failed`,
        message: `${r.channel} notification failed (retry)`,
        metadata: { error: r.error, leadId },
      });
    }
  }

  return { ok: true, notificationStatus };
}
