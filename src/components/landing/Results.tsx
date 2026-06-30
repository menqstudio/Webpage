import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { resultIcons } from "@/config/icons";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function Results({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const results = await getSectionData("results", locale, dict.results);
  return (
    <Section variant="spotlight" spacing="lg" className="overflow-hidden">
      <Container className="relative">
        <SectionHeading title={results.title} description={results.description} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.cards.map((card, i) => {
            const Icon = resultIcons[i] ?? resultIcons[0];
            return (
              <Reveal key={i} delay={(i % 3) * 70}>
                <div className="glass h-full rounded-card p-6 transition duration-base ease-standard hover:-translate-y-1 hover:shadow-glow">
                  <IconWrap icon={Icon} variant="glass" />
                  <h3 className="mt-5 text-lg font-semibold text-content-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-content-secondary">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
