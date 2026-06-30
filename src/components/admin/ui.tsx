import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tightest text-content-primary">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-content-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-edge-subtle bg-page p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <Panel>
      <div className="text-sm text-content-muted">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-content-primary">
        {value}
      </div>
      {hint ? <div className="mt-1 text-xs text-content-muted">{hint}</div> : null}
    </Panel>
  );
}

const STATUS_TONES: Record<string, string> = {
  NEW: "bg-accent-soft text-content-primary",
  CONTACTED: "bg-surface-secondary text-content-secondary",
  QUALIFIED: "bg-accent-soft text-content-primary",
  PROPOSAL_SENT: "bg-surface-secondary text-content-secondary",
  WON: "bg-accent-soft text-content-primary",
  LOST: "bg-surface-secondary text-content-muted",
  REJECTED: "bg-surface-secondary text-content-muted",
  SPAM: "bg-surface-secondary text-content-muted",
  DUPLICATE: "bg-surface-secondary text-content-muted",
  ARCHIVED: "bg-surface-secondary text-content-muted",
};

export function StatusPill({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-pill px-2.5 py-0.5 text-xs font-semibold",
        STATUS_TONES[status] ?? "bg-surface-secondary text-content-secondary",
      )}
    >
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-card border border-dashed border-edge-strong bg-page p-10 text-center text-content-muted">
      {message}
    </div>
  );
}
