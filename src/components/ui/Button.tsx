import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold whitespace-nowrap transition duration-base ease-standard hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variantMap: Record<Variant, string> = {
  primary: "brand-orb text-content-inverse hover:shadow-glow",
  secondary:
    "border border-edge-subtle bg-surface-secondary text-content-primary shadow-sm hover:border-edge-strong",
  outline:
    "border border-edge-strong bg-transparent text-content-primary hover:bg-surface-secondary",
  ghost: "text-content-primary hover:bg-surface-secondary",
};

const sizeMap: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-base",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(base, variantMap[variant], sizeMap[size], className);
}

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
    <button className={buttonClasses(variant, size, className)} {...rest}>
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
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
