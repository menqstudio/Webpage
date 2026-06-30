export const CONSENT_COOKIE = "menq-consent";

export type ConsentValue = "accepted" | "declined";

export function analyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GTM_ID);
}
