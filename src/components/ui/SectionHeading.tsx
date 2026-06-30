import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  const Title = as;
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-pill border border-edge-subtle bg-surface-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-content-secondary">
          {eyebrow}
        </span>
      ) : null}
      <Title
        className={cn(
          "text-balance font-display font-bold leading-tight tracking-tightest",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Title>
      {description ? (
        <p
          className={cn(
            "max-w-narrow text-lg leading-relaxed text-content-secondary",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
