import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, EmptyState, StatusPill } from "@/components/admin/ui";
import { setServiceStatusAction } from "@/lib/content/serviceActions";

function StatusButton({ id, status, label }: { id: string; status: string; label: string }) {
  return (
    <form action={setServiceStatusAction}>
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

export default async function ServicesPage() {
  await requirePermission("services.view");
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const canCreate = userHasPermission(me, "services.create");
  const canPublish = userHasPermission(me, "services.publish");
  const canArchive = userHasPermission(me, "services.archive");
  const canEdit = userHasPermission(me, "services.edit");

  const db = getPrisma();
  const services = db
    ? await db.service.findMany({ orderBy: [{ language: "asc" }, { order: "asc" }] })
    : [];

  return (
    <div>
      <PageTitle
        title={t.services.title}
        description={t.services.description}
        action={
          canCreate ? (
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t.services.new}
            </Link>
          ) : null
        }
      />

      {services.length === 0 ? (
        <EmptyState message={t.services.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.services.colTitle}</th>
                <th className="px-4 py-3 font-semibold">{t.services.colLang}</th>
                <th className="px-4 py-3 font-semibold">{t.services.colOrder}</th>
                <th className="px-4 py-3 font-semibold">{t.common.status}</th>
                <th className="px-4 py-3 font-semibold">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">{s.title}</td>
                  <td className="px-4 py-3 uppercase text-content-secondary">{s.language}</td>
                  <td className="px-4 py-3 text-content-secondary">{s.order}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={s.status} label={t.contentStatus[s.status]} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {canEdit ? (
                        <Link
                          href={`/admin/services/${s.id}`}
                          className="font-medium text-action-primary hover:underline"
                        >
                          {t.common.edit}
                        </Link>
                      ) : null}
                      {s.status !== "PUBLISHED" && canPublish ? (
                        <StatusButton id={s.id} status="PUBLISHED" label={t.services.publish} />
                      ) : null}
                      {s.status !== "ARCHIVED" && canArchive ? (
                        <StatusButton id={s.id} status="ARCHIVED" label={t.services.archive} />
                      ) : null}
                      {s.status === "ARCHIVED" && canEdit ? (
                        <StatusButton id={s.id} status="DRAFT" label={t.services.toDraft} />
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
