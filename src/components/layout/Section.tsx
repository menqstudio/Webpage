import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionVariant = "base" | "muted" | "contrast" | "spotlight";
type SectionSpacing = "sm" | "md" | "lg" | "xl";

const variantMap: Record<SectionVariant, string> = {
  base: "bg-page text-content-primary",
  muted: "bg-surface-secondary text-content-primary",
  contrast: "section-contrast",
  spotlight: "section-contrast section-spotlight",
};

const spacingMap: Record<SectionSpacing, string> = {
  sm: "py-section-sm",
  md: "py-section-sm md:py-section-md",
  lg: "py-section-sm md:py-section-md lg:py-section-lg",
  xl: "py-section-md md:py-section-lg lg:py-section-xl",
};

export function Section({
  as,
  id,
  variant = "base",
  spacing = "lg",
  className,
  children,
}: {
  as?: ElementType;
  id?: string;
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "section";
  return (
    <Tag
      id={id}
      className={cn(
        "relative scroll-mt-header",
        variantMap[variant],
        spacingMap[spacing],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
