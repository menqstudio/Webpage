import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(loc);
  return buildMetadata(loc, {
    path: "/terms",
    title: dict.legal.terms.title,
    description: dict.legal.terms.intro,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <LegalPage
      dict={dict}
      locale={locale}
      doc={dict.legal.terms}
      year={new Date().getFullYear()}
    />
  );
}
