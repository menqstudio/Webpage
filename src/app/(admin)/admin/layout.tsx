import type { Metadata } from "next";
import { cookies } from "next/headers";
import "../../globals.css";
import { fontVariables } from "@/lib/fonts";
import { THEME_COOKIE, parseTheme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "MenQ Admin",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);
  return (
    <html
      lang="en"
      data-theme={theme}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body>{children}</body>
    </html>
  );
}
