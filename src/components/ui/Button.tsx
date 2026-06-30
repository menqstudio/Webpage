import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold whitespace-nowrap transition-colors duration-base ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-action-primary text-content-inverse hover:bg-action-hover shadow-card",
  secondary:
    "bg-surface-secondary text-content-primary border border-edge-subtle hover:border-edge-strong",
  outline:
    "border border-edge-strong text-content-primary hover:bg-surface-secondary",
  ghost: "text-content-primary hover:bg-surface-secondary",
};

// Heights/paddings map 1:1 onto the spacing scale (= the button tokens):
// h-10/12/14 = 2.5/3/3.5rem, px-4/5/6 = space-4/5/6.
const sizeMap: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(base, variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
