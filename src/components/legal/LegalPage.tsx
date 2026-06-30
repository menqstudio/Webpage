import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import type { Dictionary, LegalDoc } from "@/content/locales/types";

export function LegalPage({
  dict,
  locale,
  doc,
  year,
}: {
  dict: Dictionary;
  locale: Locale;
  doc: LegalDoc;
  year: number;
}) {
  return (
    <>
      <Header dict={dict} locale={locale} />
      <main id="main">
        <Section variant="base" spacing="lg">
          <Container size="narrow">
            <a
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {dict.common.backToHome}
            </a>

            <h1 className="mt-6 font-display text-4xl font-bold tracking-tightest text-content-primary">
              {doc.title}
            </h1>
            <p className="mt-2 text-sm text-content-muted">{doc.updated}</p>
            <p className="mt-6 text-lg leading-relaxed text-content-secondary">
              {doc.intro}
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {doc.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-xl font-semibold text-content-primary">
                    {s.heading}
                  </h2>
                  <p className="mt-2 leading-relaxed text-content-secondary">
                    {s.body}
                  </p>
                </section>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer dict={dict} locale={locale} year={year} />
    </>
  );
}
