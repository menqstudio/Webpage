import { getPrisma } from "@/lib/db/prisma";
import type { Locale } from "@/lib/i18n";
import type { ServiceBlock, IndustryGroup } from "@/content/locales/types";

/**
 * Returns the dictionary section data with any published admin override merged
 * on top (shallow). Falls back to the dictionary when there's no DB / no
 * published override / a DB error. Keys in the override replace dict keys.
 */
export async function getSectionData<T extends object>(
  type: string,
  locale: Locale,
  fallback: T,
): Promise<T> {
  const db = getPrisma();
  if (!db) return fallback;
  try {
    const row = await db.contentItem.findFirst({
      where: { type, language: locale, status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
      select: { content: true },
    });
    if (!row || !row.content || typeof row.content !== "object") return fallback;
    return { ...fallback, ...(row.content as Record<string, unknown>) } as T;
  } catch {
    return fallback;
  }
}

/**
 * Returns published service blocks for a locale from the DB, or null to fall
 * back to the localized dictionary (no DB, none published, or DB error).
 */
export async function getPublishedServiceBlocks(
  locale: Locale,
): Promise<ServiceBlock[] | null> {
  const db = getPrisma();
  if (!db) return null;
  try {
    const rows = await db.service.findMany({
      where: { language: locale, status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return null;
    return rows.map((r) => ({
      title: r.title,
      goal: r.shortDescription ?? "",
      services: Array.isArray(r.features) ? (r.features as string[]) : [],
      value: r.businessValue ?? "",
    }));
  } catch {
    return null;
  }
}

export async function getPublishedIndustryGroups(
  locale: Locale,
): Promise<IndustryGroup[] | null> {
  const db = getPrisma();
  if (!db) return null;
  try {
    const rows = await db.industry.findMany({
      where: { language: locale, status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return null;
    return rows.map((r) => ({
      title: r.title,
      examples: r.description ?? "",
      solutions: r.recommendedSolutions ?? "",
    }));
  } catch {
    return null;
  }
}
