"use client";

import {
  adminLocales,
  adminLocaleLabels,
  ADMIN_LOCALE_COOKIE,
  type AdminLocale,
} from "@/content/admin";
import { setClientCookie } from "@/lib/clientCookie";
import { cn } from "@/lib/cn";

export function AdminLangSwitcher({ current }: { current: AdminLocale }) {
  function set(locale: AdminLocale) {
    if (locale === current) return;
    setClientCookie(ADMIN_LOCALE_COOKIE, locale);
    window.location.reload();
  }

  return (
    <div className="inline-flex items-center rounded-pill border border-edge-subtle bg-surface-secondary p-1">
      {adminLocales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => set(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "rounded-pill px-2.5 py-1 text-xs font-semibold transition-colors duration-base ease-standard",
            locale === current
              ? "bg-action-primary text-content-inverse"
              : "text-content-secondary hover:text-content-primary",
          )}
        >
          {adminLocaleLabels[locale]}
        </button>
      ))}
    </div>
  );
}
