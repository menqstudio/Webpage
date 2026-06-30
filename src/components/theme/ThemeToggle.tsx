"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_COOKIE } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Stateless theme toggle. The active theme lives in the `data-theme` attribute
 * (set server-side from the cookie, or via the system preference when absent).
 * Clicking flips the attribute and persists it in a cookie the server reads on
 * the next request — no inline script, no flash, no hydration mismatch.
 */
export function ThemeToggle({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-pill border border-edge-subtle bg-surface-secondary text-content-secondary transition-colors duration-base ease-standard hover:border-edge-strong hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className,
      )}
    >
      <Sun className="theme-icon-sun h-5 w-5 dark:block" aria-hidden="true" />
      <Moon className="theme-icon-moon h-5 w-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
