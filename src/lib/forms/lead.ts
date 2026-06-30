import type { Locale } from "@/lib/i18n";

export type LeadField =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "interestedSolution"
  | "message"
  | "consent";

export type LeadInput = {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  interestedSolution: string;
  message: string;
  consent?: boolean;
  /** Anti-spam honeypot — must stay empty. */
  website?: string;
  locale?: Locale;
  sourcePage?: string;
  utm?: Record<string, string | undefined>;
};

export type ValidationMessages = {
  name: string;
  contact: string;
  email: string;
  solution: string;
  message: string;
};

export type FieldErrors = Partial<Record<LeadField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared client + server validation. Returns errors keyed by field. */
export function validateLead(
  input: Partial<LeadInput>,
  messages: ValidationMessages,
): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const solution = input.interestedSolution?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2) errors.name = messages.name;
  if (!phone && !email) errors.phone = messages.contact;
  if (email && !EMAIL_RE.test(email)) errors.email = messages.email;
  if (!solution) errors.interestedSolution = messages.solution;
  if (message.length < 10) errors.message = messages.message;

  return errors;
}

export function isHoneypotTripped(input: Partial<LeadInput>): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}

/** Length caps to bound payloads server-side (see docs/must/SPAM_AND_RATE_LIMITING.md). */
export const LEAD_MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 160,
  phone: 40,
  email: 180,
  interestedSolution: 60,
  message: 3000,
};
