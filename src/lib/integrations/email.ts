import nodemailer from "nodemailer";
import { errSummary } from "@/lib/errors";
import type { LeadNotification, ChannelResult } from "./notifyTypes";

// Bound every SMTP phase so a hung mail server can't stall the request.
const SMTP_CONNECTION_TIMEOUT_MS = 8000;
const SMTP_GREETING_TIMEOUT_MS = 8000;
const SMTP_SOCKET_TIMEOUT_MS = 10000;

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.EMAIL_TO_LEADS &&
      process.env.EMAIL_FROM,
  );
}

/** SMTP configured for sending (no recipient requirement — for auth emails). */
export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.EMAIL_FROM,
  );
}

function buildTransport() {
  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
    connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
    greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
  });
}

/** Generic transactional email (invites, password resets). Dev-safe: logs and
 * skips when SMTP isn't configured so flows still complete. */
export async function sendRawEmail(input: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ sent: boolean; skipped?: boolean }> {
  if (!isSmtpConfigured()) {
    console.info(`[email skipped] "${input.subject}" → ${input.to}`);
    return { sent: false, skipped: true };
  }
  await buildTransport().sendMail({
    from: process.env.EMAIL_FROM,
    to: input.to,
    subject: input.subject,
    text: input.text,
  });
  return { sent: true };
}

function formatBody(lead: LeadNotification): string {
  const utm = lead.utm
    ? Object.entries(lead.utm)
        .filter(([, v]) => v)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join("\n")
    : "";
  return [
    `Name: ${lead.name}`,
    `Company: ${lead.company ?? "-"}`,
    `Phone: ${lead.phone ?? "-"}`,
    `Email: ${lead.email ?? "-"}`,
    `Interested solution: ${lead.interestedSolution}`,
    `Message:\n${lead.message}`,
    `Locale: ${lead.locale}`,
    `Source page: ${lead.sourcePage ?? "-"}`,
    utm ? `UTM:\n${utm}` : "UTM: -",
    `Timestamp: ${lead.createdAt}`,
  ].join("\n");
}

export async function sendLeadEmail(
  lead: LeadNotification,
): Promise<ChannelResult> {
  if (!isEmailConfigured()) {
    return { channel: "email", outcome: "skipped" };
  }
  try {
    const transport = buildTransport();

    await transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO_LEADS,
      replyTo: lead.email || undefined,
      subject: `New consultation request — ${lead.interestedSolution}`,
      text: formatBody(lead),
    });
    return { channel: "email", outcome: "sent" };
  } catch (error) {
    return { channel: "email", outcome: "failed", error: errSummary(error) };
  }
}
