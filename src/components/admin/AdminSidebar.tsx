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
  /** href → localized label */
  labels: Record<string, string>;
}) {
  const pathname = usePathname();
  const items = adminNav.filter((i) => visibleHrefs.includes(i.href));

  return (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-base ease-standard",
              active
                ? "bg-action-primary text-content-inverse"
                : "text-content-secondary hover:bg-surface-secondary hover:text-content-primary",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {labels[item.href] ?? item.href}
          </Link>
        );
      })}
    </nav>
  );
}
