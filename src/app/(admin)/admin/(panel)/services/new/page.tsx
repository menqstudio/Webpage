import Link from "next/link";
import { requirePermission } from "@/lib/auth/rbac";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createServiceAction } from "@/lib/content/serviceActions";

export default async function NewServicePage() {
  await requirePermission("services.create");
  const t = await getAdminDict();
  return (
    <div>
      <PageTitle
        title={t.services.newTitle}
        description={t.services.newDesc}
        action={
          <Link
            href="/admin/services"
            className="text-sm font-medium text-content-secondary hover:text-content-primary"
          >
            ← {t.common.back}
          </Link>
        }
      />
      <Panel>
        <ServiceForm action={createServiceAction} t={t.form} />
      </Panel>
    </div>
  );
}
