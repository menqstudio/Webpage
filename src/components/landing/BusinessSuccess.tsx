import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function BusinessSuccess({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const success = await getSectionData("success", locale, dict.success);
  return (
    <Section variant="contrast" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Narrative */}
          <Reveal className="flex flex-col gap-5">
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">
              {success.title}
            </h2>
            {success.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-content-secondary">
                {p}
              </p>
            ))}
            <div className="mt-2 rounded-card border border-edge-strong bg-accent-soft px-5 py-4 font-medium text-content-primary">
              {success.closing}
            </div>
          </Reveal>

          {/* Checklist */}
          <div className="grid content-start gap-3">
            {success.points.map((point, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="glass flex items-start gap-3 rounded-xl p-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-action-primary text-content-inverse">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed text-content-primary">
                    {point}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
