/**
 * Site-wide constants. Real brand/contact values are placeholders for now and
 * tracked in docs/buildpack/OPEN_ITEMS_LOG.md.
 */
export const site = {
  name: "MenQ",
  legalName: "MenQ", // OPEN ITEM: legal company name
  /** Public production URL — overridden by NEXT_PUBLIC_APP_URL at runtime. */
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://menq.example",
  /** Section anchor ids used by nav + CTAs. */
  anchors: {
    top: "top",
    solutions: "solutions",
    industries: "industries",
    process: "process",
    faq: "faq",
    contact: "consultation-form",
  },
} as const;

export type SiteConfig = typeof site;
