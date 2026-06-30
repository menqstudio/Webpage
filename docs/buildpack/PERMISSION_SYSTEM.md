# PERMISSION_SYSTEM.md

# Permission System — AI Business Landing Page

## 1. Purpose

This document defines the build-ready permission system for the AI Business Landing Page project.

The project is a public business landing page with an internal admin panel. The system may include:

- Public pages
- Services content
- Industries content
- Blog / news / announcements
- Contact requests
- Consultation requests
- Booking requests
- Lead management
- Analytics dashboards
- Integrations
- Admin settings
- Future user registration or client portal

The permission system must be professional, scalable, and not overcomplicated.

## 2. Core Principle

The project uses a role-based access control model with explicit permissions.

Roles are presets. Permissions are the actual source of access control.

```text
User -> Role -> Permissions -> Allowed Actions
```

This means roles can be changed or expanded later without rewriting the whole system.

## 3. Final MVP Roles

The MVP must include 6 core roles:

```text
Super Admin
Admin
Editor / Content Manager
Moderator / Approver
Sales / Lead Manager
Viewer / Analyst
```

## 4. Global Permission Rules

These rules are mandatory.

```text
1. Super Admin has full access.
2. Super Admin role cannot be deleted.
3. Super Admin permissions cannot be edited by Admin.
4. Admin has operational access, but not system-level dangerous access.
5. Editor can create and edit draft content, but cannot publish.
6. Moderator can approve or reject content.
7. Sales / Lead Manager can manage leads and requests, but cannot edit public content.
8. Viewer / Analyst can only view allowed dashboards, reports, and summaries.
9. All destructive actions must be soft-delete by default.
10. All important actions must be written to audit log.
11. Permissions must be enforced server-side.
12. Hidden UI buttons are not security.
13. API routes must validate permission before executing any protected action.
14. Integration secrets are manageable only by Super Admin.
15. Critical system settings are manageable only by Super Admin.
```

## 5. Role Definitions

---

## 5.1 Super Admin

The highest-level system owner.

### Typical user

Owner, founder, main technical admin.

### Can

- Do everything
- Manage users
- Manage roles
- Manage permissions
- Manage global settings
- Manage integrations
- Manage integration secrets
- View all leads
- Manage all leads
- Manage all content
- Publish content
- Archive and restore data
- View all analytics
- View all audit logs
- Manage security settings
- Manage system configuration
- Manage admin panel access

### Cannot

No restrictions inside the application.

### Notes

Super Admin must be protected from deletion and privilege downgrade.

---

## 5.2 Admin

Operational admin role.

### Typical user

Operations manager, website manager, senior internal team member.

### Can

- Manage public page content
- Manage services
- Manage industries
- Manage blog / news / announcements
- Publish content
- Approve content
- Reject content
- Manage leads
- View all leads
- Update lead statuses
- View analytics
- Manage basic team member data
- Create limited users
- Deactivate limited users
- Assign allowed roles:
  - Editor / Content Manager
  - Moderator / Approver
  - Sales / Lead Manager
  - Viewer / Analyst
- View limited audit logs
- Manage non-sensitive settings

### Cannot

- Manage roles and permission definitions
- Create Super Admin
- Edit Super Admin
- Deactivate Super Admin
- Promote self to Super Admin
- Manage integration secrets
- Change critical security settings
- Hard-delete critical data
- Delete system-level records permanently

### Notes

Admin is powerful, but not system-owner level.

---

## 5.3 Editor / Content Manager

Content creation role.

### Typical user

Copywriter, content manager, marketer, page content editor.

### Can

- Create draft content
- Edit own drafts
- Edit assigned content
- Edit service descriptions as draft
- Edit industry descriptions as draft
- Create blog posts as draft
- Create news as draft
- Create announcements as draft
- Upload images and icons
- Submit content for review
- View content status
- View rejection comments
- Update rejected content and resubmit

### Cannot

- Publish content
- Approve content
- Reject content
- Delete important public pages
- Manage users
- Manage roles
- Manage settings
- Manage integrations
- View sensitive client data
- View full lead details
- Export leads
- Delete media permanently

### Mandatory rule

```text
Editor creates. Editor does not publish.
```

---

## 5.4 Moderator / Approver

Review and approval role.

### Typical user

Quality reviewer, approval manager, content approver.

### Can

- View pending content
- Review content submitted by Editor
- Approve content
- Reject content with comment
- Request changes
- Hide inappropriate content
- Approve future testimonials
- Approve future case studies
- Approve future client logos
- Approve user registrations if user registration is enabled later
- Suspend inappropriate user-generated content if such content exists later

### Cannot

- Change system settings
- Manage roles
- Manage permissions
- Manage integrations
- Manage integration secrets
- Hard-delete database data
- Edit lead statuses unless separately granted
- Export leads unless separately granted

### Mandatory rule

```text
Moderator approves. Moderator does not control the system.
```

---

## 5.5 Sales / Lead Manager

Lead and contact request management role.

### Typical user

Sales person, business development manager, consultation request handler.

### Can

- View contact form submissions
- View consultation requests
- View booking requests
- View lead details
- Update lead status
- Assign leads
- Add internal lead notes
- Add follow-up notes
- Mark lead as contacted
- Mark lead as qualified
- Mark lead as proposal sent
- Mark lead as won
- Mark lead as lost
- Mark lead as rejected
- Mark lead as spam
- Mark lead as duplicate
- View lead analytics
- Export leads if export permission is enabled

### Cannot

- Edit website content
- Publish content
- Approve content
- Manage users
- Manage roles
- Manage settings
- Manage integrations
- Delete leads permanently
- View integration secrets
- Change site configuration

### Mandatory rule

```text
Sales Manager handles leads only.
```

### Future scalability

The system should support future lead visibility scopes:

```text
all_leads
team_leads
assigned_leads_only
```

For MVP, Sales / Lead Manager can view all leads unless the product owner decides otherwise.

---

## 5.6 Viewer / Analyst

Read-only role.

### Typical user

Founder assistant, partner, analyst, manager, observer.

### Can

- View allowed dashboards
- View reports
- View analytics
- View lead summary
- View content status
- View high-level performance data

### Cannot

- Create content
- Edit content
- Publish content
- Approve content
- Reject content
- Manage users
- Manage roles
- Manage settings
- Manage integrations
- Update lead status
- Add lead notes
- Delete anything
- Export sensitive data unless explicitly granted

### Mandatory rule

```text
Viewer sees. Viewer does not change.
```

---

# 6. Permission Naming Convention

Permissions must use dot notation.

Format:

```text
domain.action
```

Examples:

```text
content.create
content.edit
content.submit_review
content.approve
content.publish
leads.view
leads.update_status
users.manage_limited
settings.manage
roles.manage
analytics.view
integrations.manage
```

## 6.1 Permission Domains

Recommended domains:

```text
users
roles
permissions
content
services
industries
media
blog
news
announcements
leads
bookings
analytics
reports
settings
integrations
security
audit
```

---

# 7. Permission Catalog

## 7.1 User Permissions

```text
users.view
users.create
users.edit
users.deactivate
users.reactivate
users.manage_limited
users.manage_all
```

## 7.2 Role and Permission Permissions

```text
roles.view
roles.manage
permissions.view
permissions.manage
```

## 7.3 Content Permissions

```text
content.view
content.create
content.edit
content.edit_assigned
content.submit_review
content.review
content.approve
content.reject
content.publish
content.archive
content.restore
content.delete_soft
content.delete_hard
```

## 7.4 Services Permissions

```text
services.view
services.create
services.edit
services.submit_review
services.approve
services.publish
services.archive
services.restore
```

## 7.5 Industries Permissions

```text
industries.view
industries.create
industries.edit
industries.submit_review
industries.approve
industries.publish
industries.archive
industries.restore
```

## 7.6 Media Permissions

```text
media.view
media.upload
media.edit
media.archive
media.restore
media.delete_soft
media.delete_hard
```

## 7.7 Blog / News / Announcements Permissions

```text
blog.view
blog.create
blog.edit
blog.submit_review
blog.review
blog.approve
blog.reject
blog.publish
blog.archive

news.view
news.create
news.edit
news.submit_review
news.review
news.approve
news.reject
news.publish
news.archive

announcements.view
announcements.create
announcements.edit
announcements.submit_review
announcements.review
announcements.approve
announcements.reject
announcements.publish
announcements.archive
```

## 7.8 Lead Permissions

```text
leads.view
leads.view_all
leads.view_assigned
leads.create_manual
leads.update
leads.update_status
leads.assign
leads.add_note
leads.export
leads.archive
leads.restore
leads.delete_soft
leads.delete_hard
```

## 7.9 Booking Permissions

```text
bookings.view
bookings.view_all
bookings.update
bookings.update_status
bookings.assign
bookings.add_note
bookings.archive
bookings.restore
```

## 7.10 Analytics and Reports Permissions

```text
analytics.view
analytics.view_leads
analytics.view_content
analytics.view_traffic
analytics.view_conversion
reports.view
reports.export
```

## 7.11 Settings Permissions

```text
settings.view
settings.manage_basic
settings.manage_global
settings.manage_seo
settings.manage_security
```

## 7.12 Integration Permissions

```text
integrations.view
integrations.manage
integrations.manage_secrets
integrations.test_connection
```

## 7.13 Security Permissions

```text
security.view
security.manage
security.manage_sessions
security.manage_api_keys
```

## 7.14 Audit Permissions

```text
audit.view_limited
audit.view_all
audit.export
```

---

# 8. Role to Permission Matrix

## 8.1 High-Level Matrix

| Action | Super Admin | Admin | Editor | Moderator | Sales / Lead Manager | Viewer |
|---|---:|---:|---:|---:|---:|---:|
| Manage users | Full | Limited | No | No | No | No |
| Manage roles | Yes | No | No | No | No | No |
| Manage permissions | Yes | No | No | No | No | No |
| Manage global settings | Yes | Limited | No | No | No | No |
| Manage integrations | Yes | No / limited view | No | No | No | No |
| Manage integration secrets | Yes | No | No | No | No | No |
| Create content | Yes | Yes | Draft only | No | No | No |
| Edit content | Yes | Yes | Draft / assigned | Review only | No | No |
| Submit content for review | Yes | Yes | Yes | No | No | No |
| Approve content | Yes | Yes | No | Yes | No | No |
| Publish content | Yes | Yes | No | Yes if configured | No | No |
| Manage services | Yes | Yes | Draft only | Approve only | No | View only |
| Manage industries | Yes | Yes | Draft only | Approve only | No | View only |
| Manage blog/news | Yes | Yes | Draft only | Approve only | No | View only |
| View leads | Yes | Yes | No | No | Yes | Summary only |
| Update lead status | Yes | Yes | No | No | Yes | No |
| Add lead notes | Yes | Yes | No | No | Yes | No |
| Export leads | Yes | Yes | No | No | Optional | No |
| View analytics | Yes | Yes | No / limited | No / limited | Lead analytics | Yes |
| Hard-delete data | Restricted | No | No | No | No | No |
| View audit logs | All | Limited | No | No | No | No |

## 8.2 MVP Permission Assignment

### Super Admin

```text
*
```

### Admin

```text
users.view
users.create
users.edit
users.deactivate
users.reactivate
users.manage_limited

content.view
content.create
content.edit
content.review
content.approve
content.reject
content.publish
content.archive
content.restore
content.delete_soft

services.view
services.create
services.edit
services.approve
services.publish
services.archive
services.restore

industries.view
industries.create
industries.edit
industries.approve
industries.publish
industries.archive
industries.restore

media.view
media.upload
media.edit
media.archive
media.restore
media.delete_soft

blog.view
blog.create
blog.edit
blog.review
blog.approve
blog.reject
blog.publish
blog.archive

news.view
news.create
news.edit
news.review
news.approve
news.reject
news.publish
news.archive

announcements.view
announcements.create
announcements.edit
announcements.review
announcements.approve
announcements.reject
announcements.publish
announcements.archive

leads.view
leads.view_all
leads.update
leads.update_status
leads.assign
leads.add_note
leads.export
leads.archive
leads.restore
leads.delete_soft

bookings.view
bookings.view_all
bookings.update
bookings.update_status
bookings.assign
bookings.add_note
bookings.archive
bookings.restore

analytics.view
analytics.view_leads
analytics.view_content
analytics.view_traffic
analytics.view_conversion

reports.view
reports.export

settings.view
settings.manage_basic
settings.manage_seo

audit.view_limited
```

### Editor / Content Manager

```text
content.view
content.create
content.edit_assigned
content.submit_review

services.view
services.edit
services.submit_review

industries.view
industries.edit
industries.submit_review

media.view
media.upload
media.edit

blog.view
blog.create
blog.edit
blog.submit_review

news.view
news.create
news.edit
news.submit_review

announcements.view
announcements.create
announcements.edit
announcements.submit_review
```

### Moderator / Approver

```text
content.view
content.review
content.approve
content.reject
content.publish

services.view
services.approve
services.publish

industries.view
industries.approve
industries.publish

blog.view
blog.review
blog.approve
blog.reject
blog.publish

news.view
news.review
news.approve
news.reject
news.publish

announcements.view
announcements.review
announcements.approve
announcements.reject
announcements.publish

media.view
```

### Sales / Lead Manager

```text
leads.view
leads.view_all
leads.update
leads.update_status
leads.assign
leads.add_note
leads.archive

bookings.view
bookings.view_all
bookings.update
bookings.update_status
bookings.assign
bookings.add_note
bookings.archive

analytics.view
analytics.view_leads
reports.view
```

Optional:

```text
leads.export
```

### Viewer / Analyst

```text
analytics.view
analytics.view_leads
analytics.view_content
analytics.view_traffic
analytics.view_conversion

reports.view

content.view
services.view
industries.view

leads.view_summary
```

---

# 9. Content Approval Flow

## 9.1 Content Statuses

```text
Draft
Pending Review
Approved
Published
Rejected
Archived
```

## 9.2 MVP Flow

```text
Editor creates draft
        ↓
Editor submits for review
        ↓
Status becomes Pending Review
        ↓
Moderator or Admin reviews
        ↓
If rejected -> Rejected with comment
        ↓
Editor updates and resubmits
        ↓
If approved -> Published
```

## 9.3 Admin and Super Admin Bypass

Admin and Super Admin can publish directly.

```text
Admin creates content -> Publish
Super Admin creates content -> Publish
```

## 9.4 Rejection Comment Requirement

When rejecting content, Moderator or Admin must add a comment.

Required fields:

```text
rejection_reason
rejected_by
rejected_at
```

## 9.5 Archive Rule

Published content must not be hard-deleted from admin panel.

Use:

```text
Archived
```

---

# 10. Lead Management Flow

## 10.1 Lead Sources

Leads may come from:

```text
Contact form
Consultation request
Booking request
Landing page CTA
Future chatbot
Manual admin entry
Integration
```

## 10.2 Lead Statuses

```text
New
Contacted
Qualified
Proposal Sent
Won
Lost
Rejected
Spam
Duplicate
Archived
```

## 10.3 Lead Flow

```text
New
  ↓
Contacted
  ↓
Qualified
  ↓
Proposal Sent
  ↓
Won / Lost / Rejected
```

Alternative statuses:

```text
Spam
Duplicate
Archived
```

## 10.4 Lead Status Permission

Only these roles can update lead status:

```text
Super Admin
Admin
Sales / Lead Manager
```

## 10.5 Lead Notes

Lead notes must include:

```text
note_id
lead_id
note_body
created_by
created_at
visibility
```

Recommended visibility values:

```text
internal
private_admin
```

## 10.6 Lead Assignment

Lead assignment fields:

```text
assigned_to_user_id
assigned_by_user_id
assigned_at
```

## 10.7 Lead Deletion Rule

Leads must not be hard-deleted from admin panel.

Use:

```text
Archived
Spam
Duplicate
```

---

# 11. Booking Request Flow

## 11.1 Booking Statuses

```text
New
Confirmed
Rescheduled
Completed
Cancelled
No Show
Archived
```

## 11.2 Booking Permission

Only these roles can manage booking requests:

```text
Super Admin
Admin
Sales / Lead Manager
```

## 11.3 Booking Notes

Booking requests should support internal notes.

---

# 12. User Status Flow

## 12.1 User Statuses

```text
Pending Approval
Active
Suspended
Rejected
Deactivated
```

## 12.2 User Registration Flow

If user registration is enabled later:

```text
User registers
        ↓
Status: Pending Approval
        ↓
Moderator/Admin reviews
        ↓
Approve -> Active
Reject -> Rejected
Suspend -> Suspended
Deactivate -> Deactivated
```

## 12.3 MVP Note

If public user registration is not enabled in MVP, the user status flow still applies to internal admin users.

---

# 13. Data Deletion and Recovery

## 13.1 Default Deletion Behavior

All important entities must use soft-delete or archive.

Critical entities:

```text
users
leads
booking_requests
content_pages
services
industries
blog_posts
news_posts
announcements
media
settings
audit_logs
```

## 13.2 Soft-Delete Fields

Recommended fields:

```text
deleted_at
deleted_by
delete_reason
restored_at
restored_by
```

## 13.3 Archive Fields

Recommended fields:

```text
archived_at
archived_by
archive_reason
restored_at
restored_by
```

## 13.4 Hard Delete

Hard delete must not be available in normal admin UI for MVP.

If implemented later, it must require:

```text
Super Admin permission
Explicit confirmation
Audit log entry
Optional two-step confirmation
```

---

# 14. Audit Log

## 14.1 Purpose

The audit log records important system actions.

It is required for accountability, debugging, security, and future scaling.

## 14.2 Actions to Log

Log these actions:

```text
user.created
user.updated
user.deactivated
user.reactivated
user.role_changed

content.created
content.updated
content.submitted_review
content.approved
content.rejected
content.published
content.archived
content.restored

service.updated
industry.updated

lead.created
lead.updated
lead.status_changed
lead.assigned
lead.note_added
lead.archived
lead.restored

booking.created
booking.updated
booking.status_changed
booking.assigned
booking.note_added

settings.updated
integration.updated
integration.secret_updated

auth.login_success
auth.login_failed
auth.logout

permission.denied
```

## 14.3 Audit Log Fields

Recommended fields:

```text
id
actor_user_id
actor_role
action
entity_type
entity_id
old_value
new_value
metadata
ip_address
user_agent
created_at
```

## 14.4 Audit Log Access

```text
Super Admin -> all audit logs
Admin -> limited audit logs
Other roles -> no audit log access
```

## 14.5 Audit Log Protection

Audit logs must not be editable from admin panel.

---

# 15. Server-Side Enforcement

## 15.1 Mandatory Rule

UI restrictions are not enough.

Every protected API route must check permission on the server.

```text
No permission -> reject request
```

## 15.2 Example Permission Check Logic

Pseudo-code:

```ts
await requirePermission(user.id, "leads.update_status");
```

Example:

```ts
export async function updateLeadStatus(user, leadId, nextStatus) {
  await requirePermission(user.id, "leads.update_status");

  const lead = await getLeadById(leadId);

  await updateLead(leadId, { status: nextStatus });

  await auditLog({
    actorUserId: user.id,
    action: "lead.status_changed",
    entityType: "lead",
    entityId: leadId,
    oldValue: lead.status,
    newValue: nextStatus,
  });
}
```

## 15.3 UI Rule

UI can hide unavailable actions, but this is only usability.

```text
Hidden button != security
```

---

# 16. Admin Panel Navigation by Role

## 16.1 Super Admin

Can see all admin sections:

```text
Dashboard
Leads
Bookings
Content
Services
Industries
Blog / News
Media
Analytics
Users
Roles & Permissions
Integrations
Settings
Audit Logs
Security
```

## 16.2 Admin

Can see:

```text
Dashboard
Leads
Bookings
Content
Services
Industries
Blog / News
Media
Analytics
Users
Settings
Audit Logs limited
```

Cannot see:

```text
Roles & Permissions
Integration Secrets
Security Critical Settings
```

## 16.3 Editor

Can see:

```text
Content
Services
Industries
Blog / News
Media
My Drafts
Review Status
```

## 16.4 Moderator

Can see:

```text
Review Queue
Content
Blog / News
Pending Approvals
Media
```

## 16.5 Sales / Lead Manager

Can see:

```text
Leads
Bookings
Lead Notes
Lead Analytics
Follow-ups
```

## 16.6 Viewer / Analyst

Can see:

```text
Dashboard
Analytics
Reports
Content Status
Lead Summary
```

---

# 17. Database Model Recommendations

This is not the full database schema. It defines permission-related tables and required fields.

## 17.1 users

```sql
users (
  id uuid primary key,
  name text not null,
  email text unique not null,
  phone text,
  status text not null default 'Pending Approval',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deactivated_at timestamptz,
  deactivated_by uuid,
  deleted_at timestamptz,
  deleted_by uuid
);
```

## 17.2 roles

```sql
roles (
  id uuid primary key,
  key text unique not null,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

System roles:

```text
super_admin
admin
editor
moderator
sales_lead_manager
viewer
```

## 17.3 permissions

```sql
permissions (
  id uuid primary key,
  key text unique not null,
  domain text not null,
  action text not null,
  description text,
  created_at timestamptz not null default now()
);
```

## 17.4 role_permissions

```sql
role_permissions (
  role_id uuid not null references roles(id),
  permission_id uuid not null references permissions(id),
  created_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);
```

## 17.5 user_roles

```sql
user_roles (
  user_id uuid not null references users(id),
  role_id uuid not null references roles(id),
  assigned_by uuid references users(id),
  assigned_at timestamptz not null default now(),
  primary key (user_id, role_id)
);
```

## 17.6 audit_logs

```sql
audit_logs (
  id uuid primary key,
  actor_user_id uuid references users(id),
  actor_role text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_value jsonb,
  new_value jsonb,
  metadata jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
```

## 17.7 content_items

```sql
content_items (
  id uuid primary key,
  type text not null,
  title text not null,
  slug text unique,
  body jsonb,
  status text not null default 'Draft',
  author_id uuid references users(id),
  submitted_by uuid references users(id),
  submitted_at timestamptz,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  published_by uuid references users(id),
  published_at timestamptz,
  archived_by uuid references users(id),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 17.8 leads

```sql
leads (
  id uuid primary key,
  source text not null,
  status text not null default 'New',
  name text not null,
  company text,
  phone text,
  email text,
  interested_solution text,
  message text,
  assigned_to_user_id uuid references users(id),
  assigned_by_user_id uuid references users(id),
  assigned_at timestamptz,
  archived_at timestamptz,
  archived_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 17.9 lead_notes

```sql
lead_notes (
  id uuid primary key,
  lead_id uuid not null references leads(id),
  note_body text not null,
  visibility text not null default 'internal',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);
```

---

# 18. Frontend Implementation Rules

## 18.1 Route Guards

Protected admin routes must require authenticated user.

Example route groups:

```text
/admin
/admin/leads
/admin/content
/admin/users
/admin/settings
/admin/integrations
```

## 18.2 Permission Guards

Use permission guards for actions.

Examples:

```tsx
<Can permission="content.publish">
  <PublishButton />
</Can>

<Can permission="leads.update_status">
  <LeadStatusDropdown />
</Can>
```

## 18.3 Server Components / API

Do not rely only on frontend guards.

Every mutation must call server-side permission validation.

---

# 19. Backend Implementation Rules

## 19.1 Required Utility Functions

Implement these utilities:

```ts
getCurrentUser()
getUserRoles(userId)
getUserPermissions(userId)
hasPermission(userId, permissionKey)
requirePermission(userId, permissionKey)
requireAnyPermission(userId, permissionKeys)
requireRole(userId, roleKey)
writeAuditLog(payload)
```

## 19.2 Permission Cache

Permission lookup can be cached per request/session, but must refresh after role changes.

## 19.3 Denied Access Response

Recommended response:

```json
{
  "error": "FORBIDDEN",
  "message": "You do not have permission to perform this action."
}
```

Do not expose sensitive internal permission details to unauthorized users.

---

# 20. Security Requirements

```text
1. Protect all admin routes.
2. Enforce permissions server-side.
3. Do not expose integration secrets to non-Super Admin users.
4. Do not expose full lead data to Viewer role.
5. Do not allow Editor to publish.
6. Do not allow Sales Manager to edit public content.
7. Do not allow Admin to modify Super Admin.
8. Soft-delete critical records.
9. Record audit logs for important actions.
10. Validate all form inputs.
11. Rate-limit public lead forms.
12. Add spam protection to public forms.
13. Use environment variables for secrets.
14. Never store secrets in frontend code.
15. Sanitize rich text content before rendering.
```

---

# 21. MVP Build Checklist

## 21.1 Must Have

```text
[ ] Create roles table
[ ] Create permissions table
[ ] Create user_roles table
[ ] Create role_permissions table
[ ] Seed 6 system roles
[ ] Seed permission catalog
[ ] Assign permissions to roles
[ ] Protect admin routes
[ ] Add server-side permission checks
[ ] Add content approval statuses
[ ] Add lead statuses
[ ] Add audit log table
[ ] Write audit logs for important actions
[ ] Prevent Editor publish
[ ] Prevent Sales Manager content edits
[ ] Prevent Viewer mutations
[ ] Prevent Admin Super Admin changes
[ ] Use soft-delete/archive for critical records
```

## 21.2 Should Have

```text
[ ] Review queue UI
[ ] Lead assignment UI
[ ] Lead notes
[ ] Audit log viewer for Super Admin
[ ] Limited audit log viewer for Admin
[ ] Role-based admin navigation
[ ] Permission-based UI guards
```

## 21.3 Later

```text
[ ] Custom roles
[ ] Custom permission editor UI
[ ] Team-based lead visibility
[ ] Client portal roles
[ ] Two-factor authentication
[ ] Approval chains
[ ] Export permission controls
[ ] Field-level permissions
```

---

# 22. Future Roles Not in MVP

Do not add these in MVP unless needed later.

```text
Support Agent
Marketing Manager
Developer
Finance Manager
Client User
Partner
External Contractor
```

The current 6-role system is enough for MVP.

---

# 23. Final Locked Role Rules

```text
Super Admin controls everything.
Admin manages operations.
Editor creates drafts.
Moderator approves.
Sales / Lead Manager handles leads.
Viewer only views.
```

```text
Editor cannot publish.
Sales Manager cannot edit content.
Viewer cannot mutate data.
Admin cannot change Super Admin.
All critical deletion is soft-delete.
All important actions are audited.
All protected mutations are checked server-side.
```

---

# 24. Handoff Notes for Builder

The builder must implement this permission system as a scalable RBAC foundation.

Do not hardcode access only in UI.

Do not create one-off role checks like:

```ts
if (user.role === "admin")
```

Prefer permission checks:

```ts
requirePermission(user.id, "content.publish")
```

Roles are presets. Permissions control actions.

This keeps the system scalable and professional.
