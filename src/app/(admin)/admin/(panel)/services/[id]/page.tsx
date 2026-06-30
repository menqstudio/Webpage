import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, StatusPill } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { updateServiceAction } from "@/lib/content/serviceActions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("services.edit");
  const t = await getAdminDict();
  const { id } = await params;
  const db = getPrisma();
  if (!db) notFound();
  const service = await db.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <PageTitle
        title={service.title}
        description={`${t.nav.services} · ${service.language.toUpperCase()}`}
        action={
          <div className="flex items-center gap-3">
            <StatusPill status={service.status} label={t.contentStatus[service.status]} />
            <Link
              href="/admin/services"
              className="text-sm font-medium text-content-secondary hover:text-content-primary"
            >
              ← {t.common.back}
            </Link>
          </div>
        }
      />
      <Panel>
        <ServiceForm service={service} action={updateServiceAction} t={t.form} />
      </Panel>
    </div>
  );
}
