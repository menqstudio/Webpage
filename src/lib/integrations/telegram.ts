import { errSummary } from "@/lib/errors";
import type { LeadNotification, ChannelResult } from "./notifyTypes";

// Cap outbound Telegram calls so a hung API can't stall the lead request.
const TELEGRAM_TIMEOUT_MS = 8000;

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_LEADS_CHAT_ID,
  );
}

/** Send a raw Telegram message (used for test notifications). */
export async function sendTelegramMessage(
  text: string,
): Promise<{ sent: boolean; error?: string }> {
  if (!isTelegramConfigured()) return { sent: false, error: "not configured" };
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_LEADS_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    return res.ok ? { sent: true } : { sent: false, error: `HTTP ${res.status}` };
  } catch (error) {
    return { sent: false, error: errSummary(error) };
  }
}

function formatMessage(lead: LeadNotification): string {
  return [
    "🟦 New consultation request",
    `Name: ${lead.name}`,
    lead.company ? `Company: ${lead.company}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.email ? `Email: ${lead.email}` : null,
    `Solution: ${lead.interestedSolution}`,
    `Message: ${lead.message}`,
    `Locale: ${lead.locale}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendLeadTelegram(
  lead: LeadNotification,
): Promise<ChannelResult> {
  if (!isTelegramConfigured()) {
    return { channel: "telegram", outcome: "skipped" };
  }
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_LEADS_CHAT_ID,
        text: formatMessage(lead),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    if (!res.ok) {
      return {
        channel: "telegram",
        outcome: "failed",
        error: `HTTP ${res.status}`,
      };
    }
    return { channel: "telegram", outcome: "sent" };
  } catch (error) {
    return { channel: "telegram", outcome: "failed", error: errSummary(error) };
  }
}
