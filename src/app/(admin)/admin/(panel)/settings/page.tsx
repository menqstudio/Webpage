import { requirePermission, getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { isDbConfigured } from "@/lib/db/prisma";
import { isEmailConfigured } from "@/lib/integrations/email";
import { isTelegramConfigured } from "@/lib/integrations/telegram";
import { getAdminDict } from "@/lib/adminI18n";
import { PageTitle, Panel } from "@/components/admin/ui";
import { TestNotifyButton } from "@/components/admin/TestNotifyButton";
import { contact } from "@/config/contact";
import { cn } from "@/lib/cn";

function StatusRow({
  label,
  ok,
  configured,
  notConfigured,
}: {
  label: string;
  ok: boolean;
  configured: string;
  notConfigured: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-content-secondary">{label}</span>
      <span
        className={cn(
          "rounded-pill px-2.5 py-0.5 text-xs font-semibold",
          ok ? "bg-accent-soft text-content-primary" : "bg-surface-secondary text-content-muted",
        )}
      >
        {ok ? configured : notConfigured}
      </span>
    </div>
  );
}

export default async function SettingsPage() {
  await requirePermission("settings.view");
  const me = await getCurrentUser();
  const t = await getAdminDict();
  const canTest = userHasPermission(me, "integrations.test_connection");

  const integrations = [
    { label: t.settings.database, ok: isDbConfigured() },
    { label: t.settings.emailSmtp, ok: isEmailConfigured() },
    { label: t.settings.telegram, ok: isTelegramConfigured() },
    { label: t.settings.analytics, ok: Boolean(process.env.NEXT_PUBLIC_GA4_ID) },
    { label: t.settings.booking, ok: Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL) },
  ];

  return (
    <div>
      <PageTitle title={t.settings.title} description={t.settings.description} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-content-muted">
            {t.settings.integrationStatus}
          </h2>
          <div className="divide-y divide-edge-subtle">
            {integrations.map((i) => (
              <StatusRow
                key={i.label}
                label={i.label}
                ok={i.ok}
                configured={t.settings.configured}
                notConfigured={t.settings.notConfigured}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-content-muted">{t.settings.secretsNote}</p>
        </Panel>

        <Panel>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-content-muted">
            {t.settings.contactTitle}
          </h2>
          <div className="flex flex-col gap-2 text-sm text-content-secondary">
            <div>{t.leadDetail.phone}: {contact.phone.label}</div>
            <div>{t.leadDetail.email}: {contact.email.label}</div>
            <div>Telegram: {contact.telegram.href}</div>
            <div>WhatsApp: {contact.whatsapp.href}</div>
          </div>
          <p className="mt-3 text-xs text-content-muted">{t.settings.contactNote}</p>
        </Panel>
      </div>

      {canTest ? (
        <div className="mt-6">
          <Panel>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-content-muted">
              {t.settings.testTitle}
            </h2>
            <TestNotifyButton
              button={t.settings.testButton}
              running={t.settings.testRunning}
              labels={{
                sent: t.settings.resultSent,
                failed: t.settings.resultFailed,
                skipped: t.settings.resultSkipped,
              }}
            />
          </Panel>
        </div>
      ) : null}
    </div>
  );
}
