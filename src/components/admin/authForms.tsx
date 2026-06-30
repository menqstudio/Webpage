"use client";

import { useActionState } from "react";
import {
  loginAction,
  requestResetAction,
  resetPasswordAction,
  acceptInviteAction,
} from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { AuthError, AuthNotice } from "./AuthFeedback";

export function LoginForm({
  emailLabel,
  passwordLabel,
  signIn,
  signingIn,
}: {
  emailLabel: string;
  passwordLabel: string;
  signIn: string;
  signingIn: string;
}) {
  const [state, action, pending] = useActionState(loginAction, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <AuthError>{state.error}</AuthError>
      <FormField id="email" name="email" type="email" label={emailLabel} autoComplete="email" required />
      <FormField
        id="password"
        name="password"
        type="password"
        label={passwordLabel}
        autoComplete="current-password"
        required
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? signingIn : signIn}
      </Button>
    </form>
  );
}

export function ForgotForm({
  emailLabel,
  send,
  sending,
  sent,
}: {
  emailLabel: string;
  send: string;
  sending: string;
  sent: string;
}) {
  const [state, action, pending] = useActionState(requestResetAction, {});
  if (state.ok) return <AuthNotice>{sent}</AuthNotice>;
  return (
    <form action={action} className="flex flex-col gap-4">
      <AuthError>{state.error}</AuthError>
      <FormField id="email" name="email" type="email" label={emailLabel} autoComplete="email" required />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? sending : send}
      </Button>
    </form>
  );
}

export function ResetForm({
  token,
  newPassword,
  hint,
  save,
  saving,
}: {
  token: string;
  newPassword: string;
  hint: string;
  save: string;
  saving: string;
}) {
  const [state, action, pending] = useActionState(resetPasswordAction, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <AuthError>{state.error}</AuthError>
      <input type="hidden" name="token" value={token} />
      <FormField
        id="password"
        name="password"
        type="password"
        label={newPassword}
        hint={hint}
        autoComplete="new-password"
        required
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? saving : save}
      </Button>
    </form>
  );
}

export function AcceptInviteForm({
  token,
  nameLabel,
  createPassword,
  hint,
  create,
  creating,
}: {
  token: string;
  nameLabel: string;
  createPassword: string;
  hint: string;
  create: string;
  creating: string;
}) {
  const [state, action, pending] = useActionState(acceptInviteAction, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <AuthError>{state.error}</AuthError>
      <input type="hidden" name="token" value={token} />
      <FormField id="name" name="name" label={nameLabel} autoComplete="name" />
      <FormField
        id="password"
        name="password"
        type="password"
        label={createPassword}
        hint={hint}
        autoComplete="new-password"
        required
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? creating : create}
      </Button>
    </form>
  );
}
