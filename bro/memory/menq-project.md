---
name: menq-project
description: "MenQ — fullstack AI-business landing page + admin panel; stack, scope, and locked decisions"
metadata: 
  node_type: memory
  type: project
  originSessionId: 14290066-adcf-48e9-b73d-ceb8d356e803
---

**MenQ** (`c:\Users\Admin\Desktop\Menq`) — premium business landing page that sells AI/automation/software business outcomes, plus a planned admin panel (CMS/CRM). Brand name "MenQ" (placeholder, may change). Spec lives in `docs/` (my SPEC/WIREFRAME), `docs/buildpack/` (24-file build pack), `docs/must/` (12 MUST docs).

**Stack:** Next.js 16 (App Router, `[locale]` as root layout, no `app/layout.tsx`) + React 19 + TypeScript + Tailwind v3 + CSS-variable design tokens. Fonts: Inter (latin+cyrillic) + Noto Sans Armenian (per-glyph fallback). i18n: custom dictionary (`src/content/locales/{hy,en,ru}.ts`), middleware→`src/proxy.ts` redirects `/`→`/hy`.

**Locked decisions (from docs/must/):**
- Languages HY/EN/RU (HY default); URL `/hy /en /ru`; never mix languages in one locale.
- Dark/light theme via `data-theme` on `<html>`, no-flash inline script, localStorage `menq-theme`.
- Design system fully tokenized — ZERO hardcoded visual values in components.
- Lead flow: **save to DB FIRST, then notify Email + Telegram** (notifications can fail gracefully w/ notification_status). DB = PostgreSQL + Prisma.
- Admin: **invite-only**, public registration disabled. RBAC with 6 roles (super_admin, admin, editor, moderator, sales_lead_manager, viewer) — permissions are source of truth, enforced server-side. See `docs/buildpack/PERMISSION_SYSTEM.md`.
- No fake testimonials/case studies → use "Example problems we solve". Certifications: general wording only.
- Legal pages (privacy/terms/cookies) trilingual placeholders; form consent required.
- Analytics placeholder-ready (GA4/GTM); Booking = Calendly placeholder. Deploy: Vercel preferred.
- Env canonical names follow `docs/must/ENV_AND_SECRETS.md` (NEXT_PUBLIC_APP_URL, EMAIL_TO_LEADS, SMTP_PASS, TELEGRAM_LEADS_CHAT_ID — NOT the buildpack's older LEADS_EMAIL_TO/SMTP_PASSWORD names).

**Build status (as of 2026-07-01):** feature-complete and **ready for user testing**; build/lint/tsc all green. Full history in `docs/BUILD_LOG.md`. Done: landing (14 sections, HY/EN/RU, dark/light, legal pages, SEO+OG image, sitemap/robots) · DB-first lead flow + Email/Telegram (graceful no-DB fallback) · auth+RBAC (invite-only, sessions, 6 roles, audit) · **full admin panel** (`(admin)/admin/(panel)`, **bilingual HY/EN**) with leads/bookings/users/audit/settings + **services/industries CRUD** + **editable landing-section content** (publish → overrides dictionary, per-language) · production hardening (security headers, standalone-for-docker, Dockerfile) · 3-agent QA pass with all real bugs fixed. **Post-audit hardening (2026-07-02):** ran a 4-agent Fable-5 audit (public/admin/backend/gap) then landed 4 fix batches — security (admin-tier escalation guards, login throttle+anti-enum, trusted-IP, seed-pw guard), robustness (notif timeouts, no-DB lead log, body/UTM guards, P2025 swallow, bookings notify, editor draft-governance), public/SEO-legal-a11y (legal canonicals+x-default, consent text, softened cert wording, drawer focus-trap, localized error/404+catch-all, CSP), hardening (proxy /admin gate, limiter eviction, dropped `jose`, vitest+19 tests, filled RELEASE/SMOKE checklists). All on branch **`autopilot/continue`, 4+1 local commits, UNPUSHED** (push reserved for Gev); tsc/lint/test/prod-build all green. **Autopilot follow-up (2026-07-03):** cleared the ENTIRE queued backlog in 5 more commits on the same branch — analytics wiring (7 CTA/FAQ/lang/contact/booking/lead-start events via a `TrackedLink` + `buttonClasses`, consent-gated), auth niceties (24h idle-timeout via sliding `Session.expiresAt`+`sessionPolicy.ts`, single-use atomic invite/reset tokens, `permission.denied` audit, +5 tests), i18n/token hygiene (localized OG alt via `generateImageMetadata`, `hero.visual.liveLabel`, `2xs` font token, `common.mainNavLabel`, dropped dead keys), public a11y polish (cookie `role=region`+label, lead-success focus, shared `SkipLink` on legal pages), and the lead notification-retry action (`resendLeadNotifications` reusing the createLead pipeline, uses `RETRY_PENDING`, gated `leads.update`+audited, Resend button). Now **10 local commits UNPUSHED**, tests 24/24, tsc/lint/prod-build green. `bro/AUTOPILOT-PLAN.md` backlog is empty; remaining non-autopilot items (distributed rate limiter, native booking form, editor→moderator approval workflow) need a Gev decision.

**Local dev workflow:** `docker compose up -d` (Postgres on host port **5433** — 5432 is taken by a local install) → `.env.local` already has `DATABASE_URL` + a generated `AUTH_SECRET` (gitignored, NOT committed) → `npm run db:migrate && npm run db:seed` → `npm run dev` (port 3100 has been used). Admin: `/admin/login`, seeded super admin `admin@menq.local` / `ChangeMe123!`. Route groups = multiple root layouts.

**Remaining (NOT bugs):** owner must provide real contact/brand data (`src/config/contact.ts` placeholders) + real secrets (SMTP/Telegram) + deploy (Vercel preferred, `NEXT_PUBLIC_APP_URL`). Optional phase-2: FAQ editing from admin, editor/moderator review→approve workflow, native public booking form. User said "tomorrow" (after 2026-07-01) — continue with tester feedback. See [[menq-user-comms]].
