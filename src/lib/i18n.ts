/** Supported locales. Armenian is primary; English + Russian are first-class. */
export const locales = ["hy", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hy";

/** Human-facing short labels for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  hy: "ՀԱՅ",
  en: "ENG",
  ru: "РУС",
};

/** `lang`/`hreflang` attribute values per locale. */
export const localeHtmlLang: Record<Locale, string> = {
  hy: "hy-AM",
  en: "en",
  ru: "ru",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
