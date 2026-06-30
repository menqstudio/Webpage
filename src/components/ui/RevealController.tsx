"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver that reveals every `[data-reveal]` element on
 * scroll. Rendered once per page — replaces ~50 per-element observers, cutting
 * hydration / blocking time. Uses classList (no React state).
 */
export function RevealController() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (els.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      for (const el of els) el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
