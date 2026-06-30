import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getSectionDef } from "@/config/sectionContent";
import { PageTitle, Panel, StatusPill } from "@/components/admin/ui";
import { SectionContentForm } from "@/components/admin/SectionContentForm";
import { saveSectionAction, setSectionStatusAction } from "@/lib/content/sectionActions";
import { cn } from "@/lib/cn";

function StatusButton({
  type,
  language,
  status,
  label,
}: {
  type: string;
  language: string;
  status: string;
  label: string;
}) {
  return (
    <form action={setSectionStatusAction}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded-pill border border-edge-subtle px-3 py-1.5 text-xs font-medium text-content-secondary hover:border-edge-strong hover:text-content-primary"
      >
        {label}
      </button>
    </form>
  );
}

export default async function EditSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ lang?: string; saved?: string }>;
}) {
  await requirePermission("content.edit");
  const { type } = await params;
  const { lang, saved } = await searchParams;
  const def = getSectionDef(type);
  if (!def) notFound();

  const language: Locale = isLocale(lang) ? lang : "hy";
  const t = await getAdminDict();
  const names = t.content.sections;
  const sectionName = names[type as keyof typeof names] ?? type;

  const dict = getDictionary(language) as unknown as Record<string, unknown>;
  const dictSection = (dict[type] ?? {}) as Record<string, unknown>;

  const db = getPrisma();
  const existing = db
    ? await db.contentItem.findFirst({ where: { type, language } })
    : null;
  const overrideContent =
    existing?.content && typeof existing.content === "object"
      ? (existing.content as Record<string, unknown>)
      : {};
  const defaults = { ...dictSection, ...overrideContent };
  const status = existing?.status ?? "DRAFT";

  return (
    <div>
      <PageTitle
        title={sectionName}
        description={t.content.note}
        action={
          <div className="flex items-center gap-3">
            <StatusPill status={status} label={t.contentStatus[status]} />
            <Link href="/admin/content" className="text-sm font-medium text-content-secondary hover:text-content-primary">
              ← {t.common.back}
            </Link>
          </div>
        }
      />

      {/* Language tabs */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-content-muted">{t.content.language}:</span>
        {locales.map((l) => (
          <Link
            key={l}
            href={`/admin/content/${type}?lang=${l}`}
            className={cn(
              "rounded-pill border px-3 py-1 text-xs font-semibold",
              l === language
                ? "border-edge-strong bg-action-primary text-content-inverse"
                : "border-edge-subtle bg-surface-secondary text-content-secondary hover:text-content-primary",
            )}
          >
            {l.toUpperCase()}
          </Link>
        ))}

        <div className="ml-auto flex items-center gap-2">
          {status !== "PUBLISHED" ? (
            <StatusButton type={type} language={language} status="PUBLISHED" label={t.content.publish} />
          ) : null}
          {status !== "ARCHIVED" && existing ? (
            <StatusButton type={type} language={language} status="ARCHIVED" label={t.content.archive} />
          ) : null}
          {status === "ARCHIVED" ? (
            <StatusButton type={type} language={language} status="DRAFT" label={t.content.toDraft} />
          ) : null}
        </div>
      </div>

      {saved ? (
        <div className="mb-4 rounded-lg border border-edge-strong bg-accent-soft px-4 py-2 text-sm text-content-primary">
          {t.content.saved}
        </div>
      ) : null}

      <Panel>
        <SectionContentForm
          def={def}
          language={language}
          defaults={defaults}
          action={saveSectionAction}
          saveLabel={t.content.save}
        />
      </Panel>
    </div>
  );
}
