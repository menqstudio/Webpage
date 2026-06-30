import { notFound } from "next/navigation";
import { requireAnyPermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import {
  updateLeadStatusAction,
  addLeadNoteAction,
  archiveLeadAction,
  assignLeadAction,
} from "@/lib/leads/adminActions";
import { LEAD_STATUSES } from "@/lib/leads/constants";
import { solutionLabel } from "@/lib/content/solutionLabel";
import { PageTitle, Panel, StatusPill } from "@/components/admin/ui";

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-content-muted">{label}</dt>
      <dd className="mt-0.5 text-sm text-content-primary">{value || "—"}</dd>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAnyPermission(["leads.view", "leads.view_all"]);
  const user = await getCurrentUser();
  const t = await getAdminDict();
  const { id } = await params;
  const db = getPrisma();
  if (!db) notFound();

  const lead = await db.lead.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { name: true } },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { createdBy: { select: { name: true } } },
      },
    },
  });
  if (!lead) notFound();

  const canUpdate = userHasPermission(user, "leads.update_status");
  const canNote = userHasPermission(user, "leads.add_note");
  const canArchive = userHasPermission(user, "leads.archive");
  const canAssign = userHasPermission(user, "leads.assign");

  const assignableUsers = canAssign
    ? await db.user.findMany({
        where: { status: "ACTIVE" },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      })
    : [];

  return (
    <div>
      <PageTitle
        title={lead.name}
        description={`${t.leadDetail.submitted} ${lead.createdAt.toLocaleString()} · ${lead.locale.toUpperCase()}`}
        action={
          canArchive && lead.status !== "ARCHIVED" ? (
            <form action={archiveLeadAction}>
              <input type="hidden" name="id" value={lead.id} />
              <button
                type="submit"
                className="rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1.5 text-sm font-medium text-content-secondary hover:text-content-primary"
              >
                {t.leadDetail.archive}
              </button>
            </form>
          ) : null
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Panel>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-content-muted">
              {t.leadDetail.details}
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Field label={t.leadDetail.company} value={lead.company} />
              <Field
                label={t.leadDetail.solution}
                value={solutionLabel(lead.interestedSolution, lead.locale)}
              />
              <Field label={t.leadDetail.phone} value={lead.phone} />
              <Field label={t.leadDetail.email} value={lead.email} />
              <Field label={t.leadDetail.source} value={lead.source} />
              <Field label={t.leadDetail.sourcePage} value={lead.sourcePage} />
            </dl>
            <div className="mt-4">
              <dt className="text-xs uppercase tracking-wide text-content-muted">
                {t.leadDetail.message}
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-content-primary">
                {lead.message}
              </dd>
            </div>
          </Panel>

          <Panel>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-content-muted">
              {t.leadDetail.notes}
            </h2>
            {canNote ? (
              <form action={addLeadNoteAction} className="mb-4 flex flex-col gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <textarea
                  name="body"
                  required
                  rows={3}
                  placeholder={t.leadDetail.addNotePlaceholder}
                  className="w-full rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
                <button
                  type="submit"
                  className="self-start rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
                >
                  {t.leadDetail.addNote}
                </button>
              </form>
            ) : null}
            {lead.notes.length === 0 ? (
              <p className="text-sm text-content-muted">{t.leadDetail.noNotes}</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {lead.notes.map((note) => (
                  <li
                    key={note.id}
                    className="rounded-lg border border-edge-subtle bg-surface-secondary p-3 text-sm"
                  >
                    <p className="whitespace-pre-wrap text-content-primary">{note.body}</p>
                    <p className="mt-1.5 text-xs text-content-muted">
                      {note.createdBy?.name ?? "—"} · {note.createdAt.toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="flex flex-col gap-6">
          <Panel>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted">
              {t.leadDetail.status}
            </h2>
            <div className="mb-3">
              <StatusPill status={lead.status} label={t.leadStatus[lead.status]} />
            </div>
            {canUpdate ? (
              <form action={updateLeadStatusAction} className="flex flex-col gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="w-full rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t.leadStatus[s]}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
                >
                  {t.leadDetail.updateStatus}
                </button>
              </form>
            ) : null}
          </Panel>

          {canAssign ? (
            <Panel>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted">
                {t.leadDetail.assignment}
              </h2>
              <p className="mb-3 text-sm text-content-secondary">
                {lead.assignedTo?.name
                  ? `${t.leadDetail.assignedTo} ${lead.assignedTo.name}`
                  : t.leadDetail.unassigned}
              </p>
              <form action={assignLeadAction} className="flex flex-col gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select
                  name="assignedToId"
                  defaultValue={lead.assignedToId ?? ""}
                  className="w-full rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary"
                >
                  <option value="">{t.leadDetail.unassigned}</option>
                  {assignableUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse"
                >
                  {t.leadDetail.assign}
                </button>
              </form>
            </Panel>
          ) : null}

          <Panel>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted">
              {t.leadDetail.delivery}
            </h2>
            <dl className="flex flex-col gap-3">
              <Field
                label={t.leadDetail.notification}
                value={lead.notificationStatus.replace(/_/g, " ")}
              />
              <Field
                label={t.leadDetail.consent}
                value={lead.consent ? t.leadDetail.yes : t.leadDetail.no}
              />
              <Field label={t.leadDetail.utmSource} value={lead.utmSource ?? undefined} />
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  );
}
