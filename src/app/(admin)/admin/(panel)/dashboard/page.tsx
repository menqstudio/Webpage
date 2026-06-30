import { requireUser } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, StatCard, Panel } from "@/components/admin/ui";

export default async function DashboardPage() {
  const user = await requireUser();
  const t = await getAdminDict();
  const db = getPrisma();

  const stats = {
    newToday: 0,
    qualified: 0,
    won: 0,
    pendingBookings: 0,
    failedNotifications: 0,
  };
  let recent: {
    id: string;
    action: string;
    entityType: string;
    createdAt: Date;
    actorRole: string | null;
  }[] = [];

  if (db) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const [newToday, qualified, won, pendingBookings, failedNotifications, audit] =
      await Promise.all([
        db.lead.count({ where: { createdAt: { gte: startOfDay } } }),
        db.lead.count({ where: { status: "QUALIFIED" } }),
        db.lead.count({ where: { status: "WON" } }),
        db.booking.count({ where: { status: "NEW" } }),
        db.lead.count({
          where: { notificationStatus: { in: ["FAILED", "PARTIALLY_FAILED"] } },
        }),
        db.auditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          select: {
            id: true,
            action: true,
            entityType: true,
            createdAt: true,
            actorRole: true,
          },
        }),
      ]);
    stats.newToday = newToday;
    stats.qualified = qualified;
    stats.won = won;
    stats.pendingBookings = pendingBookings;
    stats.failedNotifications = failedNotifications;
    recent = audit;
  }

  return (
    <div>
      <PageTitle
        title={`${t.dashboard.welcome}, ${user.name}`}
        description={t.dashboard.overview}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label={t.dashboard.newToday} value={stats.newToday} />
        <StatCard label={t.dashboard.qualified} value={stats.qualified} />
        <StatCard label={t.dashboard.won} value={stats.won} />
        <StatCard label={t.dashboard.pendingBookings} value={stats.pendingBookings} />
        <StatCard
          label={t.dashboard.failedNotifications}
          value={stats.failedNotifications}
          hint={t.dashboard.failedHint}
        />
      </div>

      <div className="mt-6">
        <Panel>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-content-muted">
            {t.dashboard.recentActivity}
          </h2>
          {recent.length === 0 ? (
            <p className="text-sm text-content-muted">{t.dashboard.noActivity}</p>
          ) : (
            <ul className="flex flex-col divide-y divide-edge-subtle">
              {recent.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-4 py-2.5 text-sm"
                >
                  <span className="font-medium text-content-primary">{e.action}</span>
                  <span className="text-content-muted">
                    {e.entityType}
                    {e.actorRole ? ` · ${e.actorRole}` : ""} ·{" "}
                    {e.createdAt.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
