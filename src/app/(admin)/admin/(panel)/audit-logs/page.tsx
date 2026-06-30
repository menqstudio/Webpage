import { requireAnyPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, EmptyState } from "@/components/admin/ui";

export default async function AuditLogsPage() {
  await requireAnyPermission(["audit.view_limited", "audit.view_all"]);
  const t = await getAdminDict();
  const db = getPrisma();
  const logs = db
    ? await db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 })
    : [];

  return (
    <div>
      <PageTitle title={t.audit.title} description={t.audit.description} />

      {logs.length === 0 ? (
        <EmptyState message={t.audit.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.audit.colAction}</th>
                <th className="px-4 py-3 font-semibold">{t.audit.colEntity}</th>
                <th className="px-4 py-3 font-semibold">{t.audit.colActorRole}</th>
                <th className="px-4 py-3 font-semibold">{t.audit.colIp}</th>
                <th className="px-4 py-3 font-semibold">{t.audit.colWhen}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">{log.action}</td>
                  <td className="px-4 py-3 text-content-secondary">
                    {log.entityType}
                    {log.entityId ? ` · ${log.entityId.slice(0, 8)}` : ""}
                  </td>
                  <td className="px-4 py-3 text-content-secondary">{log.actorRole ?? "—"}</td>
                  <td className="px-4 py-3 text-content-muted">{log.ipAddress ?? "—"}</td>
                  <td className="px-4 py-3 text-content-muted">
                    {log.createdAt.toLocaleString()}
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
