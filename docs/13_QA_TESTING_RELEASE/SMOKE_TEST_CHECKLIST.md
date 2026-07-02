# SMOKE_TEST_CHECKLIST

**Folder:** `13_QA_TESTING_RELEASE`
**File:** `SMOKE_TEST_CHECKLIST.md`
**Default Status:** `SHOULD` — run immediately after every production deploy.

> A 5-minute pass against the LIVE URL to confirm the critical paths work.
> If any ❌ appears, roll back (see `RELEASE_CHECKLIST.md` → Rollback).

---

## Public site

- [ ] `/` redirects to `/hy` (307).
- [ ] `/hy`, `/en`, `/ru` all render 200 with the correct language (no mixed language).
- [ ] Dark/light theme toggle works and survives reload (no flash).
- [ ] Language switch keeps you on the same page and remembers the choice.
- [ ] `/hy/privacy`, `/terms`, `/cookies` render in all 3 locales.
- [ ] `view-source` on `/en/privacy`: canonical + og:url point to `/en/privacy`
      (not `/en`); `hreflang` alternates incl. `x-default` present.
- [ ] `/hy/does-not-exist` shows the styled 404 page.
- [ ] Mobile drawer opens, traps focus, closes on Escape.

## Lead flow (the money path)

- [ ] Submit the consultation form with valid data → success state shown.
- [ ] Lead appears in `/admin/leads`.
- [ ] Email notification received at `EMAIL_TO_LEADS`.
- [ ] Telegram notification received in the leads chat.
- [ ] Submit with a bad email / empty name → inline validation errors.
- [ ] Honeypot (fill hidden `website`) → silently accepted, NOT stored.

## Admin

- [ ] `/admin` while logged out → redirects to `/admin/login`.
- [ ] Log in as super admin → dashboard loads.
- [ ] Leads list: change status, add a note, assign — all persist.
- [ ] Export leads CSV downloads and opens cleanly (no formula-injection cells).
- [ ] Content: publish a section override → it shows on the public page for that
      language only; other languages keep the dictionary copy.
- [ ] Users: invite flow sends an email with a working accept-invite link.
- [ ] Log out → session invalidated.

## Infra / headers

- [ ] `curl -I https://<domain>` shows CSP + the other security headers.
- [ ] `/robots.txt` blocks `/admin` + `/api`; `/sitemap.xml` lists all URLs.
- [ ] No server errors in the platform logs during the run.

---

## Notes

- The admin **Settings → test notification** tool is the fastest way to verify
  Email + Telegram wiring without submitting a real lead.
