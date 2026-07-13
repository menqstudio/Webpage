import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  className,
  children,
}: {
  index?: string;
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
      {index || eyebrow ? (
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-content-muted">
          {index ? (
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-pill border border-edge-strong bg-accent-soft px-2 text-content-primary">
              {index}
            </span>
          ) : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
          <span className="section-rule w-10" aria-hidden="true" />
        </div>
      ) : null}
      <Title
        className={cn(
          "max-w-4xl text-balance font-display font-bold leading-tight tracking-tightest text-content-primary",
          as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl",
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
