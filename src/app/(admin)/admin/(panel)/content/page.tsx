import Link from "next/link";
import { requirePermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, StatusPill } from "@/components/admin/ui";
import { editableSections, editableSectionTypes } from "@/config/sectionContent";

export default async function ContentPage() {
  await requirePermission("content.view");
  const t = await getAdminDict();
  const db = getPrisma();

  // Map each section type → its published languages.
  const published = new Map<string, string[]>();
  if (db) {
    const rows = await db.contentItem.findMany({
      where: { type: { in: editableSectionTypes }, status: "PUBLISHED" },
      select: { type: true, language: true },
    });
    for (const r of rows) {
      published.set(r.type, [...(published.get(r.type) ?? []), r.language.toUpperCase()]);
    }
  }

  const names = t.content.sections;

  return (
    <div>
      <PageTitle title={t.content.title} description={t.content.description} />
      <p className="mb-4 text-sm text-content-muted">{t.content.note}</p>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">{t.content.title}</th>
              <th className="px-4 py-3 font-semibold">{t.common.status}</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge-subtle">
            {editableSections.map((s) => {
              const langs = published.get(s.type);
              return (
                <tr key={s.type} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">
                    {names[s.type as keyof typeof names] ?? s.type}
                  </td>
                  <td className="px-4 py-3">
                    {langs && langs.length > 0 ? (
                      <span className="flex items-center gap-2">
                        <StatusPill status="PUBLISHED" label={t.contentStatus.PUBLISHED} />
                        <span className="text-xs text-content-muted">{langs.join(", ")}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-content-muted">default</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/content/${s.type}`}
                      className="font-medium text-action-primary hover:underline"
                    >
                      {t.content.edit}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
