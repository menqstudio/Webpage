import Script from "next/script";
import { cookies } from "next/headers";
import { CONSENT_COOKIE } from "@/lib/consent";

/**
 * Injects GA4 and/or GTM only when (a) the corresponding env id is set AND
 * (b) the visitor has accepted cookies. Without consent it renders nothing —
 * no cookies, no network.
 */
export async function Analytics() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  if (!ga4 && !gtm) return null;

  const consent = (await cookies()).get(CONSENT_COOKIE)?.value;
  if (consent !== "accepted") return null;

  return (
    <>
      {ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {gtm ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}
    </>
  );
}
