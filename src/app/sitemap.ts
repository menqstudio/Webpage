import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales, localeHtmlLang } from "@/lib/i18n";

const paths = ["", "/privacy", "/terms", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[localeHtmlLang[l]] = `${site.url}/${l}${path}`;
    }
    for (const locale of locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "yearly",
        priority: path === "" ? 1 : 0.4,
        alternates: { languages },
      });
    }
  }
  return entries;
}
