import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { navItems } from "@/config/navigation";
import { site } from "@/config/site";
import { contact } from "@/config/contact";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export function Footer({
  dict,
  locale,
  year,
}: {
  dict: Dictionary;
  locale: Locale;
  year: number;
}) {
  return (
    <footer className="section-contrast border-t border-edge-subtle">
      <Container className="py-section-sm">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + slogan */}
          <div className="flex flex-col gap-4">
            <a
              href={`/${locale}#${site.anchors.top}`}
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tightest text-content-primary"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-action-primary text-content-inverse">
                M
              </span>
              {site.name}
            </a>
            <p className="max-w-xs leading-relaxed text-content-secondary">
              {dict.footer.slogan}
            </p>
            <LanguageSwitcher
              current={locale}
              label={dict.common.languageLabel}
              className="self-start"
            />
          </div>

          {/* Solutions */}
          <nav aria-label={dict.footer.solutionsTitle} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
              {dict.footer.solutionsTitle}
            </h2>
            <a href={`/${locale}#${site.anchors.solutions}`} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {dict.nav.solutions}
            </a>
            <a href={`/${locale}#${site.anchors.industries}`} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {dict.nav.industries}
            </a>
            <a href={`/${locale}#${site.anchors.process}`} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {dict.nav.process}
            </a>
          </nav>

          {/* Company / nav */}
          <nav aria-label={dict.footer.companyTitle} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
              {dict.footer.companyTitle}
            </h2>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`/${locale}#${item.anchor}`}
                className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary"
              >
                {dict.nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Contact + socials */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
              {dict.footer.contactTitle}
            </h2>
            <a href={contact.phone.href} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {contact.phone.label}
            </a>
            <a href={contact.email.href} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {contact.email.label}
            </a>
            <div className="mt-1 flex flex-wrap gap-2">
              {contact.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-pill border border-edge-subtle px-3 py-1 text-xs font-medium text-content-secondary transition-colors duration-base ease-standard hover:border-edge-strong hover:text-content-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-edge-subtle pt-6 text-sm text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${locale}/privacy`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.privacy}
            </a>
            <a
              href={`/${locale}/terms`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.terms}
            </a>
            <a
              href={`/${locale}/cookies`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.cookies}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
