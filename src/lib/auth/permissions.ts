/**
 * RBAC source of truth. Roles are presets; permissions decide actions.
 * Mirrors docs/buildpack/PERMISSION_SYSTEM.md (MVP domains).
 */

export const ROLE_KEYS = [
  "super_admin",
  "admin",
  "editor",
  "moderator",
  "sales_lead_manager",
  "viewer",
] as const;

export type RoleKey = (typeof ROLE_KEYS)[number];

/**
 * Roles a non-super-admin (Admin) may assign via invite / role-change.
 * Admins must NOT be able to mint peer admins or super admins, nor act on
 * other admin accounts — only Super Admin manages the admin tier.
 */
export const ADMIN_ASSIGNABLE_ROLES = [
  "editor",
  "moderator",
  "sales_lead_manager",
  "viewer",
] as const;

export const ROLE_META: Record<RoleKey, { name: string; description: string }> = {
  super_admin: { name: "Super Admin", description: "Full system access" },
  admin: { name: "Admin", description: "Operational admin" },
  editor: { name: "Editor / Content Manager", description: "Creates draft content" },
  moderator: { name: "Moderator / Approver", description: "Reviews and approves content" },
  sales_lead_manager: { name: "Sales / Lead Manager", description: "Manages leads and bookings" },
  viewer: { name: "Viewer / Analyst", description: "Read-only access" },
};

/** Full permission catalog (MVP domains). */
export const ALL_PERMISSIONS: string[] = [
  // users
  "users.view", "users.create", "users.edit", "users.deactivate", "users.reactivate",
  "users.manage_limited", "users.manage_all",
  // roles & permissions
  "roles.view", "roles.manage", "permissions.view", "permissions.manage",
  // content
  "content.view", "content.create", "content.edit", "content.edit_assigned",
  "content.submit_review", "content.review", "content.approve", "content.reject",
  "content.publish", "content.archive", "content.restore", "content.delete_soft",
  // services
  "services.view", "services.create", "services.edit", "services.submit_review",
  "services.approve", "services.publish", "services.archive", "services.restore",
  // industries
  "industries.view", "industries.create", "industries.edit", "industries.submit_review",
  "industries.approve", "industries.publish", "industries.archive", "industries.restore",
  // media
  "media.view", "media.upload", "media.edit", "media.archive", "media.restore",
  "media.delete_soft",
  // leads
  "leads.view", "leads.view_all", "leads.view_summary", "leads.create_manual",
  "leads.update", "leads.update_status", "leads.assign", "leads.add_note",
  "leads.export", "leads.archive", "leads.restore", "leads.delete_soft",
  // bookings
  "bookings.view", "bookings.view_all", "bookings.update", "bookings.update_status",
  "bookings.assign", "bookings.add_note", "bookings.archive", "bookings.restore",
  // analytics & reports
  "analytics.view", "analytics.view_leads", "analytics.view_content",
  "analytics.view_traffic", "analytics.view_conversion", "reports.view", "reports.export",
  // settings
  "settings.view", "settings.manage_basic", "settings.manage_global",
  "settings.manage_seo", "settings.manage_security",
  // integrations
  "integrations.view", "integrations.manage", "integrations.manage_secrets",
  "integrations.test_connection",
  // security & audit
  "security.view", "security.manage", "security.manage_sessions", "security.manage_api_keys",
  "audit.view_limited", "audit.view_all", "audit.export",
];

/** Per-role permission assignment. "*" = all (super admin). */
export const ROLE_PERMISSIONS: Record<RoleKey, string[]> = {
  super_admin: ["*"],
  admin: [
    "users.view", "users.create", "users.edit", "users.deactivate", "users.reactivate",
    "users.manage_limited",
    "content.view", "content.create", "content.edit", "content.review", "content.approve",
    "content.reject", "content.publish", "content.archive", "content.restore", "content.delete_soft",
    "services.view", "services.create", "services.edit", "services.approve", "services.publish",
    "services.archive", "services.restore",
    "industries.view", "industries.create", "industries.edit", "industries.approve",
    "industries.publish", "industries.archive", "industries.restore",
    "media.view", "media.upload", "media.edit", "media.archive", "media.restore", "media.delete_soft",
    "leads.view", "leads.view_all", "leads.update", "leads.update_status", "leads.assign",
    "leads.add_note", "leads.export", "leads.archive", "leads.restore", "leads.delete_soft",
    "bookings.view", "bookings.view_all", "bookings.update", "bookings.update_status",
    "bookings.assign", "bookings.add_note", "bookings.archive", "bookings.restore",
    "analytics.view", "analytics.view_leads", "analytics.view_content", "analytics.view_traffic",
    "analytics.view_conversion", "reports.view", "reports.export",
    "settings.view", "settings.manage_basic", "settings.manage_seo",
    "audit.view_limited",
  ],
  editor: [
    "content.view", "content.create", "content.edit_assigned", "content.submit_review",
    "services.view", "services.edit", "services.submit_review",
    "industries.view", "industries.edit", "industries.submit_review",
    "media.view", "media.upload", "media.edit",
  ],
  moderator: [
    "content.view", "content.review", "content.approve", "content.reject", "content.publish",
    "services.view", "services.approve", "services.publish",
    "industries.view", "industries.approve", "industries.publish",
    "media.view",
  ],
  sales_lead_manager: [
    "leads.view", "leads.view_all", "leads.update", "leads.update_status", "leads.assign",
    "leads.add_note", "leads.archive",
    "bookings.view", "bookings.view_all", "bookings.update", "bookings.update_status",
    "bookings.assign", "bookings.add_note", "bookings.archive",
    "analytics.view", "analytics.view_leads", "reports.view",
  ],
  viewer: [
    "analytics.view", "analytics.view_leads", "analytics.view_content", "analytics.view_traffic",
    "analytics.view_conversion", "reports.view",
    "content.view", "services.view", "industries.view", "leads.view_summary",
  ],
};

export function permissionParts(key: string): { domain: string; action: string } {
  const [domain, action] = key.split(".");
  return { domain: domain ?? "", action: action ?? "" };
}
