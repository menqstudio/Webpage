import Link from "next/link";
import { Download } from "lucide-react";
import { requireAnyPermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, StatusPill, EmptyState } from "@/components/admin/ui";
import { LEAD_STATUSES } from "@/lib/leads/constants";
import { solutionLabel } from "@/lib/content/solutionLabel";
import { cn } from "@/lib/cn";

function FilterLink({
  status,
  current,
  label,
}: {
  status?: string;
  current?: string;
  label: string;
}) {
  const active = status === current || (!status && !current);
  return (
    <Link
      href={status ? `/admin/leads?status=${status}` : "/admin/leads"}
      className={cn(
        "rounded-pill border px-3 py-1 text-xs font-medium transition-colors duration-base ease-standard",
        active
          ? "border-edge-strong bg-action-primary text-content-inverse"
          : "border-edge-subtle bg-surface-secondary text-content-secondary hover:text-content-primary",
      )}
    >
      {label}
    </Link>
  );
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAnyPermission(["leads.view", "leads.view_all", "leads.view_summary"]);
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const canExport = userHasPermission(me, "leads.export");
  const { status } = await searchParams;
  const db = getPrisma();

  const filterActive =
    status && (LEAD_STATUSES as readonly string[]).includes(status);
  const leads = db
    ? await db.lead.findMany({
        where: filterActive ? { status: status as never } : {},
        orderBy: { createdAt: "desc" },
        take: 100,
      })
    : [];

  return (
    <div>
      <PageTitle
        title={t.leads.title}
        description={t.leads.description}
        action={
          canExport ? (
            // Plain anchor: file download from an API route, not a page nav.
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a
              href="/api/admin/leads/export"
              className="inline-flex items-center gap-2 rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1.5 text-sm font-medium text-content-secondary hover:border-edge-strong hover:text-content-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t.leads.exportCsv}
            </a>
          ) : null
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterLink current={status} label={t.leads.all} />
        {LEAD_STATUSES.map((s) => (
          <FilterLink key={s} status={s} current={status} label={t.leadStatus[s]} />
        ))}
      </div>

      {leads.length === 0 ? (
        <EmptyState message={t.leads.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.leads.colName}</th>
                <th className="px-4 py-3 font-semibold">{t.leads.colCompany}</th>
                <th className="px-4 py-3 font-semibold">{t.leads.colContact}</th>
                <th className="px-4 py-3 font-semibold">{t.leads.colSolution}</th>
                <th className="px-4 py-3 font-semibold">{t.common.status}</th>
                <th className="px-4 py-3 font-semibold">{t.leads.colCreated}</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-content-secondary">
                    {lead.company ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-content-secondary">
                    {lead.email ?? lead.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-content-secondary">
                    {solutionLabel(lead.interestedSolution, lead.locale)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={lead.status} label={t.leadStatus[lead.status]} />
                  </td>
                  <td className="px-4 py-3 text-content-muted">
                    {lead.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium text-action-primary hover:underline"
                    >
                      {t.common.view}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}
