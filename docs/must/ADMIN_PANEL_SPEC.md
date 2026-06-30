# ADMIN_PANEL_SPEC.md

# Admin Panel Specification

## Purpose

Defines the internal admin panel for leads, bookings, content, services, industries, users, settings, analytics, and audit logs.

## MVP Routes

```text
/admin/login
/admin/dashboard
/admin/leads
/admin/bookings
/admin/content
/admin/services
/admin/industries
/admin/media
/admin/analytics
/admin/users
/admin/settings
/admin/audit-logs
```

## Role-Based Navigation

### Super Admin

```text
Dashboard
Leads
Bookings
Content
Services
Industries
Media
Analytics
Users
Roles & Permissions
Settings
Integrations
Audit Logs
Security
```

### Admin

```text
Dashboard
Leads
Bookings
Content
Services
Industries
Media
Analytics
Users
Settings
Audit Logs
```

### Editor / Content Manager

```text
Content
Services
Industries
Media
My Drafts
Review Status
```

### Moderator / Approver

```text
Review Queue
Content
Services
Industries
Media
```

### Sales / Lead Manager

```text
Dashboard
Leads
Bookings
Lead Analytics
Follow-ups
```

### Viewer / Analyst

```text
Dashboard
Analytics
Reports
Content Status
Lead Summary
```

## Dashboard

Widgets:

```text
New Leads Today
Pending Bookings
Pending Reviews
Qualified Leads
Won Leads
Failed Notifications
Recent Audit Activity
```

## Leads Page

Columns:

```text
Name
Company
Phone
Email
Interested Solution
Source
Status
Assigned To
Created At
Last Updated
Actions
```

Filters:

```text
Status
Source
Assigned To
Date Range
Interested Solution
Language
UTM Source
```

Actions:

```text
View details
Update status
Assign lead
Add note
Archive
Mark spam
Mark duplicate
Export if permitted
```

## Bookings Page

Statuses:

```text
New
Confirmed
Rescheduled
Completed
Cancelled
No Show
Archived
```

Actions:

```text
View
Confirm
Reschedule
Mark completed
Cancel
Add note
Assign
Archive
```

## Content Page

Content types:

```text
Hero
Pain Section
Solution Overview
Services Block
Business Success Section
Industries Block
Results Section
AI Section
How We Work
Trust Section
FAQ
CTA
Footer
```

Statuses:

```text
Draft
Pending Review
Approved
Published
Rejected
Archived
```

Actions:

```text
Create draft
Edit draft
Submit for review
Approve
Reject with comment
Publish
Archive
Restore
Preview
```

## Services Page Fields

```text
Title
Slug
Short Description
Full Description
Business Value
Icon
Category
Order
Language
Status
SEO Title
SEO Description
```

## Industries Page Fields

```text
Title
Slug
Description
Recommended Solutions
Icon
Group
Order
Language
Status
SEO Title
SEO Description
```

## Users Page

Columns:

```text
Name
Email
Role
Status
Created At
Last Login
Actions
```

Admin cannot create/edit/deactivate/promote Super Admin.

## Settings Page

Sections:

```text
General
Contact placeholders
SEO defaults
Language defaults
Form settings
Notification settings
Booking placeholder
Legal page placeholders
```

Only Super Admin can manage integration secrets, security settings, API keys, and role permissions.

## Build Rules

```text
Use permission-based UI rendering
Use server-side permission enforcement
Use tokenized design system
No hardcoded visual values
All destructive actions use confirmation
All important actions write audit log
```
