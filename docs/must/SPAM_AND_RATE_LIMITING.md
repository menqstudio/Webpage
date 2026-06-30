# SPAM_AND_RATE_LIMITING.md

# Spam Protection and Rate Limiting Specification

## Purpose

Protect public contact, consultation, booking, and lead forms from spam, abuse, duplicates, and automated attacks.

## Mandatory Rule

```text
Public forms must save submission to database first, then send Email + Telegram notifications.
```

## Covered Forms

```text
Contact form
Consultation request form
Booking request form
CTA form
Future chatbot lead form
```

## MVP Protection

```text
Server-side validation
Rate limiting by IP
Rate limiting by email/phone when available
Honeypot field
Duplicate submission detection
Spam status
Input length limits
Basic suspicious pattern detection
```

Optional later:

```text
Cloudflare Turnstile
reCAPTCHA
Advanced spam scoring
```

## Recommended Rate Limits

```text
Max 5 submissions per IP per 10 minutes
Max 10 submissions per IP per 1 hour
Max 3 submissions with same email per 1 hour
Max 3 submissions with same phone per 1 hour
```

## Honeypot

Use a hidden field, for example:

```text
website_url
```

If filled, mark as spam or reject silently.

## Duplicate Detection

Compare:

```text
email
phone
message
IP address
time window
```

Recommended duplicate window: 24 hours.

## Lead Statuses

Must support:

```text
Spam
Duplicate
Archived
```

## Validation

```text
Name: required, max 120
Company: optional, max 160
Phone: max 40, allow + digits spaces parentheses hyphen
Email: valid format if provided, max 180
Interested solution: must match allowed options or Other
Message: max 3000, sanitize, no raw HTML
```

## Notification Handling

If database save succeeds but Email/Telegram fails:

```text
Keep lead
Log failure
Set notification_status
Show success to user
Allow admin retry later
```

If database save fails:

```text
Do not claim success
Show fallback error
Offer direct contact buttons
```

## Notification Statuses

```text
Pending
Email Sent
Telegram Sent
Both Sent
Partially Failed
Failed
Retry Pending
```

## Checklist

```text
[ ] Add server-side validation
[ ] Add IP rate limit
[ ] Add honeypot
[ ] Add duplicate detection
[ ] Save lead before notifications
[ ] Add notification status
[ ] Add Email notification
[ ] Add Telegram notification
[ ] Log failures
[ ] Sanitize all input
```
