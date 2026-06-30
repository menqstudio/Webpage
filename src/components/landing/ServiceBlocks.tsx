import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIcons } from "@/config/icons";
import { site } from "@/config/site";
import { getPublishedServiceBlocks } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function ServiceBlocks({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { services } = dict;
  const blocks = (await getPublishedServiceBlocks(locale)) ?? services.blocks;
  return (
    <Section id={site.anchors.solutions} variant="base" spacing="lg">
      <Container>
        <SectionHeading title={services.title} description={services.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blocks.map((block, i) => {
            const Icon = serviceIcons[i] ?? serviceIcons[0];
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={i} delay={(i % 2) * 90}>
                <Card variant="elevated" interactive className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <IconWrap icon={Icon} variant="accent" />
                    <span className="font-display text-3xl font-bold text-content-muted">
                      {num}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-content-primary">
                    {block.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-content-secondary">
                    <span className="font-semibold text-content-primary">
                      {services.goalLabel}:{" "}
                    </span>
                    {block.goal}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {block.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1 text-sm text-content-secondary"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="rounded-xl border border-edge-strong bg-accent-soft px-4 py-3 text-sm leading-relaxed text-content-primary">
                      <span className="font-semibold">
                        {services.valueLabel}:{" "}
                      </span>
                      {block.value}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
