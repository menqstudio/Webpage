import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "soft" | "accent" | "glass";

const variantMap: Record<Variant, string> = {
  soft: "bg-surface-secondary text-content-primary border border-edge-subtle",
  accent: "bg-accent-soft text-accent border border-edge-strong",
  glass: "glass text-accent",
};

export function IconWrap({
  icon: Icon,
  variant = "soft",
  className,
}: {
  icon: LucideIcon;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
        variantMap[variant],
        className,
      )}
    >
      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
