import { requireAnyPermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, EmptyState, StatusPill } from "@/components/admin/ui";
import {
  updateBookingStatusAction,
  archiveBookingAction,
} from "@/lib/bookings/adminActions";
import { BOOKING_STATUSES } from "@/lib/bookings/constants";

export default async function BookingsPage() {
  await requireAnyPermission(["bookings.view", "bookings.view_all"]);
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const canUpdate = userHasPermission(me, "bookings.update_status");
  const canArchive = userHasPermission(me, "bookings.archive");

  const db = getPrisma();
  const bookings = db
    ? await db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
    : [];

  return (
    <div>
      <PageTitle title={t.bookings.title} description={t.bookings.description} />
      {bookings.length === 0 ? (
        <EmptyState message={t.bookings.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.bookings.colName}</th>
                <th className="px-4 py-3 font-semibold">{t.bookings.colContact}</th>
                <th className="px-4 py-3 font-semibold">{t.bookings.colPreferred}</th>
                <th className="px-4 py-3 font-semibold">{t.common.status}</th>
                {canUpdate || canArchive ? (
                  <th className="px-4 py-3 font-semibold">{t.common.actions}</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-medium text-content-primary">{b.name}</td>
                  <td className="px-4 py-3 text-content-secondary">
                    {b.email ?? b.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-content-secondary">
                    {b.preferredAt ? b.preferredAt.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={b.status} label={t.bookingStatus[b.status]} />
                  </td>
                  {canUpdate || canArchive ? (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {canUpdate ? (
                          <form
                            action={updateBookingStatusAction}
                            className="flex items-center gap-1"
                          >
                            <input type="hidden" name="id" value={b.id} />
                            <select
                              name="status"
                              defaultValue={b.status}
                              className="rounded-lg border border-edge-strong bg-surface-primary px-2 py-1 text-xs text-content-primary"
                            >
                              {BOOKING_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {t.bookingStatus[s]}
                                </option>
                              ))}
                            </select>
                            <button
                              type="submit"
                              className="rounded-pill bg-surface-secondary px-2.5 py-1 text-xs font-medium text-content-secondary hover:text-content-primary"
                            >
                              {t.common.set}
                            </button>
                          </form>
                        ) : null}
                        {canArchive && b.status !== "ARCHIVED" ? (
                          <form action={archiveBookingAction}>
                            <input type="hidden" name="id" value={b.id} />
                            <button
                              type="submit"
                              className="rounded-pill border border-edge-subtle px-2.5 py-1 text-xs font-medium text-content-secondary hover:border-edge-strong"
                            >
                              {t.bookings.archive}
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}
