"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";

/**
 * Mobile-only sticky bottom CTA. Hides itself while the consultation form is
 * on screen so it never covers the form the user is filling in.
 */
export function MobileStickyCTA({
  href,
  label,
  targetId,
}: {
  href: string;
  label: string;
  targetId: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-raised border-t border-edge-subtle bg-surface-primary p-3 shadow-lg lg:hidden">
      <a
        href={href}
        onClick={() => track(AnalyticsEvent.ctaClick, { location: "sticky" })}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-button bg-action-primary text-base font-semibold text-content-inverse"
      >
        {label}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}
