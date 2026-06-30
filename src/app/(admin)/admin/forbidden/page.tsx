import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { getAdminDict } from "@/lib/adminI18n";

export default async function ForbiddenPage() {
  const t = await getAdminDict();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-surface-secondary px-4 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-accent-soft text-state-danger">
        <ShieldAlert className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="font-display text-2xl font-bold text-content-primary">
        {t.forbidden.title}
      </h1>
      <p className="max-w-sm text-content-secondary">{t.forbidden.body}</p>
      <Link
        href="/admin/dashboard"
        className="rounded-pill bg-action-primary px-5 py-2.5 text-sm font-semibold text-content-inverse"
      >
        {t.forbidden.back}
      </Link>
    </div>
  );
}
