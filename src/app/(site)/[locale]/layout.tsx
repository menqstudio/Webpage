import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import "../../globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { buildMetadata } from "@/lib/seo/metadata";
import { fontVariables } from "@/lib/fonts";
import { THEME_COOKIE, parseTheme } from "@/lib/theme";
import { CONSENT_COOKIE, analyticsEnabled } from "@/lib/consent";
import { getDictionary } from "@/content/dictionaries";
import {
  locales,
  defaultLocale,
  isLocale,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : defaultLocale;
  return buildMetadata(resolved);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);
  const showConsent = analyticsEnabled() && !cookieStore.get(CONSENT_COOKIE)?.value;
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      data-theme={theme}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body>
        {children}
        <Analytics />
        {showConsent ? (
          <CookieConsent
            locale={locale}
            regionLabel={dict.common.cookieRegionLabel}
            notice={dict.common.cookieNotice}
            accept={dict.common.cookieAccept}
            decline={dict.common.cookieDecline}
            policyLabel={dict.footer.legal.cookies}
          />
        ) : null}
      </body>
    </html>
  );
}
