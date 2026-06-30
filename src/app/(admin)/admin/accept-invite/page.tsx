import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { AuthShell, AuthError } from "@/components/admin/AuthShell";
import { AcceptInviteForm } from "@/components/admin/authForms";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const t = await getAdminDict();

  return (
    <AuthShell
      title={t.invite.title}
      subtitle={t.invite.subtitle}
      footer={
        <Link href="/admin/login" className="hover:text-content-primary">
          {t.invite.back}
        </Link>
      }
    >
      {token ? (
        <AcceptInviteForm
          token={token}
          nameLabel={t.invite.name}
          createPassword={t.invite.createPassword}
          hint={t.invite.hint}
          create={t.invite.create}
          creating={t.invite.creating}
        />
      ) : (
        <AuthError>{t.invite.missing}</AuthError>
      )}
    </AuthShell>
  );
}
