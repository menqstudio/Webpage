import { site } from "@/config/site";
import { contact } from "@/config/contact";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

/** Organization + WebSite + FAQPage structured data for rich results. */
export function JsonLd({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const url = `${site.url}/${locale}`;

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url,
      description: dict.meta.description,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contact.email.label,
        telephone: contact.phone.label,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dict.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
