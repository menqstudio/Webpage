# MenQ — Build Log

Living log of everything built, fixed, and decided. Newest milestone at the bottom.
Status legend: ✅ done & verified · 🔧 implemented · ⏭️ deferred (needs real secret/decision) · 🐞 bug fixed

---

## Milestone 1 — Foundation + Landing page ✅

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v3 · CSS-variable tokens.

- ✅ Scaffolded Next.js (`create-next-app`), moved into project root, pinned Tailwind v3 (token-mapping matches build pack).
- ✅ Design token system: `src/styles/tokens/{primitives,semantic,components,motion,sections}.css` — zero hardcoded visual values; Tailwind theme maps to the CSS variables.
- ✅ Dark/light theme via `data-theme` on `<html>` + no-flash inline script + localStorage. "Contrast" sections render dark navy in both themes.
- ✅ Fonts: Inter (latin+cyrillic) + Noto Sans Armenian (armenian) with per-glyph fallback so Armenian renders correctly.
- ✅ i18n: HY/EN/RU dictionaries (fully translated, not placeholders), `[locale]` routing, `src/proxy.ts` redirects `/`→detected locale, hreflang + localized metadata.
- ✅ 14 landing sections: Header, Hero (+abstract dashboard visual), Pain, SolutionOverview, ServiceBlocks (4 business blocks), BusinessSuccess, Industries (5 groups), Results, AISection, HowWeWork, Trust (+security), FAQ (accordion), CTA (+lead form), Footer.
- ✅ UI primitives: Container, Section, SectionHeading, Button/ButtonLink, Badge, Card, GlassCard styles, IconWrap, Reveal (IntersectionObserver scroll-reveal, reduced-motion aware), FormField/Select/TextArea.
- ✅ Lead form: client validation + states (idle/submitting/success/error), honeypot, UTM capture, posts to `/api/leads`.
- ✅ `/api/leads` route (M1 form of it): validation, honeypot, in-memory rate limit, length caps, logs + returns ok.
- ✅ SEO: per-locale metadata, hreflang alternates, Open Graph, JSON-LD (Organization/WebSite/FAQPage).
- ✅ A11y baseline: semantic HTML, one h1, skip link, visible token focus rings, form labels+errors, reduced-motion.
- ✅ **Verified:** `npm run build` green; `/hy /en /ru` prerendered; root→307 redirect; API valid→`{ok:true}`, invalid→400; CSS contains tokens + both themes.

### M1 fixes / notes
- 🐞 npm rejected capital project name "Menq" → scaffolded as lowercase `menq` in temp, moved into root.
- 🐞 Tailwind opacity modifiers on CSS-var colors (`bg-x/60`) don't work in v3 → replaced with solid tokens / token-referencing inline styles.
- 🐞 Next 16 deprecates `middleware` convention → renamed to `src/proxy.ts` (`proxy` fn).
- 🔧 Pinned `turbopack.root` in next.config to ignore an unrelated lockfile in the home dir.

### Adopted MUST-docs (12) — reconciliations
- 🔧 Standardized env names on `docs/must/ENV_AND_SECRETS.md` (e.g. `NEXT_PUBLIC_APP_URL`, `EMAIL_TO_LEADS`, `SMTP_PASS`, `TELEGRAM_LEADS_CHAT_ID`) — buildpack used older names. `site.ts` reads APP_URL w/ fallback.
- 🔧 Aligned lead length caps to spam spec (message 3000, phone 40, email 180).

### M1 polish (MUST-doc completeness) ✅
- ✅ Legal pages: `/[locale]/privacy`, `/terms`, `/cookies` — trilingual placeholder content (privacy covers all 8 required points), shared `LegalPage` component, footer links wired, prerendered for all 3 locales.
- ✅ Official consent text (locked wording) in all 3 locales.
- ✅ Drawer a11y: Escape closes, focus moves into drawer on open + restores to trigger on close, `role="dialog"` + `aria-modal` + `aria-expanded`.
- ✅ Analytics scaffold: no-PII `track()` helper + GA4/GTM injector (renders nothing until env ids set); wired `lead_form_submit/success/error` events.
- ✅ Contact: added WhatsApp button; Calendly "book a call" button (renders when `NEXT_PUBLIC_CALENDLY_URL` set).
- ✅ SEO: `sitemap.xml` (all locales + legal) and `robots.txt` (disallow /admin,/api).
- ✅ **Verified:** build green; 18 static pages incl. legal × 3 locales, robots, sitemap.

---

## Milestone 2 — DB-first lead flow + notifications 🔧

- 🔧 **Prisma schema** (`prisma/schema.prisma`, PostgreSQL): full data model — User/Role/Permission/RolePermission/UserRole/Session/InviteToken/PasswordResetToken, Lead/LeadNote/LeadEvent/LeadNotificationLog, Booking, ContentItem/Service/Industry/Faq/MediaAsset, AuditLog, SystemEvent + enums. Covers M2–M4 so no re-migration.
- 🐞 Prisma 7 (installed by default) dropped `url` in datasource → **downgraded to Prisma 6.19** (stable classic setup). Client generated.
- 🔧 `src/lib/db/prisma.ts`: lazy singleton, returns `null` when `DATABASE_URL` unset → app works DB-less (notify-only dev fallback).
- 🔧 `src/lib/db/systemEvents.ts`: `logSystemEvent()` → console always + `system_events` table when DB present; never throws; no secrets/PII.
- 🔧 Notifications: `email.ts` (nodemailer SMTP) + `telegram.ts` (Bot API) — each skips cleanly when unconfigured, returns sent/failed/skipped.
- 🔧 `src/lib/leads/createLead.ts` orchestrator: **DB save FIRST** → if it fails, do NOT claim success; duplicate detection (24h, same message + email/phone) → marks `DUPLICATE` (no notify); then Email+Telegram in parallel; computes `notificationStatus` (BOTH_SENT/EMAIL_SENT/TELEGRAM_SENT/PARTIALLY_FAILED/FAILED/PENDING); writes `LeadNotificationLog` + `LeadEvent`; logs failures for admin.
- 🔧 `/api/leads` rewritten: honeypot (silent accept) → tiered rate limit (5/IP/10m, 10/IP/1h, 3/email/1h, 3/phone/1h) → validation → `createLead`. DB-fail → 500 so client shows fallback error.
- 🔧 package.json scripts: `db:generate|migrate|deploy|seed|studio` + `postinstall: prisma generate`.
- ✅ **Verified:** tsc clean, build green; runtime smoke (no DB) — valid→`{ok:true}`, invalid→400, honeypot→silent ok, no crash.
- ⏭️ **Needs real values to go live:** `DATABASE_URL` (+ `prisma migrate`), SMTP creds, Telegram bot token + chat id. Until then: leads validate + dev-fallback log, no persistence.

---

## Milestone 3 — Auth (invite-only) + RBAC 🔧

- 🔧 `src/lib/auth/permissions.ts`: 6 roles + full permission catalog (~90 perms) + per-role assignments (source of truth, mirrors PERMISSION_SYSTEM).
- 🔧 `password.ts` (bcrypt, ≥10 chars), `session.ts` (opaque token, SHA-256 hash in DB, httpOnly cookie, 7-day, revocable; invalidate-all on reset), `rbac.ts` (`getCurrentUser` cached, `userHasPermission`, `requireUser/requirePermission/requireAnyPermission` — server-side enforcement), `audit.ts` (`writeAuditLog`).
- 🔧 `actions.ts` (server actions): login (generic errors, status check, audit), logout, accept-invite (single-use 72h token), request-reset + reset-password (1h token, invalidates sessions), create-invite (admin-only, can't invite super_admin).
- 🔧 `prisma/seed.ts`: seeds permissions, roles, role→permission, and the super admin (`ADMIN_EMAIL`/`ADMIN_PASSWORD`).
- ✅ tsc clean.

## Milestone 4 — Admin panel 🔧

- 🔧 Multiple root layouts via route groups: `(site)/[locale]` (public, per-locale `<html lang>`) + `(admin)/admin` (`<html lang=en>`, noindex). Shared `src/lib/fonts.ts`.
- 🐞 **proxy redirect bug** — middleware would rewrite `/admin/*` → `/hy/admin/*`; excluded `admin` from the matcher.
- 🐞 **static-prerender bug** — panel pages prerendered as login-redirects at build (no DB → `getCurrentUser` short-circuits before `cookies()`); fixed with `export const dynamic = "force-dynamic"` on the panel layout.
- 🐞 `"use server"` file can only export async fns — moved `LEAD_STATUSES` to `lib/leads/constants.ts`.
- 🔧 Auth UI: login / forgot / reset / accept-invite (client forms + `useActionState`) + `/admin/forbidden`. `(panel)` layout: `requireUser` + permission-filtered sidebar + logout.
- 🔧 Pages: **dashboard** (lead/booking widgets + recent audit), **leads** (filterable table → detail with status update, notes, archive — all permission-gated + audited), **bookings**, **users** (list + invite, returns link), **audit-logs**, **content/services/industries** (counts + next-phase note), **settings** (integration status + contacts).
- ✅ **Verified:** build green (all `/admin/*` dynamic); runtime smoke — `/admin/login`→200, `/admin/dashboard` (no session)→307 `/admin/login`, `/admin`→`/admin/dashboard`, site intact.

## Milestone 5 — QA, SEO, polish ✅

- 🐞 ESLint (Next 16 react-hooks rules): ThemeToggle refactored to **CSS-driven icons** (no state/effect/hydration mismatch); Reveal no-IO fallback via rAF; Header ref captured for cleanup. **Lint clean.**
- ✅ SEO already in place: localized metadata + hreflang, JSON-LD, sitemap, robots. Analytics GA4/GTM injector + no-PII events.
- ✅ Project `README.md` (setup, env, db, scripts, structure, deploy).
- ✅ Final `npm run build` green; `npm run lint` clean; `tsc --noEmit` clean.

### Post-launch fixes
- 🐞 React 19 console warning "Encountered a script tag while rendering React component" (ThemeScript). `next/script beforeInteractive` still renders a `<script>` → still warned. **Final fix: removed the inline script entirely** — theme is now applied **server-side from a `menq-theme` cookie** onto `<html data-theme>`, with a `@media (prefers-color-scheme: dark)` CSS fallback for first-visit/no-cookie. ThemeToggle writes the cookie. Result: no script, no flash, persistent preference, no warning. Trade-off: `[locale]` pages are now `ƒ` (dynamic SSR) instead of static, since the layout reads cookies — acceptable for a lead-gen site; revisit with PPR later if static is wanted. Added `data-scroll-behavior="smooth"` to silence Next's scroll hint. Verified: fresh dev log clean (no warnings), `/hy /en /admin/login` all 200.

---

## Phase 2 — productivity + go-live enablement 🔧

- ✅ **Go-live enablement:** `docker-compose.yml` (Postgres 16), generated `AUTH_SECRET`, `.env.local` with local defaults (DB commented so no-DB dev keeps working), `docs/GO_LIVE.md` step-by-step. 🛡️ Hardened `getCurrentUser` with try/catch → returns null (login redirect) if DB configured-but-unreachable instead of crashing.
- ✅ **User management** (`lib/auth/userActions.ts` + users page actions): change role, deactivate (+ kill sessions), reactivate — all guarded (can't touch a super admin or yourself), audited.
- ✅ **Lead assign** (`assignLeadAction` + assignment panel on lead detail) and **CSV export** (`/api/admin/leads/export`, permission-gated, audited, BOM for Excel).
- ✅ **Booking pipeline:** `/api/bookings` (validate + persist, dev-fallback), `lib/bookings/adminActions.ts` (status change + archive), actionable bookings page. Public entry stays Calendly (native public form deferred).
- ✅ **Cookie consent:** trilingual banner shown only when analytics ids are set + no choice yet; **analytics injection is consent-gated** (no GA/GTM cookies/network until accepted).
- ✅ **Verified:** tsc clean, build green (all new routes compile), lint clean.
- 🐞 lint: CSV download `<a>` flagged by `no-html-link-for-pages` → justified disable (file download from API route, not a page nav).

### ⏭️ Remaining (need owner input / next phase)
- Real secrets to go live: `DATABASE_URL`, SMTP, Telegram, GA4 (then `db:migrate` + `db:seed`). `AUTH_SECRET` generated for dev.
- Real brand/contact/certificate values (placeholders in `src/config/*`).
- **Services/Industries full CRUD** — the public site renders these from localized dictionaries; a true CMS needs the public components to read published DB records (with dictionary fallback) + admin create/edit/publish forms. A real integration (~6–8 files), best done as a focused step. Models + permissions already scaffolded.
- Native public booking form (Calendly is the current public path).
- Optional: Turnstile/captcha, shared-store rate limiting (multi-instance), real Lighthouse audit in Chrome.

---

## Phase 2b — Services/Industries CRUD + public integration ✅

- ✅ Nav label "Ինչպես ենք աշխատում" → **"Մոտեցում"** (Approach / Подход) in all 3 locales.
- 🔧 Content server actions (`lib/content/serviceActions.ts`, `industryActions.ts`): create / update / set-status (draft↔published↔archived), permission-gated (services|industries .create/.edit/.publish/.archive), audited. Soft status workflow (no hard delete, per spec).
- 🔧 Admin CRUD UI: services & industries **list** (status + publish/archive/to-draft actions), **new**, **edit** pages with reusable `ServiceForm`/`IndustryForm` + server-rendered field helpers.
- 🔧 **Public integration:** `ServiceBlocks` + `Industries` are now async and read **published** DB rows for the locale via `lib/content/publicContent.ts`, falling back to the localized dictionary when there's no DB / nothing published / a DB error. So publishing in admin updates the landing page; default copy shows otherwise.
- ✅ **End-to-end verified with real Postgres** (docker compose, port 5433 to avoid a local 5432 install; `migrate` + `seed` → 88 permissions, 6 roles, super admin):
  - Published services/industries render on `/hy` (DBTEST content appeared; dict block text only in serialized RSC props, not visible).
  - Admin authenticated render works: `/admin/dashboard` → 200 with the real user ("Welcome … Super Admin").
  - Test data + temp scripts cleaned up afterward; DB left clean (roles/permissions/super-admin only).
- ✅ tsc clean, build green (all CRUD routes), lint clean.
- 🐞 docker Postgres on 5432 clashed with a local Postgres install → moved to host port **5433** (compose + `.env.local` + GO_LIVE updated).

**The full stack now runs locally** (`docker compose up -d` → migrate → seed → `npm run dev` → sign in at `/admin/login`).

---

## Phase 2c — Bilingual admin panel (HY / EN) ✅

- 🔧 Admin dictionaries `src/content/admin/{hy,en}.ts` (canonical HY, EN derived from `typeof`), covering nav, auth, dashboard, leads, lead detail, users, bookings, services, industries, content, settings, audit, all status enums (lead/booking/content/user), and role names.
- 🔧 `lib/adminI18n.ts`: `getAdminLocale`/`getAdminDict` (cached, cookie `menq-admin-locale`, default HY). `AdminLangSwitcher` (ՀԱՅ/ENG, sets cookie + reload) in the panel header and on the auth shell.
- 🔧 Wired **every** admin surface through the dictionary: panel layout + sidebar (localized nav + role), all panel pages, `StatusPill` localized labels, `ServiceForm`/`IndustryForm`/`InviteForm` (props), auth pages + client forms, and **localized server-action error messages** (login/invite/reset).
- 🐞 build: server-only `adminI18n` (next/headers) leaked into the client bundle via `authForms → AuthShell` → split `AuthError`/`AuthNotice` into client-safe `AuthFeedback.tsx`.
- 🐞 lint: React-compiler `react-hooks/immutability` flagged `document.cookie =` in the switcher → moved to a plain `lib/clientCookie.ts` util.
- ✅ **Verified at runtime:** `/admin/login` and `/admin/dashboard` render correctly in HY (default) and EN (cookie); switcher present; no language leakage. tsc + build + lint all clean.

---

## Phase 3 — Production hardening, OG, Docker, perf ✅

- 🔧 **next.config**: security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy), `poweredByHeader: false`, `reactStrictMode`. `output: "standalone"` made **conditional** (`BUILD_STANDALONE=true`, set only by the Dockerfile) — it breaks `next start` otherwise. Verified headers present in prod.
- 🔧 **Dynamic OG image** (`opengraph-image.tsx`): branded 1200×630 social card via `next/og`; auto-wires `og:image` + `twitter:image`.
  - 🐞 Satori "every multi-child `<div>` needs display:flex" → restructured the headline into flex columns. Now serves `200 image/png`.
- 🔧 **Dockerfile** (multi-stage, standalone) + `.dockerignore` + Prisma `binaryTargets` (added `linux-musl-openssl-3.0.x` for Alpine). Vercel remains the recommended path.
- 🔧 **Test notification** in admin Settings (Super Admin): `sendTestNotificationAction` fires Email + Telegram and shows per-channel result (sent/failed/skipped) — lets the owner verify SMTP/Telegram once secrets are added. Audited.
- 🔧 **Mobile sticky CTA** on the landing — hides itself while the lead form is on screen (single IntersectionObserver).
- ⚡ **Perf pass:** replaced ~50 per-card `Reveal` client components with **one shared `RevealController`** observer + a universal (zero-JS) `Reveal`; hero now uses a transform-only on-load `animate-rise` (opacity stays 1 → LCP-safe) instead of opacity reveal.
- ✅ **Lighthouse (local prod):** **Accessibility 100 · Best Practices 100 · SEO 100 · CLS 0**, no render-blocking resources, fonts `display: swap`. Performance ~72–78 numeric — depressed by running headless Chrome on the same box as Docker Postgres + the Next server (FCP varied 1.4↔2.2s across identical runs = contention). Deterministic, code-controlled signals are all green; production (Vercel CDN + real client) will score materially higher.
- ✅ build green · lint clean · tsc clean.

---

## Phase 3b — Editable landing content (the "next phase", now real) ✅

The Content admin page is no longer a placeholder — all main landing sections are editable per language, published content overrides the dictionary.

- 🔧 `config/sectionContent.ts`: schema for 9 sections (hero, pain, solution, success, results, ai, process, trust, cta) — field defs (text / textarea / stringList / cardList with fixed counts matching the design).
- 🔧 `getSectionData(type, locale, fallback)`: shallow-merges a published `ContentItem` override over the dictionary section; falls back cleanly (no DB / nothing published / error).
- 🔧 `sectionActions.ts`: schema-driven `saveSection` (upsert by type+language, parses fixed-row card/list fields from FormData) + `setSectionStatus` (draft/publish/archive), permission-gated + audited.
- 🔧 One generic `SectionContentForm` renders any section from its schema, pre-filled from the current override **or** the dictionary; admin **content list** (status + published languages) + **edit page** (per-language tabs HY/EN/RU + publish/archive). Fully bilingual admin chrome.
- 🔧 Wired all 9 public section components to `getSectionData` (made async; dictionary fallback preserved).
- ✅ **Verified end-to-end with Postgres:** published a hero override → it rendered on `/hy`; `/en` (no override) kept the default dictionary copy (per-language). tsc + build + lint clean. Test data cleaned up.

---

## Phase 4 — Pre-user-test QA pass (3-agent review + fixes) ✅

Ran 3 parallel review agents (public / admin / backend-security) over the whole codebase. Fixed all real bugs found; documented the rest as gaps.

**Security/data fixed:**
- 🐞 **CSV formula injection** in leads export — cells starting with `= + - @ \t \r` are now prefixed with `'`.
- 🐞 **Secret/PII leak in error logs** — `String(error)` (could contain DB DSN / SMTP host) replaced with `errSummary()` (code/name only) in createLead, bookings route, email, telegram.
- 🐞 **/api/bookings had no spam protection** — added honeypot + per-IP rate limiting.
- 🐞 Invite could **re-activate a suspended/deactivated** account → blocked.
- 🐞 Password reset was offered to non-ACTIVE accounts → gated on ACTIVE.

**Admin correctness fixed:**
- 🐞 Status dropdown → `ARCHIVED` now also sets `archivedAt`/`archivedById` (lead) and `archivedAt` (booking).
- 🐞 `reactivateUserAction` now blocks self-target (consistency).
- 🔧 Admin lead list/detail show the **localized solution label** (e.g. "CRM համակարգ") instead of the raw value ("crm").

**Public fixed:**
- 🐞 Header **desktop CTA** was a bare `#consultation-form` (dead on legal pages) → `/{locale}#...`.
- 🐞 Theme toggle showed the wrong icon on a **dark-OS first visit** (no cookie) → CSS media rule flips it.
- 🔧 Removed the redundant/confusing **consent checkbox** (the submit note already states consent); send `consent: true`.
- 🔧 Language switch now writes the `menq-locale` cookie so `/` remembers the choice.
- 🔧 DB-override **React key collisions** guarded — list keys are index-based.
- ✅ tsc + build + lint clean.

### Documented GAPS (intentional / need owner) — see report to user
- Real contact/brand data (placeholders) — owner must provide before/with the test.
- Submit-for-review / approval workflow (editor + moderator roles) — Phase 2; super admin publishes directly for now.
- FAQ not yet editable from admin; no native public booking form (Calendly placeholder).
- `error.tsx` English-only; no CSP header; set `NEXT_PUBLIC_APP_URL` for correct canonical/OG on deploy.

### Fix — dead nav links on legal pages
- 🐞 On `/[locale]/privacy|terms|cookies`, Header/Footer nav used in-page anchors (`#solutions`, `#consultation-form`, …) that only exist on the landing page, so clicks did nothing (only "Back to home" worked). Made all Header + Footer anchor links absolute to the landing page — `/{locale}#anchor` — so they work everywhere (same-page scroll on the landing, navigate-then-scroll elsewhere). Verified: `/hy/terms` now emits `/hy#solutions`, `/hy#consultation-form`; tsc clean.
