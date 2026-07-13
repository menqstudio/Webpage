import { Power } from "lucide-react";
import { cn } from "@/lib/cn";

export function BrandMark({
  compact = false,
  admin = false,
  className,
}: {
  compact?: boolean;
  admin?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-label={admin ? "MenQ Admin" : "MenQ"}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span aria-hidden="true" className="inline-flex items-center font-display font-bold tracking-tightest">
        <span className={cn(compact ? "text-lg" : "text-xl")}>Men</span>
        <span className="ml-0.5 inline-flex items-center justify-center rounded-pill bg-action-primary text-content-inverse shadow-glow">
          <Power className={cn(compact ? "h-7 w-7 p-1.5" : "h-8 w-8 p-1.5")} strokeWidth={2.2} />
        </span>
      </span>
      {admin ? (
        <span className="rounded-pill border border-edge-subtle bg-surface-secondary px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-content-secondary">
          Admin
        </span>
      ) : null}
    </span>
  );
}
