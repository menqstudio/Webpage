import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { getAdminLocale } from "@/lib/adminI18n";
import { AdminLangSwitcher } from "./AdminLangSwitcher";

export { AuthError, AuthNotice } from "./AuthFeedback";

export async function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const locale = await getAdminLocale();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-70" aria-hidden="true" />
      <div className="absolute right-4 top-4 z-raised">
        <AdminLangSwitcher current={locale} />
      </div>
      <div className="relative w-full max-w-md">
        <div className="mb-7 flex flex-col items-center gap-3 text-center">
          <BrandMark admin />
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tightest text-content-primary">
              {title}
            </h1>
            {subtitle ? <p className="mt-2 text-sm text-content-muted">{subtitle}</p> : null}
          </div>
        </div>
        <div className="premium-panel rounded-3xl p-6 sm:p-8">{children}</div>
        {footer ? <div className="mt-5 text-center text-sm text-content-muted">{footer}</div> : null}
      </div>
    </div>
  );
}
