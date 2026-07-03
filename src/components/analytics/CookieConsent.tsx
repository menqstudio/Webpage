"use client";

import { useState } from "react";
import Link from "next/link";
import { CONSENT_COOKIE } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";

export function CookieConsent({
  locale,
  regionLabel,
  notice,
  accept,
  decline,
  policyLabel,
}: {
  locale: Locale;
  regionLabel: string;
  notice: string;
  accept: string;
  decline: string;
  policyLabel: string;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  function persist(value: "accepted" | "declined") {
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=15552000; samesite=lax`;
  }

  return (
    <div
      role="region"
      aria-label={regionLabel}
      className="fixed inset-x-4 bottom-4 z-toast mx-auto max-w-2xl"
    >
      <div className="glass flex flex-col gap-3 rounded-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-content-secondary">
          {notice}{" "}
          <Link
            href={`/${locale}/cookies`}
            className="font-medium text-content-primary underline"
          >
            {policyLabel}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              persist("declined");
              setVisible(false);
            }}
            className="rounded-pill border border-edge-subtle px-4 py-2 text-sm font-medium text-content-secondary hover:text-content-primary"
          >
            {decline}
          </button>
          <button
            type="button"
            onClick={() => {
              persist("accepted");
              window.location.reload();
            }}
            className="rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
