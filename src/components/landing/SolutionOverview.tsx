import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { solutionIcons } from "@/config/icons";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function SolutionOverview({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const solution = await getSectionData("solution", locale, dict.solution);
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <SectionHeading title={solution.title} description={solution.description} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solution.pillars.map((pillar, i) => {
            const Icon = solutionIcons[i] ?? solutionIcons[0];
            return (
              <Reveal key={i} delay={(i % 3) * 70}>
                <Card variant="solid" interactive className="h-full">
                  <div className="flex items-center gap-4">
                    <IconWrap icon={Icon} variant="accent" />
                    <h3 className="text-lg font-semibold text-content-primary">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-content-secondary">
                    {pillar.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
