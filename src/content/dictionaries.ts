import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./locales/types";
import { hy } from "./locales/hy";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

const dictionaries: Record<Locale, Dictionary> = { hy, en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? hy;
}

export type { Dictionary };
