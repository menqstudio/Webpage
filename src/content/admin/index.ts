import { adminHy } from "./hy";
import { adminEn } from "./en";

/** The admin UI dictionary shape (derived from the Armenian canonical). */
export type AdminDictionary = typeof adminHy;

export const adminLocales = ["hy", "en"] as const;
export type AdminLocale = (typeof adminLocales)[number];

/** Client-safe constant (no server-only imports here). */
export const ADMIN_LOCALE_COOKIE = "menq-admin-locale";

export const adminLocaleLabels: Record<AdminLocale, string> = {
  hy: "ՀԱՅ",
  en: "ENG",
};

const dictionaries: Record<AdminLocale, AdminDictionary> = {
  hy: adminHy,
  en: adminEn,
};

export function getAdminDictionary(locale: AdminLocale): AdminDictionary {
  return dictionaries[locale] ?? adminHy;
}
