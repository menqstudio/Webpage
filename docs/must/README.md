# AI Business Landing Page — MUST Docs Pack

This pack contains the missing MUST-level build documents for the AI Business Landing Page project. Drop these files into the main build pack.

## Locked Decisions

```text
Admin users: invite-only
Public registration: disabled for MVP
Lead submissions: save to database first, then notify Email + Telegram
Default language: Armenian / hy
URL structure: /hy /en /ru
Legal pages: simple placeholders for MVP
Analytics: placeholder-ready, GA4/GTM support
Booking: Calendly placeholder enabled
Contact buttons: Phone, Email, Telegram, WhatsApp
Certifications: general wording only, no specific certificate names yet
Testimonials/case studies: no fake testimonials, no fake cases
Use “Example problems we solve” instead of case studies
Admin MVP: login, dashboard, leads, bookings, content, services, industries, users, settings, audit logs
Database: PostgreSQL + Prisma recommended
Deployment: Vercel preferred, final hosting TBD
```

## Files

```text
AUTH_SYSTEM.md
ADMIN_PANEL_SPEC.md
LEGAL_AND_PRIVACY.md
SPAM_AND_RATE_LIMITING.md
I18N_LANGUAGE_SYSTEM.md
ANALYTICS_AND_CONVERSION.md
ENV_AND_SECRETS.md
ERROR_LOGGING_AND_MONITORING.md
CONTENT_MODEL.md
ACCESSIBILITY_SPEC.md
PERFORMANCE_BUDGET.md
```

## Build Rule

If a value is still unknown, the builder must use the placeholder or recommended default and continue without blocking.
