import { CalendarDays, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "./LeadForm";
import { site } from "@/config/site";
import { contact } from "@/config/contact";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function CTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const cta = await getSectionData("cta", locale, dict.cta);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <Section
      id={site.anchors.contact}
      variant="contrast"
      spacing="lg"
      className="overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy + contact alternatives */}
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">
                {cta.title}
              </h2>
              <p className="text-lg leading-relaxed text-content-secondary">
                {cta.body}
              </p>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
                {cta.contactTitle}
              </h3>
              <p className="text-content-secondary">{cta.contactBody}</p>
              <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a
                  href={contact.phone.href}
                  className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-base ease-standard hover:border-edge-strong"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {contact.phone.label}
                </a>
                <a
                  href={contact.email.href}
                  className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-base ease-standard hover:border-edge-strong"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  {contact.email.label}
                </a>
                <a
                  href={contact.telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-base ease-standard hover:border-edge-strong"
                >
                  <Send className="h-4 w-4 text-accent" aria-hidden="true" />
                  {contact.telegram.label}
                </a>
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-base ease-standard hover:border-edge-strong"
                >
                  <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                  {contact.whatsapp.label}
                </a>
              </div>

              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-pill border border-edge-strong bg-accent-soft px-4 py-2 text-sm font-semibold text-content-primary transition-colors duration-base ease-standard hover:border-edge-strong"
                >
                  <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
                  {dict.common.bookCall}
                </a>
              ) : null}
            </Reveal>
          </div>

          {/* Lead form */}
          <Reveal delay={80} className="w-full">
            <LeadForm dict={dict} locale={locale} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
