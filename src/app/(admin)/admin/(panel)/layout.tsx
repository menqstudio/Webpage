import { LogOut } from "lucide-react";
import { requireUser, userHasAnyPermission } from "@/lib/auth/rbac";
import { logoutAction } from "@/lib/auth/actions";
import { adminNav } from "@/config/adminNav";
import { type RoleKey } from "@/lib/auth/permissions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminLangSwitcher } from "@/components/admin/AdminLangSwitcher";
import { getAdminDict, getAdminLocale } from "@/lib/adminI18n";

// Authenticated admin pages must never be statically prerendered.
export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const t = await getAdminDict();
  const locale = await getAdminLocale();

  const visible = adminNav.filter(
    (i) => i.perms.length === 0 || userHasAnyPermission(user, i.perms),
  );
  const visibleHrefs = visible.map((i) => i.href);
  const navLabels: Record<string, string> = {};
  for (const item of visible) navLabels[item.href] = t.nav[item.key];

  const primaryRole = user.roles[0] as RoleKey | undefined;
  const roleLabel = primaryRole ? t.roles[primaryRole] ?? primaryRole : "—";

  return (
    <div className="flex min-h-screen bg-surface-secondary text-content-primary">
      <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-edge-subtle bg-page p-4 lg:flex">
        <div className="flex items-center gap-2 px-2 font-display text-lg font-bold tracking-tightest">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-action-primary text-content-inverse">
            M
          </span>
          MenQ Admin
        </div>
        <AdminSidebar visibleHrefs={visibleHrefs} labels={navLabels} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-edge-subtle bg-page px-4 lg:px-8">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{user.name}</div>
            <div className="truncate text-xs text-content-muted">
              {user.email} · {roleLabel}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AdminLangSwitcher current={locale} />
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1.5 text-sm font-medium text-content-secondary transition-colors duration-base ease-standard hover:border-edge-strong hover:text-content-primary"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                {t.common.logout}
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
