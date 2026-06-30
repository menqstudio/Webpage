import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { industryIcons } from "@/config/icons";
import { site } from "@/config/site";
import { getPublishedIndustryGroups } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function Industries({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { industries } = dict;
  const groups = (await getPublishedIndustryGroups(locale)) ?? industries.groups;
  return (
    <Section id={site.anchors.industries} variant="muted" spacing="lg">
      <Container>
        <SectionHeading title={industries.title} description={industries.intro} />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => {
            const Icon = industryIcons[i] ?? industryIcons[0];
            return (
              <Reveal key={i} delay={(i % 3) * 70}>
                <Card variant="solid" interactive className="flex h-full flex-col">
                  <div className="flex items-center gap-4">
                    <IconWrap icon={Icon} variant="soft" />
                    <h3 className="text-lg font-semibold text-content-primary">
                      {group.title}
                    </h3>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                      {industries.examplesLabel}
                    </div>
                    <p className="mt-1 leading-relaxed text-content-secondary">
                      {group.examples}
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-edge-subtle bg-surface-secondary p-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-content-secondary">
                      <span className="font-semibold text-content-primary">
                        {industries.solutionsLabel}:{" "}
                      </span>
                      {group.solutions}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mx-auto mt-10 max-w-narrow text-center text-content-secondary">
          <p className="leading-relaxed">{industries.closing}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
