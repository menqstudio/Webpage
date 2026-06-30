import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { AuthShell, AuthError } from "@/components/admin/AuthShell";
import { ResetForm } from "@/components/admin/authForms";

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const t = await getAdminDict();

  return (
    <AuthShell
      title={t.reset.title}
      footer={
        <Link href="/admin/login" className="hover:text-content-primary">
          {t.reset.back}
        </Link>
      }
    >
      {token ? (
        <ResetForm
          token={token}
          newPassword={t.reset.newPassword}
          hint={t.reset.hint}
          save={t.reset.save}
          saving={t.reset.saving}
        />
      ) : (
        <AuthError>{t.reset.missing}</AuthError>
      )}
    </AuthShell>
  );
}
