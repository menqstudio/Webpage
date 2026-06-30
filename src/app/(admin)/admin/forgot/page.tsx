import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { AuthShell } from "@/components/admin/AuthShell";
import { ForgotForm } from "@/components/admin/authForms";

export default async function ForgotPage() {
  const t = await getAdminDict();
  return (
    <AuthShell
      title={t.forgot.title}
      subtitle={t.forgot.subtitle}
      footer={
        <Link href="/admin/login" className="hover:text-content-primary">
          {t.forgot.back}
        </Link>
      }
    >
      <ForgotForm
        emailLabel={t.forgot.email}
        send={t.forgot.send}
        sending={t.forgot.sending}
        sent={t.forgot.sent}
      />
    </AuthShell>
  );
}
