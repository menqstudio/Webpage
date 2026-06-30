import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { trustIcons } from "@/config/icons";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function Trust({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const trust = await getSectionData("trust", locale, dict.trust);
  return (
    <Section variant="base" spacing="lg">
      <Container>
        <SectionHeading title={trust.title} description={trust.description} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trust.cards.map((card, i) => {
            const Icon = trustIcons[i] ?? trustIcons[0];
            return (
              <Reveal key={i} delay={(i % 3) * 70}>
                <Card variant="elevated" interactive className="h-full">
                  <IconWrap icon={Icon} variant="accent" />
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

        {/* Security / data-handling mini-block */}
        <Reveal delay={120} className="mt-8">
          <div className="flex flex-col gap-4 rounded-card border border-edge-strong bg-accent-soft p-6 sm:flex-row sm:items-start sm:gap-5">
            <IconWrap icon={ShieldCheck} variant="accent" />
            <div>
              <h3 className="text-lg font-semibold text-content-primary">
                {trust.security.title}
              </h3>
              <p className="mt-2 leading-relaxed text-content-secondary">
                {trust.security.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
