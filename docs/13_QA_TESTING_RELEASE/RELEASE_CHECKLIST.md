# RELEASE_CHECKLIST

**Folder:** `13_QA_TESTING_RELEASE`
**File:** `RELEASE_CHECKLIST.md`
**Default Status:** `MUST` — required before every production release.

> The gate that must be green before MenQ ships to production. Pair with
> `SMOKE_TEST_CHECKLIST.md` (run immediately after deploy). Source of truth for
> env vars: `docs/must/ENV_AND_SECRETS.md`; go-live steps: `docs/GO_LIVE.md`.

---

## 1. Code quality gate

- [ ] `npm run lint` — clean.
- [ ] `npx tsc --noEmit` — clean.
- [ ] `npm test` — unit tests pass.
- [ ] `npm run build` — production build succeeds (no BUILD_STANDALONE unless Docker).
- [ ] No secrets committed (`git ls-files | grep -i env` shows only `.env.example`).

## 2. Owner-provided content & secrets

- [ ] Real contact data set in `src/config/contact.ts` (no `+374 00 000 000` / `*.example`).
- [ ] `legalName` set in `src/config/site.ts`.
- [ ] Final legal copy (privacy / terms / cookies) reviewed — no "MVP placeholder" text.
- [ ] EN / RU marketing copy proofread.
- [ ] `NEXT_PUBLIC_APP_URL` = the real production origin (drives canonical/OG/sitemap).
- [ ] `DATABASE_URL` = managed Postgres connection string.
- [ ] `ADMIN_EMAIL` + a strong `ADMIN_PASSWORD` (seed refuses the default in prod).
- [ ] SMTP: `EMAIL_FROM`, `EMAIL_TO_LEADS`, `SMTP_HOST/PORT/USER/PASS`.
- [ ] Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_LEADS_CHAT_ID`.
- [ ] `TRUSTED_PROXY_COUNT` matches the deploy topology (Vercel = 1).
- [ ] Analytics ids (`NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_GTM_ID`) + `NEXT_PUBLIC_CALENDLY_URL` if used.

## 3. Database

- [ ] `npm run db:deploy` (applies migrations) against the prod DB.
- [ ] `npm run db:seed` — creates roles/permissions + the super admin.
- [ ] Log in once and confirm/rotate the super-admin password.

## 4. Security

- [ ] Security headers present (CSP, X-Frame-Options, X-Content-Type-Options,
      Referrer-Policy, Permissions-Policy) — verify with `curl -I`.
- [ ] Admin area returns a login redirect when unauthenticated.
- [ ] `robots.txt` blocks `/admin` and `/api`; `sitemap.xml` lists all locales + legal.
- [ ] HTTPS enforced by the platform; session cookie is `Secure` in prod.

## 5. Deploy

- [ ] Deploy target chosen (Vercel recommended) + custom domain wired.
- [ ] All env vars set in the platform (not just `.env.local`).
- [ ] Run the full `SMOKE_TEST_CHECKLIST.md` against the live URL.

---

## Rollback

- Revert to the previous deployment in the platform dashboard.
- Migrations are additive; a bad release is a code rollback, not a DB rollback.

## Open Questions

| Question | Owner | Status |
|---|---|---|
| Final deploy target + domain | Gev | OPEN |
| Real brand/contact + legal copy | Gev | OPEN |
