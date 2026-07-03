"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track } from "@/lib/analytics/analytics";

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

/**
 * Anchor that fires an analytics event on click, then behaves like a normal
 * link. Lets server components (Hero, CTA) attach tracking without turning the
 * whole tree into a client component. Metadata only — NEVER pass PII.
 */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  children,
  ...rest
}: {
  event: string;
  eventProps?: AnalyticsProps;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        track(event, eventProps);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
