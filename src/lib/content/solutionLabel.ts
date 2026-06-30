import { getDictionary } from "@/content/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n";

/** Maps a lead's interestedSolution value (e.g. "crm") to its localized label
 * (e.g. "CRM համակարգ") using the dictionary for the lead's own locale. */
export function solutionLabel(value: string, locale: string): string {
  const loc = isLocale(locale) ? locale : defaultLocale;
  const opt = getDictionary(loc).cta.form.options.find((o) => o.value === value);
  return opt?.label ?? value;
}
