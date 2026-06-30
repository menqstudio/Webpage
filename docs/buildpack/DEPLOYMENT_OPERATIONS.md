# Deployment and Operations

## Deployment target
The final deployment target is not confirmed. Keep the project portable.

Supported options:
- Vercel,
- Netlify,
- VPS,
- cPanel with Node support,
- Docker deployment.

## Recommended default
Use Vercel for Next.js unless the owner chooses another deployment target.

## Environment variables
Required for form:
```txt
LEADS_EMAIL_TO=
LEADS_EMAIL_FROM=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Optional:
```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=hy
DATABASE_URL=
RATE_LIMIT_SECRET=
```

## Deployment checklist
- Install dependencies.
- Build project.
- Set environment variables.
- Configure domain.
- Enable HTTPS.
- Test form.
- Test Telegram.
- Test Email.
- Test theme switch.
- Test language routing.

## Monitoring
MVP monitoring:
- form delivery check,
- server error logs,
- performance check,
- lead notification check.

Optional:
- analytics,
- conversion tracking,
- error monitoring,
- uptime monitoring.

## Backup and recovery
If using database:
- enable backups,
- define retention,
- export lead submissions periodically.

If no database:
- ensure Email and Telegram notifications are reliable.
- avoid using notification channels as the only permanent record long term.

## Maintenance
Monthly checks:
- form works,
- notifications work,
- dependencies updated,
- SEO metadata valid,
- no broken links,
- content still accurate.

## Post-launch improvements
- Add real certificate cards when ready.
- Add real case studies when available.
- Add English and Russian final translations.
- Add analytics and conversion optimization.
- Add CRM integration.
