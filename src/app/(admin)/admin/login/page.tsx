import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { AuthShell, AuthNotice } from "@/components/admin/AuthShell";
import { LoginForm } from "@/components/admin/authForms";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ invited?: string; reset?: string }>;
}) {
  const sp = await searchParams;
  const t = await getAdminDict();
  const notice = sp.invited
    ? t.login.noticeInvited
    : sp.reset
      ? t.login.noticeReset
      : undefined;

  return (
    <AuthShell
      title="MenQ Admin"
      subtitle={t.login.subtitle}
      footer={
        <Link href="/admin/forgot" className="hover:text-content-primary">
          {t.login.forgot}
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        {notice ? <AuthNotice>{notice}</AuthNotice> : null}
        <LoginForm
          emailLabel={t.login.email}
          passwordLabel={t.login.password}
          signIn={t.login.signIn}
          signingIn={t.login.signingIn}
        />
      </div>
    </AuthShell>
  );
}
