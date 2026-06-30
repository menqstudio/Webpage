import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Inbox,
  CalendarClock,
  FileText,
  Boxes,
  Building2,
  Users,
  ScrollText,
  Settings,
} from "lucide-react";

import type { AdminDictionary } from "@/content/admin";

export type AdminNavItem = {
  /** Key into the admin dictionary `nav` group for the localized label. */
  key: keyof AdminDictionary["nav"];
  href: string;
  icon: LucideIcon;
  /** Any of these permissions grants visibility; empty = any signed-in user. */
  perms: string[];
};

export const adminNav: AdminNavItem[] = [
  { key: "dashboard", href: "/admin/dashboard", icon: LayoutDashboard, perms: [] },
  {
    key: "leads",
    href: "/admin/leads",
    icon: Inbox,
    perms: ["leads.view", "leads.view_all", "leads.view_summary"],
  },
  {
    key: "bookings",
    href: "/admin/bookings",
    icon: CalendarClock,
    perms: ["bookings.view", "bookings.view_all"],
  },
  { key: "content", href: "/admin/content", icon: FileText, perms: ["content.view"] },
  { key: "services", href: "/admin/services", icon: Boxes, perms: ["services.view"] },
  {
    key: "industries",
    href: "/admin/industries",
    icon: Building2,
    perms: ["industries.view"],
  },
  { key: "users", href: "/admin/users", icon: Users, perms: ["users.view"] },
  {
    key: "auditLogs",
    href: "/admin/audit-logs",
    icon: ScrollText,
    perms: ["audit.view_limited", "audit.view_all"],
  },
  { key: "settings", href: "/admin/settings", icon: Settings, perms: ["settings.view"] },
];
