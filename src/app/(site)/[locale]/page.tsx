import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/landing/Hero";
import { Pain } from "@/components/landing/Pain";
import { SolutionOverview } from "@/components/landing/SolutionOverview";
import { ServiceBlocks } from "@/components/landing/ServiceBlocks";
import { BusinessSuccess } from "@/components/landing/BusinessSuccess";
import { Industries } from "@/components/landing/Industries";
import { Results } from "@/components/landing/Results";
import { AISection } from "@/components/landing/AISection";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Trust } from "@/components/landing/Trust";
import { Faq } from "@/components/landing/Faq";
import { CTA } from "@/components/landing/CTA";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";
import { RevealController } from "@/components/ui/RevealController";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <>
      <SkipLink label={dict.common.skipToContent} />

      <Header dict={dict} locale={locale} />

      <main id="main">
        <Hero dict={dict} locale={locale} />
        <Pain dict={dict} locale={locale} />
        <SolutionOverview dict={dict} locale={locale} />
        <ServiceBlocks dict={dict} locale={locale} />
        <BusinessSuccess dict={dict} locale={locale} />
        <Industries dict={dict} locale={locale} />
        <Results dict={dict} locale={locale} />
        <AISection dict={dict} locale={locale} />
        <HowWeWork dict={dict} locale={locale} />
        <Trust dict={dict} locale={locale} />
        <Faq dict={dict} />
        <CTA dict={dict} locale={locale} />
      </main>

      <Footer dict={dict} locale={locale} year={year} />

      <MobileStickyCTA
        href={`/${locale}#${site.anchors.contact}`}
        label={dict.common.ctaPrimary}
        targetId={site.anchors.contact}
      />

      <RevealController />
      <JsonLd dict={dict} locale={locale} />
    </>
  );
}
