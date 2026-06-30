import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "elevated" | "outline" | "glass";

const variantMap: Record<Variant, string> = {
  solid: "bg-surface-primary border border-edge-subtle",
  elevated: "bg-surface-primary border border-edge-subtle shadow-card",
  outline: "border border-edge-subtle",
  glass: "glass",
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
      className={cn(
        "rounded-card p-6",
        variantMap[variant],
        interactive &&
          "transition duration-base ease-standard hover:-translate-y-1 hover:border-edge-strong hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
