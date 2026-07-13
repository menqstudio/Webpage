import type { CSSProperties } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

function rise(delay: number): CSSProperties { return { "--rise-delay": `${delay}ms` } as CSSProperties; }

export async function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const hero = await getSectionData("hero", locale, dict.hero);
  return (
    <Section id={site.anchors.top} variant="contrast" spacing="xl" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <div className="animate-rise" style={rise(0)}><Badge variant="glass"><span className="animate-signal h-2 w-2 rounded-pill bg-state-success" aria-hidden="true" />{hero.eyebrow}</Badge></div>
            <h1 className="animate-rise max-w-3xl text-balance font-display text-4xl font-bold leading-tight tracking-tightest sm:text-5xl lg:text-6xl" style={rise(60)}>{hero.title} <span className="text-gradient-accent">{hero.titleAccent}</span></h1>
            <p className="animate-rise max-w-narrow text-lg leading-relaxed text-content-secondary sm:text-xl" style={rise(120)}>{hero.subtitle}</p>
            <p className="animate-rise max-w-narrow leading-relaxed text-content-muted" style={rise(180)}>{hero.support}</p>
            <div className="animate-rise flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={rise(240)}>
              <TrackedLink href={`#${site.anchors.contact}`} className={buttonClasses("primary", "lg")} event={AnalyticsEvent.ctaClick} eventProps={{ location: "hero", cta: "primary" }}>{hero.primaryCta}<ArrowRight className="h-5 w-5" aria-hidden="true" /></TrackedLink>
              <TrackedLink href={`#${site.anchors.solutions}`} className={buttonClasses("outline", "lg")} event={AnalyticsEvent.ctaClick} eventProps={{ location: "hero", cta: "secondary" }}>{hero.secondaryCta}</TrackedLink>
            </div>
            <div className="animate-rise grid w-full gap-3 border-t border-edge-subtle pt-5 sm:grid-cols-3" style={rise(300)}>
              {hero.visual.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><div><div className="font-display text-lg font-bold text-content-primary">{metric.value}</div><div className="text-xs leading-relaxed text-content-muted">{metric.label}</div></div></div>
              ))}
            </div>
            <p className="animate-rise text-sm leading-relaxed text-content-muted" style={rise(360)}>{hero.trustLine}</p>
          </div>
          <div className="animate-rise w-full lg:pl-4" style={rise(160)}><HeroVisual dict={dict} /></div>
        </div>
      </Container>
    </Section>
  );
}
