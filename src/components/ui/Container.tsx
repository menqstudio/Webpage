import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "default" | "narrow" | "wide" | "full";

const sizeMap: Record<ContainerSize, string> = {
  default: "max-w-default",
  narrow: "max-w-narrow",
  wide: "max-w-wide",
  full: "max-w-none",
};

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-page-x", sizeMap[size], className)}>
      {children}
    </div>
  );
}
