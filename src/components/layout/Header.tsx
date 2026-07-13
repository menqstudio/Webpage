"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { navItems } from "@/config/navigation";
import { site } from "@/config/site";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuTriggerRef.current;
    drawerCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); return; }
      if (e.key !== "Tab") return;
      const root = drawerRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); trigger?.focus(); };
  }, [menuOpen]);

  return (
    <header className={cn("sticky top-0 z-header w-full border-b transition duration-base ease-standard", scrolled ? "border-edge-subtle surface-float shadow-sm" : "border-transparent bg-transparent") }>
      <Container size="wide">
        <div className="flex h-header items-center justify-between gap-4">
          <a href={`/${locale}#${site.anchors.top}`} className="rounded-pill text-content-primary"><BrandMark compact /></a>
          <nav className="hidden items-center gap-1 rounded-pill border border-edge-subtle bg-surface-primary p-1 shadow-sm lg:flex" aria-label={dict.common.mainNavLabel}>
            {navItems.map((item) => (
              <a key={item.key} href={`/${locale}#${item.anchor}`} className="rounded-pill px-3 py-2 text-sm font-medium text-content-secondary transition-colors duration-base hover:bg-surface-secondary hover:text-content-primary">{dict.nav[item.key]}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher current={locale} label={dict.common.languageLabel} />
            <ThemeToggle label={dict.common.themeToggle} />
            <ButtonLink href={`/${locale}#${site.anchors.contact}`} size="sm" onClick={() => track(AnalyticsEvent.ctaClick, { location: "header" })}>{dict.common.ctaPrimary}</ButtonLink>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle label={dict.common.themeToggle} />
            <button ref={menuTriggerRef} type="button" onClick={() => setMenuOpen(true)} aria-label={dict.common.openMenu} aria-expanded={menuOpen} className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-edge-subtle bg-surface-primary text-content-primary shadow-sm"><Menu className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
      </Container>
      {menuOpen ? (
        <div className="fixed inset-0 z-drawer lg:hidden">
          <button type="button" aria-label={dict.common.closeMenu} onClick={() => setMenuOpen(false)} className="absolute inset-0" style={{ backgroundColor: "var(--overlay-scrim)" }} />
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label={site.name} className="premium-panel absolute right-0 top-0 flex h-full w-80 max-w-full flex-col gap-6 rounded-l-3xl bg-page p-6">
            <div className="flex items-center justify-between">
              <BrandMark compact />
              <button ref={drawerCloseRef} type="button" onClick={() => setMenuOpen(false)} aria-label={dict.common.closeMenu} className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-edge-subtle bg-surface-secondary text-content-primary"><X className="h-5 w-5" aria-hidden="true" /></button>
            </div>
            <nav className="flex flex-col gap-1" aria-label={dict.common.mainNavLabel}>
              {navItems.map((item, index) => (
                <a key={item.key} href={`/${locale}#${item.anchor}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-base font-medium text-content-secondary hover:border-edge-subtle hover:bg-surface-secondary hover:text-content-primary"><span>{dict.nav[item.key]}</span><span className="text-2xs text-content-muted">{String(index + 1).padStart(2, "0")}</span></a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <LanguageSwitcher current={locale} label={dict.common.languageLabel} className="self-start" />
              <ButtonLink href={`/${locale}#${site.anchors.contact}`} size="lg" onClick={() => { track(AnalyticsEvent.ctaClick, { location: "header_mobile" }); setMenuOpen(false); }}>{dict.common.ctaPrimary}<ArrowRight className="h-5 w-5" aria-hidden="true" /></ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
