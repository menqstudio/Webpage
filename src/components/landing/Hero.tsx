import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { AnalyticsEvent } from "@/lib/analytics/analytics";
import { HeroVisual } from "./HeroVisual";
import { site } from "@/config/site";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

function rise(delay: number): CSSProperties {
  return { "--rise-delay": `${delay}ms` } as CSSProperties;
}

export async function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const hero = await getSectionData("hero", locale, dict.hero);
  return (
    <Section id={site.anchors.top} variant="contrast" spacing="xl" className="overflow-hidden">
      {/* Decorative background grid + gradient */}
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Copy column — visible immediately (no scroll-reveal) for fast LCP */}
          <div className="flex flex-col items-start gap-6">
            <div className="animate-rise">
              <Badge variant="glass">{hero.eyebrow}</Badge>
            </div>
            <h1 className="animate-rise text-balance font-display text-4xl font-bold leading-tight tracking-tightest sm:text-5xl lg:text-6xl" style={rise(60)}>
              {hero.title}{" "}
              <span className="text-gradient-accent">{hero.titleAccent}</span>
            </h1>
            <p className="animate-rise max-w-narrow text-lg leading-relaxed text-content-secondary" style={rise(120)}>
              {hero.subtitle}
            </p>
            <p className="animate-rise max-w-narrow leading-relaxed text-content-muted" style={rise(180)}>
              {hero.support}
            </p>
            <div className="animate-rise flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={rise(240)}>
              <TrackedLink
                href={`#${site.anchors.contact}`}
                className={buttonClasses("primary", "lg")}
                event={AnalyticsEvent.ctaClick}
                eventProps={{ location: "hero", cta: "primary" }}
              >
                {hero.primaryCta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={`#${site.anchors.solutions}`}
                className={buttonClasses("outline", "lg")}
                event={AnalyticsEvent.ctaClick}
                eventProps={{ location: "hero", cta: "secondary" }}
              >
                {hero.secondaryCta}
              </TrackedLink>
            </div>
            <p className="animate-rise text-sm leading-relaxed text-content-muted" style={rise(300)}>
              {hero.trustLine}
            </p>
          </div>

          {/* Visual column */}
          <div className="animate-rise w-full" style={rise(160)}>
            <HeroVisual dict={dict} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
