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
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-2 w-2 rounded-pill bg-accent shadow-glow" aria-hidden="true" />
          <span className="text-2xs font-semibold uppercase tracking-wider text-content-muted">MenQ</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tightest text-content-primary">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("premium-card rounded-card border border-edge-subtle bg-page p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="premium-card rounded-card border border-edge-subtle bg-brand-soft p-5 shadow-sm">
      <div className="text-sm text-content-muted">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold text-content-primary">{value}</div>
      {hint ? <div className="mt-2 text-xs text-content-muted">{hint}</div> : null}
    </div>
  );
}

const STATUS_TONES: Record<string, string> = {
  NEW: "border border-edge-strong bg-accent-soft text-content-primary",
  CONTACTED: "border border-edge-subtle bg-surface-secondary text-content-secondary",
  QUALIFIED: "border border-edge-strong bg-accent-soft text-content-primary",
  PROPOSAL_SENT: "border border-edge-subtle bg-surface-secondary text-content-secondary",
  WON: "border border-edge-strong bg-accent-soft text-content-primary",
  LOST: "border border-edge-subtle bg-surface-secondary text-content-muted",
  REJECTED: "border border-edge-subtle bg-surface-secondary text-content-muted",
  SPAM: "border border-edge-subtle bg-surface-secondary text-content-muted",
  DUPLICATE: "border border-edge-subtle bg-surface-secondary text-content-muted",
  ARCHIVED: "border border-edge-subtle bg-surface-secondary text-content-muted",
};

export function StatusPill({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-pill px-2.5 py-0.5 text-xs font-semibold",
        STATUS_TONES[status] ?? "border border-edge-subtle bg-surface-secondary text-content-secondary",
      )}
    >
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <div className="premium-panel rounded-card border-dashed p-10 text-center text-content-muted">{message}</div>;
}
