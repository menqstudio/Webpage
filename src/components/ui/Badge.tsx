import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "neutral" | "accent" | "glass";

const variantMap: Record<Variant, string> = {
  neutral:
    "border border-edge-subtle bg-surface-secondary text-content-secondary",
  accent: "border border-edge-strong bg-accent-soft text-content-primary",
  glass: "glass text-content-primary",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wide",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
