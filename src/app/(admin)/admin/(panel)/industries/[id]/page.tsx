import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, StatusPill } from "@/components/admin/ui";
import { IndustryForm } from "@/components/admin/IndustryForm";
import { updateIndustryAction } from "@/lib/content/industryActions";

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("industries.edit");
  const t = await getAdminDict();
  const { id } = await params;
  const db = getPrisma();
  if (!db) notFound();
  const industry = await db.industry.findUnique({ where: { id } });
  if (!industry) notFound();

  return (
    <div>
      <PageTitle
        title={industry.title}
        description={`${t.nav.industries} · ${industry.language.toUpperCase()}`}
        action={
          <div className="flex items-center gap-3">
            <StatusPill status={industry.status} label={t.contentStatus[industry.status]} />
            <Link
              href="/admin/industries"
              className="text-sm font-medium text-content-secondary hover:text-content-primary"
            >
              ← {t.common.back}
            </Link>
          </div>
        }
      />
      <Panel>
        <IndustryForm industry={industry} action={updateIndustryAction} t={t.form} />
      </Panel>
    </div>
  );
}
