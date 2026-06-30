import type { ReactNode } from "react";
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
    <div className="relative flex min-h-screen items-center justify-center bg-surface-secondary px-4 py-12">
      <div className="absolute right-4 top-4">
        <AdminLangSwitcher current={locale} />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-action-primary font-display text-xl font-bold text-content-inverse">
            M
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tightest text-content-primary">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm text-content-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="rounded-card border border-edge-subtle bg-page p-6 shadow-card">
          {children}
        </div>
        {footer ? (
          <div className="mt-4 text-center text-sm text-content-muted">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
