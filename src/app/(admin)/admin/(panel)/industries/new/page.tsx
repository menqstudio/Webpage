import Link from "next/link";
import { requirePermission } from "@/lib/auth/rbac";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel } from "@/components/admin/ui";
import { IndustryForm } from "@/components/admin/IndustryForm";
import { createIndustryAction } from "@/lib/content/industryActions";

export default async function NewIndustryPage() {
  await requirePermission("industries.create");
  const t = await getAdminDict();
  return (
    <div>
      <PageTitle
        title={t.industries.newTitle}
        description={t.industries.newDesc}
        action={
          <Link
            href="/admin/industries"
            className="text-sm font-medium text-content-secondary hover:text-content-primary"
          >
            ← {t.common.back}
          </Link>
        }
      />
      <Panel>
        <IndustryForm action={createIndustryAction} t={t.form} />
      </Panel>
    </div>
  );
}
