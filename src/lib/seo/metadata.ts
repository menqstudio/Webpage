import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { locales, localeHtmlLang, type Locale } from "@/lib/i18n";
import { site } from "@/config/site";

/** Build per-locale metadata with hreflang alternates + Open Graph. */
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHtmlLang[l]] = `${site.url}/${l}`;
  }

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${site.url}/${locale}`,
      locale: localeHtmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}
