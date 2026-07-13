import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "elevated" | "outline" | "glass" | "brand";

const variantMap: Record<Variant, string> = {
  solid: "bg-surface-primary border border-edge-subtle",
  elevated: "bg-surface-primary border border-edge-subtle shadow-card",
  outline: "border border-edge-subtle bg-transparent",
  glass: "glass",
  brand: "border border-edge-strong bg-brand-soft shadow-card",
};

export function Card({
  variant = "solid",
  interactive = false,
  className,
  children,
}: {
  variant?: Variant;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-interactive={interactive ? "true" : undefined}
      className={cn("premium-card rounded-card p-6", variantMap[variant], className)}
    >
      {children}
    </div>
  );
}
