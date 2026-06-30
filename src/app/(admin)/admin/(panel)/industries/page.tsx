import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, EmptyState, StatusPill } from "@/components/admin/ui";
import { setIndustryStatusAction } from "@/lib/content/industryActions";

function StatusButton({ id, status, label }: { id: string; status: string; label: string }) {
  return (
    <form action={setIndustryStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded-pill border border-edge-subtle px-2.5 py-1 text-xs font-medium text-content-secondary hover:border-edge-strong hover:text-content-primary"
      >
        {label}
      </button>
    </form>
  );
}

export default async function IndustriesPage() {
  await requirePermission("industries.view");
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const canCreate = userHasPermission(me, "industries.create");
  const canPublish = userHasPermission(me, "industries.publish");
  const canArchive = userHasPermission(me, "industries.archive");
  const canEdit = userHasPermission(me, "industries.edit");

  const db = getPrisma();
  const industries = db
    ? await db.industry.findMany({ orderBy: [{ language: "asc" }, { order: "asc" }] })
    : [];

  return (
    <div>
      <PageTitle
        title={t.industries.title}
        description={t.industries.description}
        action={
          canCreate ? (
            <Link
              href="/admin/industries/new"
              className="inline-flex items-center gap-2 rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t.industries.new}
            </Link>
          ) : null
        }
      />

      {industries.length === 0 ? (
        <EmptyState message={t.industries.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.industries.colTitle}</th>
                <th className="px-4 py-3 font-semibold">{t.industries.colLang}</th>
                <th className="px-4 py-3 font-semibold">{t.industries.colOrder}</th>
                <th className="px-4 py-3 font-semibold">{t.common.status}</th>
                <th className="px-4 py-3 font-semibold">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {industries.map((it) => (
                <tr key={it.id} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">{it.title}</td>
                  <td className="px-4 py-3 uppercase text-content-secondary">{it.language}</td>
                  <td className="px-4 py-3 text-content-secondary">{it.order}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={it.status} label={t.contentStatus[it.status]} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {canEdit ? (
                        <Link
                          href={`/admin/industries/${it.id}`}
                          className="font-medium text-action-primary hover:underline"
                        >
                          {t.common.edit}
                        </Link>
                      ) : null}
                      {it.status !== "PUBLISHED" && canPublish ? (
                        <StatusButton id={it.id} status="PUBLISHED" label={t.industries.publish} />
                      ) : null}
                      {it.status !== "ARCHIVED" && canArchive ? (
                        <StatusButton id={it.id} status="ARCHIVED" label={t.industries.archive} />
                      ) : null}
                      {it.status === "ARCHIVED" && canEdit ? (
                        <StatusButton id={it.id} status="DRAFT" label={t.industries.toDraft} />
                      ) : null}
                    </div>
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
