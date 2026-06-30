import { Sparkles } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function AISection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const ai = await getSectionData("ai", locale, dict.ai);
  return (
    <Section variant="base" spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <Reveal className="flex flex-col gap-5">
            <Badge variant="accent">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              AI
            </Badge>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">
              {ai.title}
            </h2>
            {ai.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-content-secondary">
                {p}
              </p>
            ))}
          </Reveal>

          {/* Capability matrix */}
          <div className="flex flex-col gap-3">
            <Reveal>
              <div className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                {ai.capabilitiesLabel}
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {ai.capabilities.map((cap, i) => (
                <Reveal key={i} delay={(i % 2) * 60}>
                  <div className="flex items-center gap-3 rounded-xl border border-edge-subtle bg-surface-secondary p-4">
                    <span className="h-2 w-2 shrink-0 rounded-pill bg-accent" />
                    <span className="text-sm font-medium text-content-primary">
                      {cap}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
