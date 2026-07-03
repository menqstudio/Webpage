# ENV_AND_SECRETS.md

# Environment Variables and Secrets Specification

## Purpose

Defines handling for database, auth, email, Telegram, analytics, booking, and deployment secrets.

## Mandatory Rules

```text
No secrets in frontend code
No secrets in git
No hardcoded production credentials
Use .env.example with placeholders
Use hosting provider env vars in production
```

## Environment Files

```text
.env.local
.env.development
.env.production
.env.example
```

Only `.env.example` should be committed.

## Required Variables

### App

```text
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=hy
NEXT_PUBLIC_SUPPORTED_LOCALES=hy,en,ru
```

### Database

```text
DATABASE_URL=
```

### Auth

```text
AUTH_SECRET=
AUTH_URL=
SESSION_MAX_AGE=
SESSION_IDLE_TIMEOUT=
```

### Email

```text
EMAIL_PROVIDER=
EMAIL_FROM=
EMAIL_TO_LEADS=
EMAIL_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### Telegram

```text
TELEGRAM_BOT_TOKEN=
TELEGRAM_LEADS_CHAT_ID=
```

### Analytics

```text
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

### Booking

```text
NEXT_PUBLIC_CALENDLY_URL=
```

### Rate Limiting

```text
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_SECONDS=600
RATE_LIMIT_MAX_REQUESTS=5
```

### Captcha Optional

```text
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## Public vs Private

Only `NEXT_PUBLIC_` variables are browser-safe.

Private:

```text
DATABASE_URL
AUTH_SECRET
EMAIL_API_KEY
TELEGRAM_BOT_TOKEN
TURNSTILE_SECRET_KEY
```

## Secret Display

Admin UI must show masked secrets only:

```text
••••••••••••abcd
```

## Checklist

```text
[ ] Add .env.example
[ ] Use private env vars for secrets
[ ] Do not expose secrets to frontend
[ ] Validate required env vars
[ ] Mask secrets in admin
[ ] Log missing real values in OPEN_ITEMS_LOG.md
```
