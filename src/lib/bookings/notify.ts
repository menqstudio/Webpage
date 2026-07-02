import { sendRawEmail } from "@/lib/integrations/email";
import { sendTelegramMessage } from "@/lib/integrations/telegram";

export type BookingNotification = {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  message?: string;
  locale: string;
  preferredAt?: Date | null;
};

function format(b: BookingNotification): string {
  return [
    "📅 New booking request",
    `Name: ${b.name}`,
    b.company ? `Company: ${b.company}` : null,
    b.phone ? `Phone: ${b.phone}` : null,
    b.email ? `Email: ${b.email}` : null,
    b.preferredAt ? `Preferred: ${b.preferredAt.toISOString()}` : null,
    b.message ? `Message: ${b.message}` : null,
    `Locale: ${b.locale}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Notifies Email + Telegram of a new booking (mirrors the lead flow, per
 * SPAM_AND_RATE_LIMITING). Never throws — the booking is already persisted,
 * and both channels are individually time-bounded and failure-isolated.
 */
export async function notifyBooking(b: BookingNotification): Promise<void> {
  const text = format(b);
  const to = process.env.EMAIL_TO_LEADS;
  await Promise.allSettled([
    to
      ? sendRawEmail({ to, subject: `New booking request — ${b.name}`, text })
      : Promise.resolve(),
    sendTelegramMessage(text),
  ]);
}
