import { requirePermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel, EmptyState } from "@/components/admin/ui";
import { InviteForm } from "@/components/admin/InviteForm";
import { ROLE_KEYS, type RoleKey } from "@/lib/auth/permissions";
import {
  deactivateUserAction,
  reactivateUserAction,
  changeUserRoleAction,
} from "@/lib/auth/userActions";

const invitableRoles = ROLE_KEYS.filter((r) => r !== "super_admin");

export default async function UsersPage() {
  await requirePermission("users.view");
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const db = getPrisma();

  const users = db
    ? await db.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { roles: { include: { role: true } } },
      })
    : [];

  const canInvite = userHasPermission(me, "users.create");
  const canEditRole = userHasPermission(me, "users.edit");
  const canDeactivate = userHasPermission(me, "users.deactivate");
  const canReactivate = userHasPermission(me, "users.reactivate");
  const showActions = canEditRole || canDeactivate || canReactivate;

  const roleOptions = invitableRoles.map((r) => ({ value: r, label: t.roles[r] }));

  return (
    <div>
      <PageTitle title={t.users.title} description={t.users.description} />

      {canInvite ? (
        <Panel className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted">
            {t.users.inviteTitle}
          </h2>
          <InviteForm
            roleOptions={roleOptions}
            emailPlaceholder={t.users.emailPlaceholder}
            submit={t.users.sendInvite}
            submitting={t.users.inviting}
            created={t.users.inviteCreated}
          />
        </Panel>
      ) : null}

      {users.length === 0 ? (
        <EmptyState message={t.users.empty} />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-edge-subtle text-xs uppercase tracking-wide text-content-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.users.colName}</th>
                <th className="px-4 py-3 font-semibold">{t.users.colEmail}</th>
                <th className="px-4 py-3 font-semibold">{t.users.colRoles}</th>
                <th className="px-4 py-3 font-semibold">{t.common.status}</th>
                {showActions ? <th className="px-4 py-3 font-semibold">{t.common.actions}</th> : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-edge-subtle">
              {users.map((u) => {
                const roleKey = u.roles[0]?.role.key as RoleKey | undefined;
                const isSuper = u.roles.some((r) => r.role.key === "super_admin");
                const isSelf = u.id === me?.id;
                const editable = !isSuper && !isSelf;
                return (
                  <tr key={u.id} className="hover:bg-surface-secondary">
                    <td className="px-4 py-3 font-medium text-content-primary">{u.name}</td>
                    <td className="px-4 py-3 text-content-secondary">{u.email}</td>
                    <td className="px-4 py-3 text-content-secondary">
                      {roleKey ? t.roles[roleKey] ?? roleKey : "—"}
                    </td>
                    <td className="px-4 py-3 text-content-secondary">
                      {t.userStatus[u.status]}
                    </td>
                    {showActions ? (
                      <td className="px-4 py-3">
                        {editable ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {canEditRole ? (
                              <form action={changeUserRoleAction} className="flex items-center gap-1">
                                <input type="hidden" name="id" value={u.id} />
                                <select
                                  name="roleKey"
                                  defaultValue={roleKey ?? "viewer"}
                                  className="rounded-lg border border-edge-strong bg-surface-primary px-2 py-1 text-xs text-content-primary"
                                >
                                  {invitableRoles.map((r) => (
                                    <option key={r} value={r}>
                                      {t.roles[r]}
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
                            {u.status === "ACTIVE" && canDeactivate ? (
                              <form action={deactivateUserAction}>
                                <input type="hidden" name="id" value={u.id} />
                                <button
                                  type="submit"
                                  className="rounded-pill border border-edge-subtle px-2.5 py-1 text-xs font-medium text-state-danger hover:border-edge-strong"
                                >
                                  {t.users.deactivate}
                                </button>
                              </form>
                            ) : null}
                            {u.status === "DEACTIVATED" && canReactivate ? (
                              <form action={reactivateUserAction}>
                                <input type="hidden" name="id" value={u.id} />
                                <button
                                  type="submit"
                                  className="rounded-pill border border-edge-subtle px-2.5 py-1 text-xs font-medium text-content-secondary hover:text-content-primary"
                                >
                                  {t.users.reactivate}
                                </button>
                              </form>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-xs text-content-muted">—</span>
                        )}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}
