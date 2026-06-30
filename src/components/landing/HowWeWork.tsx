import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function HowWeWork({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const process = await getSectionData("process", locale, dict.process);
  return (
    <Section id={site.anchors.process} variant="muted" spacing="lg">
      <Container>
        <SectionHeading title={process.title} description={process.description} />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 70}>
              <div className="relative h-full rounded-card border border-edge-subtle bg-surface-primary p-6">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill bg-action-primary font-display text-lg font-bold text-content-inverse">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-content-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-content-secondary">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
