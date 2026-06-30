/**
 * Lightweight analytics abstraction. No-ops unless GA4/GTM is configured.
 * NEVER pass PII (name/phone/email/message) — only metadata.
 */
type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export const AnalyticsEvent = {
  ctaClick: "cta_click",
  serviceCardClick: "service_card_click",
  languageSwitch: "language_switch",
  leadFormStart: "lead_form_start",
  leadFormSubmit: "lead_form_submit",
  leadFormSuccess: "lead_form_success",
  leadFormError: "lead_form_error",
  bookingClick: "booking_click",
  contactButtonClick: "contact_button_click",
  faqOpen: "faq_open",
} as const;

type WindowWithAnalytics = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function track(event: string, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithAnalytics;
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", event, props);
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...props });
    }
  } catch {
    /* analytics must never break the app */
  }
}
