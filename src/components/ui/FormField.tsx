import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-lg border bg-surface-primary px-4 py-3 text-base text-content-primary placeholder:text-content-muted transition-colors duration-base ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium text-content-primary"
    >
      <span>{children}</span>
      {hint ? (
        <span className="text-xs font-normal text-content-muted">{hint}</span>
      ) : null}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-state-danger" role="alert">
      {children}
    </p>
  );
}

export function FormField({
  id,
  label,
  hint,
  error,
  className,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error ? "border-state-danger" : "border-edge-strong")}
        {...rest}
      />
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  className,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldBase,
          "resize-y",
          error ? "border-state-danger" : "border-edge-strong",
        )}
        {...rest}
      />
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  placeholder,
  options,
  className,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error ? "border-state-danger" : "border-edge-strong")}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}
