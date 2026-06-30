"use client";

import { useState, type FormEvent } from "react";
import { createInviteAction } from "@/lib/auth/actions";

export function InviteForm({
  roleOptions,
  emailPlaceholder,
  submit,
  submitting,
  created,
}: {
  roleOptions: { value: string; label: string }[];
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  created: string;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(roleOptions[roleOptions.length - 1]?.value ?? "viewer");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ error?: string; ok?: boolean; link?: string }>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(undefined);
    const r = await createInviteAction({ email, roleKey: role });
    setResult(r);
    setPending(false);
    if (r.ok) setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          className="rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-muted"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary"
        >
          {roleOptions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse disabled:opacity-60"
        >
          {pending ? submitting : submit}
        </button>
      </div>

      {result?.error ? (
        <p className="text-sm text-state-danger">{result.error}</p>
      ) : null}
      {result?.ok && result.link ? (
        <div className="rounded-lg border border-edge-strong bg-accent-soft px-3 py-2 text-sm">
          <p className="font-medium text-content-primary">{created}</p>
          <p className="mt-1 break-all text-content-secondary">{result.link}</p>
        </div>
      ) : null}
    </form>
  );
}
