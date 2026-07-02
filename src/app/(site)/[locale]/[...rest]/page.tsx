import { notFound } from "next/navigation";

/**
 * Catch-all under a locale: any unmatched path (e.g. /hy/does-not-exist) hits
 * notFound(), which renders the styled, localized [locale]/not-found.tsx
 * instead of Next's default unstyled 404.
 */
export default function LocaleCatchAll() {
  notFound();
}
