import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { painIcons } from "@/config/icons";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function Pain({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const pain = await getSectionData("pain", locale, dict.pain);
  return (
    <Section variant="base" spacing="lg">
      <Container>
        <SectionHeading title={pain.title} description={pain.description} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pain.cards.map((card, i) => {
            const Icon = painIcons[i] ?? painIcons[0];
            return (
              <Reveal key={i} delay={(i % 3) * 70}>
                <Card variant="elevated" interactive className="h-full">
                  <IconWrap icon={Icon} variant="soft" />
                  <h3 className="mt-5 text-lg font-semibold text-content-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-content-secondary">
                    {card.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-10">
          <div className="rounded-card border border-edge-strong bg-accent-soft px-6 py-5 text-center text-lg font-medium text-content-primary">
            {pain.closing}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
