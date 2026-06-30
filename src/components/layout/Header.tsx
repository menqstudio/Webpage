"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { navItems } from "@/config/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export function Header({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape; move focus into the drawer on open, restore it on close.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuTriggerRef.current;
    drawerCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-header w-full border-b transition-colors duration-base ease-standard",
        scrolled
          ? "border-edge-subtle bg-[color:var(--header-bg)] backdrop-blur-header"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-header items-center justify-between gap-4">
          {/* Logo */}
          <a
            href={`/${locale}#${site.anchors.top}`}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tightest text-content-primary"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-action-primary text-content-inverse">
              M
            </span>
            {site.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label={dict.nav.home}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`/${locale}#${item.anchor}`}
                className="rounded-pill px-3 py-2 text-sm font-medium text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary"
              >
                {dict.nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Desktop controls */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher current={locale} label={dict.common.languageLabel} />
            <ThemeToggle label={dict.common.themeToggle} />
            <ButtonLink href={`/${locale}#${site.anchors.contact}`} size="sm">
              {dict.common.ctaPrimary}
            </ButtonLink>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle label={dict.common.themeToggle} />
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.common.openMenu}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-edge-subtle bg-surface-secondary text-content-primary"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 z-drawer lg:hidden">
          <button
            type="button"
            aria-label={dict.common.closeMenu}
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-surface-inverse) 45%, transparent)",
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={site.name}
            className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col gap-6 bg-page p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-content-primary">
                {site.name}
              </span>
              <button
                ref={drawerCloseRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.common.closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-edge-subtle bg-surface-secondary text-content-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label={dict.nav.home}>
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={`/${locale}#${item.anchor}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-content-secondary transition-colors duration-base ease-standard hover:bg-surface-secondary hover:text-content-primary"
                >
                  {dict.nav[item.key]}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <LanguageSwitcher
                current={locale}
                label={dict.common.languageLabel}
                className="self-start"
              />
              <ButtonLink
                href={`/${locale}#${site.anchors.contact}`}
                size="lg"
                onClick={() => setMenuOpen(false)}
              >
                {dict.common.ctaPrimary}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
