# ERROR_LOGGING_AND_MONITORING.md

# Error Logging and Monitoring Specification

## Purpose

Define production logging and monitoring. The most important rule: leads must not be lost.

## Mandatory Rule

```text
Lead must be saved to database before Email or Telegram notification.
If notifications fail, the lead must remain saved.
```

## What to Log

```text
Form submission errors
Email notification failures
Telegram notification failures
Database errors
Auth login failures
Permission denied events
Rate limit violations
Spam detection events
Unexpected server errors
Admin mutation failures
```

## Severity Levels

```text
info
warning
error
critical
```

## Form Failure Handling

Database save succeeds, Email fails:

```text
Keep lead
Log email failure
Try Telegram
Show success to user
```

Database save succeeds, Telegram fails:

```text
Keep lead
Log Telegram failure
Try Email
Show success to user
```

Database save succeeds, both fail:

```text
Keep lead
Log failures
notification_status = Failed
Show success to user
Allow admin retry
```

Database save fails:

```text
Do not claim success
Log critical error
Show fallback error
Offer direct contact buttons
```

## Monitoring Providers

Recommended options:

```text
Sentry
Axiom
Logtail
Vercel Logs
PostHog
Custom database logs
```

MVP can start with server logs + database system events.

## system_events Table

```sql
system_events (
  id uuid primary key,
  severity text not null,
  event_type text not null,
  message text not null,
  metadata jsonb,
  user_id uuid,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
```

## Admin Dashboard Widgets

```text
Failed notifications
Recent system errors
Spam submissions
Rate limit hits
Failed login attempts
```

## Privacy Rule

Do not log secrets or unnecessary full PII.

Avoid logging full:

```text
lead message
email body
phone
secret tokens
API keys
passwords
```

## Checklist

```text
[ ] Add server-side error handling
[ ] Save lead before notifications
[ ] Add notification status fields
[ ] Log Email failures
[ ] Log Telegram failures
[ ] Add system_events table
[ ] Add admin visibility for failed notifications
[ ] Add retry-ready fields
[ ] Avoid logging secrets
```
