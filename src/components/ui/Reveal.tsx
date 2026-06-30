import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Universal (no client JS) scroll-reveal marker. Renders the element hidden via
 * the `.reveal` CSS and tags it with `data-reveal`; a single <RevealController>
 * client component reveals all such elements on scroll. This keeps per-element
 * hydration cost at zero (one shared observer instead of one per card).
 */
export function Reveal({
  as,
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "div";
  return (
    <Tag
      data-reveal
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
