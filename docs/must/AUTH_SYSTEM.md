# AUTH_SYSTEM.md

# Authentication System Specification

## Purpose

Defines authentication for the public business landing page and protected admin panel.

## Locked Decisions

```text
Admin users: invite-only
Public registration: disabled for MVP
Protected admin panel: required
Database: PostgreSQL
ORM: Prisma recommended
```

## MVP Scope

Must include:

```text
Login
Logout
Protected /admin routes
Session handling
Forgot password
Password reset
Invite-only admin user creation
User activation/deactivation
Failed login handling
Server-side permission checks
```

Must not include in MVP:

```text
Public admin registration
Client portal auth
Customer accounts
Public user profiles
```

## User Creation

Admin users are created by invitation or manually by authorized users.

Allowed creators:

```text
Super Admin
Admin with limited user-management permission
```

Admin can only create/manage:

```text
Editor / Content Manager
Moderator / Approver
Sales / Lead Manager
Viewer / Analyst
```

Admin cannot create, edit, deactivate, or promote Super Admin.

## Login Flow

```text
User opens /admin/login
User enters email + password
Server validates credentials
Server checks user status
If Active -> create session
Redirect to /admin/dashboard
```

Blocked statuses:

```text
Pending Approval
Suspended
Rejected
Deactivated
```

Use generic errors. Do not reveal whether an email exists.

## Invite Flow

```text
Super Admin/Admin creates user
System generates invite token
Invite email is sent
User opens invite link
User creates password
User becomes Active
Redirect to admin login
```

Invite token requirements:

```text
Single-use
Expires after 72 hours
Invalidated after use
Stored hashed if possible
```

## Session Rules

```text
Session max age: 7 days
Idle timeout: 24 hours recommended
Logout invalidates session
Password reset invalidates existing sessions
Suspension/deactivation invalidates all sessions
```

## Password Rules

```text
At least 10 characters
Store hashed only
Never store plain text passwords
Never email passwords
```

## Route Protection

All routes under `/admin/*` require authenticated Active user.

Unauthenticated users redirect to `/admin/login`.

## Permission Integration

Authentication proves identity. Permissions decide actions.

Every protected mutation must check permission server-side.

```ts
await requirePermission(user.id, "leads.update_status");
```

Hidden buttons are not security.

## Audit Events

Log:

```text
auth.login_success
auth.login_failed
auth.logout
auth.password_reset_requested
auth.password_reset_completed
auth.invite_created
auth.invite_accepted
user.created
user.deactivated
user.reactivated
user.role_changed
```

## Security Notes

```text
Use HTTPS in production
Use secure httpOnly cookies
Use sameSite protection
Use environment variables for auth secrets
Do not expose tokens in frontend logs
```
