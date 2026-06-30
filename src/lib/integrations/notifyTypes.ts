/** Data passed to notification channels. May include PII (it goes to the
 * business's own inbox/chat) — never send this to analytics/logs. */
export type LeadNotification = {
  id?: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  interestedSolution: string;
  message: string;
  locale: string;
  sourcePage?: string;
  utm?: Record<string, string | undefined>;
  createdAt: string;
};

export type ChannelResult = {
  channel: "email" | "telegram";
  outcome: "sent" | "failed" | "skipped";
  error?: string;
};
