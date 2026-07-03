"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { setClientCookie } from "@/lib/clientCookie";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";
import { cn } from "@/lib/cn";

/** Segmented control that swaps the leading /[locale] segment of the path. */
export function LanguageSwitcher({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  function hrefFor(locale: Locale): string {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    // segments[0] === "" (leading slash), segments[1] === current locale
    if (segments.length > 1) {
      segments[1] = locale;
      return segments.join("/") || `/${locale}`;
    }
    return `/${locale}`;
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-pill border border-edge-subtle bg-surface-secondary p-1",
        className,
      )}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            onClick={() => {
              setClientCookie("menq-locale", locale);
              if (!active) {
                track(AnalyticsEvent.languageSwitch, { from: current, to: locale });
              }
            }}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-pill px-3 py-1 text-xs font-semibold transition-colors duration-base ease-standard",
              active
                ? "bg-action-primary text-content-inverse"
                : "text-content-secondary hover:text-content-primary",
            )}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
