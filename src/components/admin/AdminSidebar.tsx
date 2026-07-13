"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/config/adminNav";
import { cn } from "@/lib/cn";

export function AdminSidebar({
  visibleHrefs,
  labels,
}: {
  visibleHrefs: string[];
  labels: Record<string, string>;
}) {
  const pathname = usePathname();
  const items = adminNav.filter((item) => visibleHrefs.includes(item.href));

  return (
    <nav className="flex flex-col gap-1.5" aria-label="Admin">
      {items.map((item, index) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition duration-base ease-standard",
              active
                ? "border-edge-strong bg-accent-soft text-content-primary shadow-sm"
                : "border-transparent text-content-secondary hover:border-edge-subtle hover:bg-surface-secondary hover:text-content-primary",
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-xl",
                  active ? "brand-orb text-content-inverse" : "bg-surface-secondary text-content-muted",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {labels[item.href] ?? item.href}
            </span>
            <span className="text-2xs text-content-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
