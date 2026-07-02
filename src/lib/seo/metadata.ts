import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { locales, defaultLocale, localeHtmlLang, type Locale } from "@/lib/i18n";
import { site } from "@/config/site";

type MetaOptions = {
  /** Sub-path appended after the locale, e.g. "/privacy". Defaults to "". */
  path?: string;
  /** Override the page title (defaults to the locale meta title). */
  title?: string;
  /** Override the description (defaults to the locale meta description). */
  description?: string;
};

/**
 * Build per-locale metadata with hreflang alternates (+ x-default) and Open
 * Graph. Pass `path`/`title`/`description` for sub-pages (e.g. legal) so each
 * gets its OWN canonical + alternates instead of inheriting the homepage's.
 */
export function buildMetadata(locale: Locale, opts: MetaOptions = {}): Metadata {
  const { path = "", title, description } = opts;
  const dict = getDictionary(locale);
  const metaTitle = title ?? dict.meta.title;
  const metaDescription = description ?? dict.meta.description;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHtmlLang[l]] = `${site.url}/${l}${path}`;
  }
  languages["x-default"] = `${site.url}/${defaultLocale}${path}`;

  const url = `${site.url}/${locale}${path}`;

  return {
    metadataBase: new URL(site.url),
    title: metaTitle,
    description: metaDescription,
    applicationName: site.name,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: metaTitle,
      description: metaDescription,
      url,
      locale: localeHtmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
    robots: { index: true, follow: true },
  };
}
