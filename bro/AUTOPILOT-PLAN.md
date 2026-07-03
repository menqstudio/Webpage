# AUTOPILOT-PLAN - MENQ

> The daily autopilot dispatches this project's Bro (BOUNDED) to do the next unchecked '- [ ]' task here:
> own branch autopilot/continue, local commit, NEVER push. Idempotent. Gev's WIP is auto-set-aside + restored;
> the ONLY thing reserved for Gev is push.

## PENDING

- [ ] **i18n/token hygiene** — wire the localized OG alt (`dict.meta.ogImageAlt`) in `opengraph-image.tsx`;
      move the hero "live" chip + `HeroVisual` strings into the dictionary; add a `2xs` font-size token to
      replace the `text-[0.7rem]` arbitraries; add a proper "Main navigation" aria-label key (both `<nav>`
      landmarks reuse `nav.home`); remove/​wire dead keys `common.ctaSecondary`, `footer.builtNote`. Verify: tsc + build.
- [ ] **Public a11y polish** — cookie banner `role="region"` + label (`CookieConsent.tsx`); move focus to the
      success heading on lead-form submit (`LeadForm.tsx`); render the skip-to-content link on legal pages too
      (`LegalPage.tsx`, it already has `main#main`). Verify: keyboard walkthrough + build.
- [ ] **Notification retry action** — the `RETRY_PENDING` enum is modeled but unused. Add an admin server
      action that re-sends Email+Telegram for a failed/pending lead and updates `notificationStatus`
      (reuse the createLead notify pipeline); surface a "Resend" button on the lead detail page. Permission-gated + audited.

> Bigger / needs-a-decision (NOT autopilot-bounded — flag to Gev): distributed rate limiter
> (Redis/Upstash or Turnstile) for true multi-instance serverless; native public booking form;
> full editor→moderator submit-review approval workflow.

## DONE

- [x] **Auth niceties (2026-07-03)** — (a) **24h idle-timeout** done migration-free (no schema change, so no
      Gev-gated migrate): the existing `Session.expiresAt` is now a sliding idle deadline capped by the
      absolute max, derived from `createdAt`. New pure `sessionPolicy.ts` (`sessionExpiry`, env-driven at call
      time) + `refreshSessionActivity` in `session.ts` that slides the deadline on activity, throttled to one
      write per ~5min; `getCurrentUser` calls it. New `SESSION_IDLE_TIMEOUT` env (default 86400s) documented
      in `.env.example` + ENV_AND_SECRETS. (b) **Single-use atomic tokens**: invite + reset now consume via a
      conditional `updateMany({where:{id, acceptedAt/usedAt:null, expiresAt:{gt:now}}})` + `count===0` guard
      *before* mutating the account/password, so concurrent/replayed submits can't double-apply. (c)
      **`permission.denied` audit**: `requirePermission`/`requireAnyPermission` now `writeAuditLog` (with the
      required permission in metadata) before redirecting to /admin/forbidden. Added 5 unit tests for the
      session-lifetime policy (idle window, absolute cap clamp, env overrides, invalid-env fallback). Verify:
      tsc ✅, eslint ✅, `npm test` 24/24 ✅, prod `next build` ✅.
- [x] **Analytics wiring (2026-07-03)** — wired 6 of the 7 defined-but-unused events, consent-gated by
      design (gtag/dataLayer only exist after cookie consent). New client `TrackedLink` fires events from
      server components without turning the tree client-side; extracted `buttonClasses` from `Button.tsx`
      so tracked CTAs reuse the exact button tokens (no hardcode). Events: `cta_click` (Hero primary/secondary,
      Header desktop+mobile, MobileStickyCTA — with a `location` prop), `contact_button_click` (phone/email/
      telegram/whatsapp, `method` prop), `booking_click` (Calendly), `faq_open` (on open only, `position`),
      `language_switch` (on actual switch only, `from`/`to`), `lead_form_start` (first form focus). Metadata
      only — never PII. `service_card_click` left unused on purpose: service cards aren't navigational links,
      so instrumenting them would add a click handler to a non-interactive element (a11y regression). Verify:
      tsc ✅, eslint ✅, `npm test` 19/19 ✅, prod `next build` ✅.
- [x] **Post-audit hardening pass (2026-07-02)** — 4-agent Fable-5 audit (public/admin/backend/gap), then
      fixed everything not blocked on owner data/secrets, on branch `autopilot/continue`, 4 local commits:
  - [x] **Batch 1 security** (`5f5e6aa`) — admin-tier privilege guards (invite/role-change/deactivate/reactivate);
        login throttle + dummy-bcrypt anti-enumeration; trusted-IP `clientIp` (TRUSTED_PROXY_COUNT) vs spoofable XFF;
        seed refuses default password in prod.
  - [x] **Batch 2 robustness** (`73116a3`) — Telegram/SMTP timeouts; no-DB lead logged (not dropped); 50KB
        body guard + UTM sanitize; `/api/bookings` now notifies; P2025/P2003 swallow on admin mutations;
        Editor governance (non-publisher edit → DRAFT; section edit accepts `content.edit_assigned`).
  - [x] **Batch 3 public/SEO/legal/a11y** (`942f330`) — legal-page canonicals + x-default + sitemap alts;
        consent text on the form; softened cert wording (3 locales); drawer focus-trap; localized error/404 +
        catch-all route; robots-meta cleanup (noindex stands alone on 404).
  - [x] **Batch 4 hardening** (`fa85e81`) — CSP header; proxy `/admin` session gate; rate-limiter eviction;
        dropped unused `jose`; `.env.example` reconciled; RELEASE/SMOKE checklists filled; vitest + 19 tests.
  - [x] Verified: tsc ✅, lint ✅, `npm test` 19/19 ✅, production `next build` ✅, prod smoke ✅.
        Reserved for Gev: `git push` + owner data/secrets/deploy.
