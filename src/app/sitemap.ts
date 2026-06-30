import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/lib/i18n";

const paths = ["", "/privacy", "/terms", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "yearly",
        priority: path === "" ? 1 : 0.4,
      });
    }
  }
  return entries;
}
