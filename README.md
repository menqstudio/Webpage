# MenQ — AI Business Landing Page + Admin

Premium, trilingual (HY / EN / RU) business landing page that sells AI, automation,
and software business outcomes — plus an invite-only admin panel (leads, bookings,
content, users, audit logs) with role-based access control.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v3 ·
CSS-variable design tokens · Prisma + PostgreSQL**.

## Highlights

- **Fully tokenized design system** — zero hardcoded visual values; dark/light via `data-theme`.
- **i18n** — `/hy /en /ru`, fully translated dictionaries, hreflang + localized metadata.
- **Lead flow** — validation, honeypot, tiered rate limiting, **DB-first** persistence, then
  Email + Telegram notifications with delivery status (degrades gracefully without a DB).
- **Auth + RBAC** — invite-only, sessions, password reset; 6 roles, server-enforced permissions, audit log.
- **Admin panel** — dashboard, leads (status/notes/archive), bookings, users (invite), audit logs, settings.
- **SEO** — metadata, JSON-LD, `sitemap.xml`, `robots.txt`. **Analytics** — GA4/GTM ready (no PII).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000 → /hy
```

The **public site works with no configuration**. The lead form validates and (without a DB)
logs a dev-fallback. To enable persistence, notifications, and the admin panel, configure
the env vars below.

### Database + admin

```bash
# 1) Set DATABASE_URL (PostgreSQL) in .env.local
npm run db:migrate     # create tables
npm run db:seed        # seed roles, permission catalog, and the super admin
# 2) Sign in at /admin/login with ADMIN_EMAIL / ADMIN_PASSWORD
```

### Environment variables

See [`.env.example`](.env.example). Key groups: app URL + locales, `DATABASE_URL`,
auth (`AUTH_SECRET`, `SESSION_MAX_AGE`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`),
email SMTP, Telegram, analytics (GA4/GTM), Calendly, rate limiting. Only `NEXT_PUBLIC_*`
are exposed to the browser; never commit real secrets.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run lint` | ESLint |
| `npm run db:migrate` / `db:deploy` | Prisma migrate (dev / prod) |
| `npm run db:seed` | Seed roles, permissions, super admin |
| `npm run db:studio` | Prisma Studio |

## Project structure

```
src/
  app/
    (site)/[locale]/      # public landing + legal pages (i18n)
    (admin)/admin/        # admin root layout, auth pages, (panel)/* dashboard etc.
    api/leads/route.ts    # public lead intake
    sitemap.ts, robots.ts
  components/  ui/ layout/ landing/ admin/ legal/ theme/ i18n/ analytics/ seo/
  content/locales/        # hy.ts / en.ts / ru.ts dictionaries
  config/                 # site, navigation, contact, icons, adminNav
  lib/                    # i18n, cn, fonts, seo, forms, analytics,
                          # db/ (prisma, systemEvents), auth/ (rbac, session, actions…),
                          # leads/, integrations/ (email, telegram)
  styles/tokens/          # primitives / semantic / components / motion / sections
prisma/schema.prisma, prisma/seed.ts
docs/                     # SPEC, WIREFRAME, BUILD_LOG, buildpack/, must/
```

## Deployment

Portable; **Vercel + a managed PostgreSQL** (Neon/Supabase) is the recommended default.
Set all env vars in the host, run `db:deploy`, then `db:seed` once. `postinstall` runs
`prisma generate`. `/admin` and `/api` are disallowed in `robots.txt`.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) for the full build history and
[`docs/buildpack/OPEN_ITEMS_LOG.md`](docs/buildpack/OPEN_ITEMS_LOG.md) for placeholders to replace.
