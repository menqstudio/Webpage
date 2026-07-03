"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormField, SelectField, TextAreaField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { validateLead, type FieldErrors, type LeadInput } from "@/lib/forms/lead";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  interestedSolution: "",
  message: "",
  consent: false,
  website: "",
};

export function LeadForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const f = dict.cta.form;
  const [values, setValues] = useState<typeof emptyValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);

  // Fire once, when the visitor first engages with the form.
  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track(AnalyticsEvent.leadFormStart, { language: locale });
  }

  function update<K extends keyof typeof emptyValues>(
    key: K,
    value: (typeof emptyValues)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function collectUtm(): Record<string, string> {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ["source", "medium", "campaign", "term", "content"]) {
      const value = params.get(`utm_${key}`);
      if (value) utm[key] = value;
    }
    return utm;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validateLead(values, f.validation);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Metadata only — never PII.
    track(AnalyticsEvent.leadFormSubmit, {
      interested_solution: values.interestedSolution,
      language: locale,
    });
    setStatus("submitting");
    try {
      const payload: LeadInput = {
        name: values.name,
        company: values.company || undefined,
        phone: values.phone || undefined,
        email: values.email || undefined,
        interestedSolution: values.interestedSolution,
        message: values.message,
        consent: true, // submitting the form is the consent (see the note below it)
        website: values.website,
        locale,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        utm: collectUtm(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      track(AnalyticsEvent.leadFormSuccess, {
        interested_solution: payload.interestedSolution,
        language: locale,
      });
      setStatus("success");
      setValues(emptyValues);
    } catch {
      track(AnalyticsEvent.leadFormError, { language: locale });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-card p-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-accent-soft text-accent">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-content-primary">
          {f.successTitle}
        </h3>
        <p className="leading-relaxed text-content-secondary">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      noValidate
      className="glass flex flex-col gap-4 rounded-card p-6 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="lead-name"
          name="name"
          label={f.nameLabel}
          hint={f.required}
          placeholder={f.namePlaceholder}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          id="lead-company"
          name="company"
          label={f.companyLabel}
          hint={f.optional}
          placeholder={f.companyPlaceholder}
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          autoComplete="organization"
        />
        <FormField
          id="lead-phone"
          name="phone"
          type="tel"
          label={f.phoneLabel}
          placeholder={f.phonePlaceholder}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
        <FormField
          id="lead-email"
          name="email"
          type="email"
          label={f.emailLabel}
          placeholder={f.emailPlaceholder}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <SelectField
        id="lead-solution"
        name="interestedSolution"
        label={f.solutionLabel}
        placeholder={f.solutionPlaceholder}
        options={f.options}
        value={values.interestedSolution}
        onChange={(e) => update("interestedSolution", e.target.value)}
        error={errors.interestedSolution}
      />

      <TextAreaField
        id="lead-message"
        name="message"
        label={f.messageLabel}
        placeholder={f.messagePlaceholder}
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
        rows={4}
      />

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-state-danger bg-surface-secondary px-4 py-3 text-sm text-content-primary"
        >
          <strong className="font-semibold">{f.errorTitle}. </strong>
          {f.errorBody}
        </div>
      ) : null}

      {/* Consent statement the user actually sees — matches the stored consent. */}
      <p className="text-xs leading-relaxed text-content-secondary">{f.consentLabel}</p>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? f.submitting : f.submit}
      </Button>

      <p className="text-xs leading-relaxed text-content-muted">{f.privacyNote}</p>
    </form>
  );
}
