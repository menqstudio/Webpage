# APP AUDIT MASTER — the production-readiness audit standard / APP AUDIT MASTER — production-readiness աուդիտի ստանդարտ

> **EN:** This is Bro's canonical, evidence-first standard for auditing a real application before release. It is the **standard** — what "good" means. Its partner file `APP_AUDIT_REPORT_TEMPLATE.md` is the **proof** — the current project's state filled in with evidence. The **release decision comes only from the evidence**, never from the checklist alone.
>
> **HY:** Սա Bro-ի canonical, evidence-first ստանդարտն է՝ իրական application-ը release-ից առաջ audit անելու համար։ Սա **ստանդարտն** է — ինչ է նշանակում «լավը»։ Զույգ ֆայլը՝ `APP_AUDIT_REPORT_TEMPLATE.md`-ն, **ապացույցն** է — project-ի ընթացիկ վիճակը լցված evidence-ով։ **Release-ի որոշումը գալիս է միայն evidence-ից**, երբեք միայն checklist-ից։

> **Adopted into Bro (2026-07-02).** Governed by SuperBro (L10 — only SuperBro strengthens; delivered to projects via `bro-docs`, never authored project-local). Held to Bro's laws: **L0** bilingual · **L13** ZERO HARDCODE (this audit actively hunts hardcoded design values and untranslated strings) · **no-evidence-no-GREEN** (mirrors Bro's audit seal) · the **completeness law** (nothing slips through uncovered — from the `auditing` skill).
>
> **Ընդունված Bro-ի մեջ (2026-07-02)։** Կառավարվում է SuperBro-ով (L10 — միայն SuperBro-ն ուժեղանում; delivered project-ներին `bro-docs`-ով, երբեք project-local հեղինակված)։ Պահվում Bro-ի օրենքներով՝ **L0** երկլեզու · **L13** ZERO HARDCODE (այս audit-ը ակտիվ որսում է hardcode դիզայնի արժեքներ ու չթարգմանված string-եր) · **no-evidence-no-GREEN** (հայելի Bro-ի audit seal-ի) · **completeness law**-ը (ոչինչ չծածկված չի սահում — `auditing` skill-ից)։

---

## 0. The relationship / Հարաբերությունը

**EN:**
- **Master checklist (this file)** = defines the standard. Reusable, versioned, one source of truth.
- **Audit report (the template)** = proves the current project's state with concrete evidence.
- **Release decision** = allowed only from evidence, never from the checklist alone.

**HY:**
- **Master checklist (այս ֆայլը)** = սահմանում է ստանդարտը։ Reusable, versioned, մեկ ճշմարտության աղբյուր։
- **Audit report (template-ը)** = ապացուցում է project-ի ընթացիկ վիճակը կոնկրետ evidence-ով։
- **Release decision** = թույլատրվում է միայն evidence-ից, երբեք միայն checklist-ից։

---

## 1. How to use / Ինչպես օգտագործել

**EN — three modes:**
1. **Planning mode** — before/early in the build. Use the dimensions to define roles, permissions, business flows, the main lifecycle, critical entities, data ownership, validation rules, and the release gate. Output: role list, permission matrix, flow map, entity map, MVP minimums.
2. **Audit mode** — before release, on the running app + repo. Run the automated checks, drive the flows as real users, hard-test permissions and direct-API bypass, verify data/DB/business rules, collect evidence, produce the report + verdict.
3. **AI-run mode** — dispatch a Bro/agent with §12 (the AI-run prompt): audit section by section, evidence-first, no GREEN without proof.

**HY — երեք ռեժիմ.**
1. **Planning ռեժիմ** — build-ից առաջ/վաղ։ Dimension-ներով սահմանիր role-երը, permission-ները, business flow-երը, main lifecycle-ը, critical entity-ները, data ownership-ը, validation rule-երը, ու release gate-ը։ Output՝ role list, permission matrix, flow map, entity map, MVP minimum-ներ։
2. **Audit ռեժիմ** — release-ից առաջ, աշխատող app-ի + repo-ի վրա։ Վազացրու automated check-երը, drive արա flow-երը որպես իրական user, hard-test արա permission-ներն ու direct-API bypass-ը, verify արա data/DB/business rule-երը, հավաքիր evidence, արտադրիր report + verdict։
3. **AI-run ռեժիմ** — dispatch արա Bro/agent §12-ով (AI-run prompt)՝ audit արա բաժին-առ-բաժին, evidence-first, ոչ մի GREEN առանց ապացույցի։

---

## 2. The final rule (read first, applies to everything) / Վերջնական կանոն (կարդա առաջինը, կիրառվում է ամեն ինչի)

**EN:**
- No evidence → no GREEN. A verdict without a working paper is an opinion, not an audit.
- Frontend-only permission → not security. The button being hidden is not authorization.
- Build fails → not production-ready. Full stop.
- Main business flow can't complete → the app is not ready.
- No backup / rollback → production release is a risk.
- Tenant isolation failure (SaaS / multi-company) → P0 → NO-GO.
- Any P0 → NO-GO.
- Hardcoded design value or untranslated user-facing string (L13) → a DEFECT, logged as a finding.
- Close every audit with an explicit **coverage / "what was NOT covered" + residual-risk** statement (completeness law) — a silent gap is the worst failure.

**HY:**
- Evidence չկա → GREEN չկա։ Verdict առանց working paper-ի opinion է, ոչ audit։
- Միայն frontend permission → security չէ։ Կոճակը թաքցնելը authorization չէ։
- Build-ը fail → production-ready չէ։ Ամբողջ վերջ։
- Main business flow-ը չի ավարտվում → app-ը ready չէ։
- Backup / rollback չկա → production release-ը ռիսկ է։
- Tenant isolation failure (SaaS / multi-company) → P0 → NO-GO։
- Ցանկացած P0 → NO-GO։
- Hardcode արած դիզայնի արժեք կամ չթարգմանված user-facing string (L13) → ԴԵՖԵԿՏ, գրանցվում որպես finding։
- Փակիր ամեն audit-ը բացահայտ **coverage / «ինչ ՉԻ ծածկվել» + residual-risk** statement-ով (completeness law) — լուռ gap-ը ամենավատ ձախողումն է։

---

## 3. Scoring, status, severity / Score, status, severity

### 3.1 Score (0–5) per dimension / Score (0–5) ամեն dimension-ի

| Score | EN | HY |
|---|---|---|
| 0 | Not checked / no evidence | Չստուգված / evidence չկա |
| 1 | Checked, failed / blocker present | Ստուգված, failed / blocker կա |
| 2 | Partial / weak / few sides covered | Մասնակի / թույլ / քիչ կողմ ծածկված |
| 3 | Acceptable / MVP-level pass | Ընդունելի / MVP-level pass |
| 4 | Strong / production-ready, minor improvements | Ուժեղ / production-ready, փոքր բարելավումներ |
| 5 | Production-grade / evidence + tests + ownership + release confidence | Production-grade / evidence + test + ownership + release վստահություն |

### 3.2 Status (GREEN / YELLOW / RED) — decision rules / Status — որոշման կանոններ

**GREEN (EN):** 0 P0, 0 unresolved P1, build+typecheck+lint pass, main flow completes, auth+permission+security minimums pass, no known data-loss risk, backup/rollback exists (if prod), evidence present for every critical dimension.
**YELLOW (EN):** 0 P0, but a P1 with documented risk acceptance (owner + deadline); main flow works with non-critical gaps; some tests/docs/UX gaps, no blockers.
**RED (EN):** any P0; or build fails; or auth/permission bypass; or data-loss risk; or main flow can't complete; or secrets exposed; or unsafe migration; or no backup/rollback for a prod release.

**GREEN (HY):** 0 P0, 0 չլուծված P1, build+typecheck+lint pass, main flow-ն ավարտվում է, auth+permission+security minimum-ները pass, data-loss ռիսկ չկա, backup/rollback կա (եթե prod), evidence կա ամեն critical dimension-ի։
**YELLOW (HY):** 0 P0, բայց P1՝ documented risk acceptance-ով (owner + deadline). main flow-ն աշխատում է non-critical gap-երով. որոշ test/doc/UX gap, blocker չկա։
**RED (HY):** ցանկացած P0. կամ build fail. կամ auth/permission bypass. կամ data-loss ռիսկ. կամ main flow-ը չի ավարտվում. կամ secret-ներ բացահայտ. կամ unsafe migration. կամ prod release-ի համար backup/rollback չկա։

**Mapping / Քարտեզագրում:** GREEN → GO · YELLOW → GO WITH RISK or NO-GO (by P1 impact) · RED → NO-GO. **If any P0 exists, the final status can never be GREEN or YELLOW — it is RED and NO-GO. / Եթե P0 կա, վերջնական status-ը երբեք GREEN/YELLOW չի կարող լինել — RED է ու NO-GO։**

### 3.3 Severity (P0–P3) = likelihood × impact / Severity = likelihood × impact

| Priority | Meaning EN | Meaning HY |
|---|---|---|
| P0 | Blocking / production stopper | Blocking / production-ը կանգնեցնող |
| P1 | Must fix before real users | Պիտի fix լինի իրական user-ներից առաջ |
| P2 | Should fix soon | Պիտի fix լինի շուտով |
| P3 | Nice to have / polish | Լավ կլինի / polish |

**Severity bands (EN):** Critical = data loss, security hole, auth bypass, prod crash · High = major broken flow, permission risk, serious blocking bug · Medium = important but has a workaround · Low = polish, copy, minor visual. Calibrate to likelihood × impact — neither inflated nor deflated.
**Severity bands (HY):** Critical = data loss, security hole, auth bypass, prod crash · High = լուրջ կոտրված flow, permission ռիսկ, լուրջ blocking bug · Medium = կարևոր, բայց workaround կա · Low = polish, copy, մանր visual. Calibrate արա likelihood × impact-ով — ոչ inflated, ոչ deflated։

### 3.4 MUST / SHOULD / NICE / MUST / SHOULD / NICE

- **[MUST]** release cannot ship without it → a failed MUST = P0 or P1. / release-ը առանց դրա չի ship լինում → failed MUST = P0 կամ P1։
- **[SHOULD]** should fix soon, not a blocker → failed SHOULD = P1 or P2. / պիտի fix լինի շուտ, blocker չէ → failed SHOULD = P1 կամ P2։
- **[NICE]** polish / optional quality → failed NICE = P3. / polish / optional որակ → failed NICE = P3։

---

## 4. The canonical audit dimensions / Canonical audit dimension-ները

> **EN:** The de-duplicated, complete dimension set. Each is `[MUST/SHOULD/NICE] Dimension — what to verify · how to evidence`. Conditional dimensions (marked `⟂`) apply only when the feature exists (skip = N/A, and say so — completeness law). Adapt depth per the app-type profile (§6). **This list is the single source of truth for dimensions — there is exactly one.**
>
> **HY:** De-dup արված, ամբողջական dimension set-ը։ Ամեն մեկը՝ `[MUST/SHOULD/NICE] Dimension — ինչ verify անել · ինչպես evidence անել`։ Conditional dimension-ները (`⟂` նշված) կիրառվում են միայն երբ feature-ը կա (skip = N/A, ու ասա — completeness law)։ Խորությունը հարմարեցրու app-type profile-ով (§6)։ **Այս ցուցակը dimension-ների միակ ճշմարտության աղբյուրն է — ուղիղ մեկ։**

### A — Product & Experience / Product & Experience

1. **[MUST] Product / Business logic** — the app solves a clear problem for defined users/roles; the main business flow works end-to-end; each feature is in-scope for the MVP or explicitly deferred. *Evidence: flow walkthrough, scope doc.* / app-ը լուծում է հստակ խնդիր սահմանված user/role-երի համար. main business flow-ն աշխատում է end-to-end. ամեն feature MVP-ի մեջ է կամ բացահայտ հետաձգված։ *Evidence՝ flow walkthrough, scope doc։*
2. **[MUST] User flows** — login, logout, create/edit/delete, approve/reject, assign, status-change, search/filter, export/import — each: right user reaches, validation + confirmation + success/error states, cancel is safe, data survives refresh. *Evidence: per-flow manual test.* / ամեն flow՝ ճիշտ user հասնում է, validation + confirmation + success/error state, cancel-ը անվտանգ, data-ն refresh-ից հետո մնում է։ *Evidence՝ per-flow manual test։*
3. **[MUST] Functional behavior** — buttons/links/forms/tables/filters/search/sort/pagination/modals/upload/export all work; no broken page, blank screen, or endless loading. *Evidence: functional pass.* / բոլորն աշխատում են. broken page, blank screen, endless loading չկա։ *Evidence՝ functional pass։*
4. **[SHOULD] UI / UX** — clear title + purpose per screen; primary action obvious; consistent buttons/labels/tables; empty/loading/error/success/confirm states present; no clutter; destructive actions confirmed. *Evidence: screenshots per state.* / հստակ title + purpose. primary action ակնհայտ. consistent. empty/loading/error/success/confirm state-եր. destructive action-ները confirm-ով։ *Evidence՝ screenshot ամեն state-ի։*
5. **[SHOULD] Responsive** — desktop/laptop/tablet/mobile: sidebar collapses, tables usable, forms comfortable, modal/drawer fits, no unwanted horizontal scroll. *Evidence: mobile screenshots of main flow.* / desktop/laptop/tablet/mobile՝ usable, չցանկալի horizontal scroll չկա։ *Evidence՝ main flow-ի mobile screenshot։*
6. **[SHOULD] Accessibility** — keyboard nav + tab order + focus states; buttons have readable text/aria-label; form labels bound; color contrast passes; modal focus-trapped; screen-reader can reach critical controls. *Evidence: keyboard walkthrough, contrast check.* / keyboard nav, focus, aria-label, label binding, contrast, focus-trap։ *Evidence՝ keyboard walkthrough, contrast check։*
7. **[NICE] Browser compatibility** — Chrome/Edge/Safari/Firefox: login, forms, tables, date picker, upload, print/export, layout. *Evidence: per-browser check.* / Chrome/Edge/Safari/Firefox։ *Evidence՝ per-browser check։*

### B — Security & Access / Security & Access

8. **[MUST] Authentication** — login works; wrong password → safe error; logout closes the session; protected routes redirect when unauthenticated; expired session handled; back-button after logout does not re-enter the app. *Evidence: direct `/admin` + `/dashboard` while logged out, back-after-logout, expired/wrong token.* / login, safe error, logout session փակում, protected redirect, expired handle, back-after-logout։ *Evidence՝ logged-out direct route, expired/wrong token։*
9. **[MUST] Authorization / permissions** — enforced on the backend, not just hidden buttons; a low-permission user is blocked via **direct API request**; a user cannot read/edit another's record by changing the ID (IDOR); role change refreshes permissions. *Evidence: viewer PATCH `/api/x/:id` → 403; user A opens B's record ID → blocked.* / enforced backend-ում, ոչ միայն թաքցրած կոճակ. direct API request-ով blocked. ID փոխելով ուրիշի record չի բացվում (IDOR). role change → permission refresh։ *Evidence՝ viewer PATCH → 403, A-ն B-ի ID → blocked։*
10. **[MUST] Security** — XSS escaped; SQL-injection blocked; CSRF protected (cookie auth); login + critical-API rate limits; file-upload validation; no secrets in the frontend bundle; `.env` not committed; admin API protected; sensitive errors hidden (no stack trace/secret); HTTPS in prod. *Evidence: inject `<script>`, `' OR 1=1 --`, path traversal; secret scan; view-source.* / XSS, SQLi, CSRF, rate-limit, upload-validation, no frontend secret, `.env` not committed, admin protected, safe errors, HTTPS։ *Evidence՝ inject payload-ներ, secret scan, view-source։*
11. **[MUST] Data validation** — required fields, email/phone/date/number formats, negatives blocked where invalid, no duplicates, long/special/Armenian/emoji text handled — enforced on **both** frontend (UX) and backend (protection). *Evidence: bad inputs on API directly.* / required, format, negative, duplicate, long/special/հայերեն/emoji — enforced ԵՐԿՈՒՍՈՒՄ էլ (frontend UX + backend protection)։ *Evidence՝ bad input ուղիղ API-ին։*
12. **⟂[MUST] Tenant / multi-company isolation** *(SaaS / multi-tenant only)* — tenant A cannot read/export/search tenant B's data; every query, export, report, file URL, background job, cache key, and realtime event is tenant-scoped. **Failure = P0 = NO-GO.** *Evidence: A opens B's record ID via API → blocked; A's export excludes B.* / tenant A-ն չի կարդում/export/search անում B-ի data. ամեն query/export/report/file/job/cache tenant-scoped։ **Failure = P0 = NO-GO։** *Evidence՝ A-ն B-ի ID-ով → blocked, A-ի export-ը B-ին բացառում է։*
13. **[SHOULD] Data ownership / privacy** — sensitive/personal/financial fields identified; role-based (and where needed field-level) visibility; export/search/logs/API responses do not leak restricted fields; retention rule where required. *Evidence: viewer export, low-role API response inspection.* / sensitive field-երը identify. role-based visibility. export/search/log/API չեն leak անում restricted field. retention rule։ *Evidence՝ viewer export, low-role API response։*

### C — Data & API / Data & API

14. **[MUST] Database / data integrity** — required columns non-nullable; foreign keys + unique constraints present; status values controlled; created/updated (+ deleted, if soft delete) + audit fields; migrations ordered; **no seed/demo data in production**; no orphan/duplicate critical records. *Evidence: schema check, constraint list, orphan query.* / non-nullable, FK + unique, controlled status, timestamps + audit fields, migration-ներ, prod-ում seed/demo չկա, orphan/duplicate չկա։ *Evidence՝ schema, constraint, orphan query։*
15. **[MUST] API contract** — per endpoint: auth + permission + request validation; consistent response; correct 400/401/403/404/409/422/429/500; 500 leaks no secret/stack; pagination on lists; filtering/sorting/search are backend + permission-aware; sensitive fields not returned. *Evidence: per-endpoint request/response tests.* / ամեն endpoint՝ auth + permission + validation, ճիշտ status code-եր, safe 500, pagination, backend permission-aware filter, no sensitive field։ *Evidence՝ per-endpoint request/response test։*
16. **[MUST] Business rule enforcement** — critical rules enforced in **backend** (and DB constraints where correctness-critical), not just UI; invalid state cannot be created via direct API; a workflow cannot skip a required step. *Evidence: e.g. create order without lead_id → 400/422; skip gate → blocked.* / critical rule-երը enforced backend-ում (+ DB constraint), ոչ միայն UI. invalid state direct-API-ով չի ստեղծվում. workflow-ը required step չի skip անում։ *Evidence՝ order առանց lead_id → 400/422։*
17. **[MUST] Lifecycle / status** — statuses documented; labels single-sourced (not hardcoded in components); a transition map exists; illegal transitions blocked on the backend (backend checks the previous status); status changes are audit-logged and trigger correct side effects. *Evidence: attempt an illegal transition via API → blocked.* / status-ները documented, single-sourced label, transition map, illegal transition backend-ում blocked, audit-logged, side-effect-ներ։ *Evidence՝ illegal transition API-ով → blocked։*

### D — Architecture & Code / Architecture & Code

18. **[SHOULD] Architecture** — documented, tidy folder structure; clear feature boundaries; business logic in a service/use-case layer, not in components; centralized auth/permission/validation; shared vs feature-specific components separated; a new dev can navigate in ~20 min. *Evidence: structure map, layering review.* / documented, feature boundary, business logic service-layer-ում, centralized auth/permission/validation։ *Evidence՝ structure map, layering review։*
19. **[SHOULD] Codebase cleanliness** — consistent style + naming; components/functions not oversized; API calls not copy-pasted; constants/permission/validation logic centralized. *Evidence: lint output, spot review.* / consistent, ոչ oversized, ոչ copy-paste, centralized constants։ *Evidence՝ lint, spot review։*
20. **[SHOULD] Dead code** — no unused files/components/functions/vars/imports/CSS/routes/endpoints/config; no commented-out/legacy/backup blocks. *Evidence: `npx knip`, `npx depcheck`, keyword scan.* / չկա unused/commented-out/legacy/backup։ *Evidence՝ `knip`, `depcheck`, keyword scan։*
21. **[SHOULD] Duplicate code** — UI blocks, validation, API calls, constants, permission checks not duplicated; `role === "admin"` scattered → replace with `canX(user)` / `ROLES.ADMIN`. *Evidence: duplication grep.* / չկրկնված UI/validation/API/constant/permission. `role === "admin"` scattered → `canX(user)`։ *Evidence՝ duplication grep։*
22. **[MUST] Type safety** *(typed stacks)* — no stray `any`/`as any`; `@ts-ignore`/`@ts-expect-error` justified; props, API responses, forms, route params, status values typed; null/undefined handled. *Evidence: `tsc --noEmit`, keyword scan.* / no `any`, justified ignore, typed props/response/form/params, null-handled։ *Evidence՝ `tsc --noEmit`, keyword scan։*
23. **[SHOULD] Dependency health** — no unused/vulnerable/outdated/duplicate libraries; lockfile in sync; no dev-dep leaking to prod. *Evidence: `npm audit`, `npm outdated`, `depcheck`.* / no unused/vulnerable/outdated/duplicate, lockfile sync։ *Evidence՝ `npm audit`, `outdated`, `depcheck`։*
24. **[MUST] Config / environment** — `.env` not committed; `.env.example` present; required env documented; no hardcoded API URL; no `localhost`/`127.0.0.1` in prod; no secrets in the frontend bundle. *Evidence: repo scan, bundle inspect.* / `.env` not committed, `.env.example`, documented env, no hardcoded URL/localhost, no bundle secret։ *Evidence՝ repo scan, bundle inspect։*
25. **[MUST] Hardcode / tokens (L13)** — **ZERO hardcode**: every design value (color, spacing, radius, typography, shadow, z-index, motion, breakpoint) via a **design token**; every user-facing string via an **i18n/language token**; every role/status/route via a constant. A hardcoded design value or inline user-facing literal is a **DEFECT**. Theme-switch and language-switch must be provably complete. *Evidence: grep for hex colors, px literals, inline strings, `role ===`, `status ===`.* / **ZERO hardcode**՝ ամեն design value design-token-ով, ամեն user-facing string i18n-token-ով, ամեն role/status/route constant-ով. hardcode = ԴԵՖԵԿՏ. theme/language switch ապացուցելիորեն ամբողջական։ *Evidence՝ grep hex/px/inline-string/`role ===`։*
26. **[MUST] Mock / demo / test data** — no fake users, demo customers, mock API, hardcoded cards, lorem, sample invoices, test credentials, or dummy/seed data in production. *Evidence: keyword scan, prod DB spot check.* / prod-ում չկա fake/demo/mock/lorem/test-credential/dummy/seed։ *Evidence՝ keyword scan, prod DB spot check։*
27. **[SHOULD] State management** — global holds only truly-global data; server state cached correctly; consistent loading/error states; no duplicate state; critical state survives refresh; no race conditions. *Evidence: refresh + concurrent-action test.* / global-ը միայն global, server-state cache, no duplicate state, refresh-safe, no race։ *Evidence՝ refresh + concurrent test։*
28. **[SHOULD] Page-by-page coverage** — every page: route, module, primary action, permission, loading/empty/error states, mobile — audited individually (not just the happy path). *Evidence: per-page rows in the report.* / ամեն էջ առանձին՝ route/module/action/permission/states/mobile։ *Evidence՝ per-page row report-ում։*
29. **[SHOULD] Component-level** — reusable components: token-based, typed props, a11y, responsive, no duplicate variants, no business logic inside pure UI. *Evidence: per-component rows.* / reusable՝ token-based, typed, a11y, responsive, no duplicate, no business logic UI-ում։ *Evidence՝ per-component row։*

### E — Operations & Release / Operations & Release

30. **[SHOULD] Performance** — fast first load; reasonable bundle; large tables paginated (don't kill the browser); images optimized; no duplicated API calls; search debounced; expensive calcs memoized; lazy-load heavy sections; no unnecessary re-renders. *Evidence: load test, network trace.* / արագ load, pagination, optimized image, no duplicate API, debounce, memoize, lazy-load։ *Evidence՝ load test, network trace։*
31. **[MUST] Logging / observability** — no `console.log`/`debugger`/`alert` in prod; controlled logger; error monitoring in prod; critical errors logged (no sensitive data); no silent catch; API failures, 5xx rate, latency, failed logins/jobs/webhooks, admin actions all observable. *Evidence: monitoring dashboard, silent-catch scan.* / no console/debugger/alert, logger, error monitoring, no sensitive log, no silent catch, observable signals։ *Evidence՝ dashboard, silent-catch scan։*
32. **[MUST] Testing** — unit tests on critical logic; permission + validation + API tests; E2E on main flows (login, CRUD, permission-denied, main lifecycle, form validation); tests assert behavior; pass on a clean install. *Evidence: test run output.* / unit critical logic, permission/validation/API test, E2E main flow, behavior-assert, clean-install pass։ *Evidence՝ test run output։*
33. **[MUST] Build / CI** — clean install works; lint + typecheck + tests + build pass; CI pipeline exists and blocks bad code; artifacts valid. *Evidence: `npm ci && lint && typecheck && test && build` output; CI status.* / clean install, lint+typecheck+test+build pass, CI blocks bad code։ *Evidence՝ command output, CI status։*
34. **[MUST] Deployment** — process documented; prod env ready; domain + SSL; safe migrations; rollback plan; logs accessible; error monitoring; no demo/test data in prod. *Evidence: deployment doc, prod check.* / documented, prod ready, SSL, safe migration, rollback, logs, monitoring, no prod demo-data։ *Evidence՝ deployment doc, prod check։*
35. **[MUST] Backup / recovery** — DB backup exists; backup schedule; restore process tested; critical files backed up; rollback rehearsed; data-loss risk assessed. *Evidence: backup config, a tested restore.* / DB backup, schedule, tested restore, rollback rehearsed, data-loss assessed։ *Evidence՝ backup config, tested restore։*
36. **[MUST] Production data safety** — soft delete where the business needs it; permanent delete restricted; dangerous + bulk actions confirmed (bulk shows count/preview); import warns before overwrite; migration has a pre-backup + rollback; prod DB protected from manual/accidental change; destructive actions permission-checked + audit-logged. *Evidence: destructive-action walkthrough.* / soft delete, restricted permanent delete, confirmed dangerous/bulk, import warn, migration backup+rollback, protected prod DB, audit-logged destructive։ *Evidence՝ destructive-action walkthrough։*
37. **⟂[MUST] Migration safety** *(if prod/staging data)* — purpose documented; tested locally + on staging; pre-backup; rollback exists; no destructive change without approval; new required fields have default/backfill; long migrations don't lock prod; enum/status changes mapped; old-code/new-schema (and reverse, if rolling) compatibility checked. *Evidence: staging run + rollback result.* / documented, tested local+staging, pre-backup, rollback, backfill, no-lock, mapped enums, compat-checked։ *Evidence՝ staging run + rollback։*
38. **⟂[SHOULD] Staging vs production parity** *(if staging exists)* — same build process + env var names; staging uses safe/anonymized data; no prod secrets in staging; integrations in sandbox mode; schema compatible; migration rehearsed on staging first; monitoring mirrored. *Evidence: parity table.* / նույն build+env, safe staging data, no prod secret, sandbox integration, compatible schema, rehearsed migration։ *Evidence՝ parity table։*
39. **[SHOULD] Documentation** — README, setup, env vars, scripts, architecture overview, API docs (if any), permission matrix, deployment guide, known limitations; a new dev can run it in ~20 min. *Evidence: fresh-clone run-through.* / README, setup, env, scripts, architecture, permission matrix, deploy guide, known limitations. ~20 րոպեում run։ *Evidence՝ fresh-clone run-through։*
40. **[SHOULD] Regression safety** — after each fix: login/logout, protected routes, main lifecycle, CRUD, permission-denied, admin, build/typecheck/lint, mobile, forms, exports, notifications all still work; the previous bug did not reappear. *Evidence: regression checklist per change.* / ամեն fix-ից հետո՝ ամեն ինչ դեռ աշխատում է, հին bug-ը չի վերադարձել։ *Evidence՝ regression checklist։*
41. **⟂[SHOULD] AI / automation** *(if the app has AI/auto-assignment/auto-decision/workflow triggers)* — documented trigger + action; manual override; critical actions need approval; audit-logged; no critical change without approval where business demands it; generated content reviewable; no prompt/data leakage; user knows automation ran; failed automation retries/error-states; idempotent (no duplicate on the same event). *Evidence: automation history, dry-run.* / documented trigger/action, override, approval, audit-log, review, no leak, idempotent։ *Evidence՝ automation history, dry-run։*

### F — Domain-specific (conditional) / Ոլորտ-հատուկ (conditional)

42. **⟂[MUST] Payment / billing** — amount computed correctly (never editable from the frontend); currency/discounts/taxes correct; unique invoice number; payment status transitions right; failed payment handled; refund/adjustment logic. *Evidence: try to change amount client-side → rejected.* / amount ճիշտ (frontend-ից չփոխվող), currency/discount/tax, unique invoice, status, failed-payment, refund։ *Evidence՝ client-side amount change → rejected։*
43. **⟂[SHOULD] Integration** — webhooks work + retry + logged; duplicate webhook doesn't create a duplicate record; API keys stored safely; external timeout handled; external-service-down doesn't crash the app. *Evidence: webhook replay, timeout sim.* / webhook + retry + log, no duplicate, safe keys, timeout handled, resilient։ *Evidence՝ webhook replay, timeout sim։*
44. **⟂[SHOULD] Notifications** — go to the right user at the right time; no duplicates; read/unread; correct template; click routes to the right screen; critical ones not lost. *Evidence: trigger + inbox check.* / ճիշտ user/ժամ, no duplicate, read/unread, template, routing, no loss։ *Evidence՝ trigger + inbox check։*
45. **⟂[SHOULD] Reports / export** — numbers correct; filters + date range respected; CSV/XLSX/PDF work; permission-checked; export excludes forbidden data; large export doesn't kill the app. *Evidence: export with a low-role user.* / numbers, filter/date, format, permission, no forbidden data, no crash։ *Evidence՝ low-role export։*
46. **⟂[SHOULD] File upload / download** — type + size validation; dangerous extensions blocked; filename sanitized; private files not public-URL-reachable; upload-fail message; filename conflict handled; download permission-checked. *Evidence: upload `.exe`/`.svg`/oversized; hit a private URL unauthenticated.* / type/size, blocked ext, sanitized, private-protected, fail-message, permission։ *Evidence՝ upload bad file, private URL unauth։*
47. **⟂[MUST] Admin panel** — only admins reach it; user management + role/settings changes protected; dangerous actions confirmed; logs; an admin cannot lock themselves out; a regular admin cannot perform super-admin actions; audit trail on admin actions. *Evidence: admin route as a normal user → blocked.* / միայն admin, protected role/settings, confirmed, logs, no self-lockout, super-admin boundary, audit trail։ *Evidence՝ admin route որպես normal → blocked։*
48. **[SHOULD] Audit log / activity log** — who created/edited/deleted/approved/changed-role/logged-in/failed-login, with timestamp and actor. *Evidence: a sample entry, e.g. "Gev changed role Editor→Admin at …".* / ով ստեղծեց/խմբագրեց/ջնջեց/approve/role-change/login, timestamp + actor-ով։ *Evidence՝ sample entry։*
49. **[MUST] Internationalization / language (L0 + L13)** — no hardcoded text; strings via language tokens; **Armenian + English both first-class and at parity** (Bro's L0); date/number/currency formats correct; long Armenian text doesn't break the UI; no layout break on switch. *Evidence: switch language → nothing untranslated, both HY+EN complete.* / no hardcoded text, language-token, **հայերեն + անգլերեն երկուսն էլ first-class ու parity-ով** (L0), ճիշտ format, երկար հայերենը չի կոտրում UI-ն, switch-ը ամբողջական։ *Evidence՝ language switch → ոչինչ չթարգմանված չմնա։*
50. **⟂[SHOULD] Timezone / date** — created/updated/booking/deadline/calendar dates correct; server vs user timezone not confused; date picker has no off-by-one; report date ranges correct. *Evidence: cross-timezone date test.* / ճիշտ date-եր, server↔user tz, no off-by-one, ճիշտ range։ *Evidence՝ cross-tz date test։*
51. **⟂[SHOULD] SEO** *(public pages)* — unique titles, meta descriptions, Open Graph, sitemap, robots.txt, canonical; public pages indexable, private/admin/auth `noindex`; alt text; heading hierarchy; no broken links; Core Web Vitals ok. *Evidence: view-source, sitemap/robots check.* / unique title/meta/OG/sitemap/robots/canonical, public indexable + private noindex, alt, headings, CWV։ *Evidence՝ view-source, sitemap/robots։*
52. **⟂[SHOULD] Legal / compliance (light)** — privacy policy (if user data), terms (if public), cookie notice (if tracking), marketing consent, data deletion + export process, retention rule, third-party services listed. Not a legal opinion — routes deep questions to `legal-compliance-contracts`. *Evidence: policy presence check.* / privacy/terms/cookie/consent/deletion/export/retention/third-party. Legal opinion չէ։ *Evidence՝ policy presence check։*

### G — Process & Governance / Process & Governance

53. **[SHOULD] Module ownership** — each module/workflow has a business + technical owner; critical permissions have an approver; a change to a critical business rule has an approval path. *Evidence: ownership table.* / ամեն module՝ business + technical owner, approver, approval path։ *Evidence՝ ownership table։*
54. **[MUST] UAT (by real role)** — each real role (admin, manager, sales, dispatcher, technician/NOC, billing, viewer, external) runs its own scenarios with a tester, expected vs actual, sign-off. A failed main-business-role UAT → NO-GO or GO-WITH-RISK; failed admin/security UAT → NO-GO. *Evidence: signed UAT rows.* / ամեն role իր scenario-ն, tester-ով, expected vs actual, sign-off։ Failed main-role → NO-GO/GO-WITH-RISK. failed admin/security → NO-GO։ *Evidence՝ signed UAT row-եր։*
55. **[MUST] Risk register** — each open risk: impact × likelihood → severity, affected module, mitigation, decision (fix/accept/monitor/defer), owner, deadline, evidence. Security/data risks cannot be accepted casually. *Evidence: the register itself.* / ամեն ռիսկ՝ impact×likelihood, mitigation, decision, owner, deadline, evidence. security/data ռիսկը casual չի accept-վում։ *Evidence՝ register-ը։*
56. **[MUST] Release gate** — P0 = 0; security/auth/permission blockers = 0; build+typecheck pass; lint pass or approved exceptions; main E2E pass; migration tested; rollback plan; backup verified; release notes ready; known limitations documented. Decision: GO / NO-GO / GO WITH RISK (with a written risk acceptance). *Evidence: the gate table.* / P0=0, blockers=0, build/typecheck pass, E2E pass, migration tested, rollback, backup, release notes, known-limitations։ *Evidence՝ gate table։*
57. **[SHOULD] Post-release monitoring** — 1h (deploy health, login/5xx spikes, latency, critical pages, DB, jobs); 24h (failed logins/payments/webhooks, tickets, permission-denied spikes, slow endpoints, data anomalies, admin audit log); 72h (trends, real-usage confirmation of critical workflows, backup verified, rollback need). *Evidence: monitoring plan + first readings.* / 1ժ/24ժ/72ժ signal-ներ + incident template։ *Evidence՝ monitoring plan + first readings։*

> **Conditional dimensions not applicable → mark N/A and say why** (completeness law — a skipped `⟂` is stated, never silent). / **Չկիրառվող conditional → նշիր N/A ու ասա ինչու** (completeness law — skip արած `⟂`-ն ասվում է, երբեք լուռ չի)։

---

## 5. Test-user matrix & evidence folder / Test-user matrix & evidence folder

### 5.1 Test-user matrix (permission audit needs real users) / Test-user matrix (permission audit-ը իրական user է պահանջում)

Button-hide ≠ permission. Every forbidden action is tested via **direct route + direct API**, with a real low-permission user. / Button-hide ≠ permission։ Ամեն forbidden action test-վում է **direct route + direct API**-ով, իրական low-permission user-ով։

| Role | Test user | Expected access | Forbidden critical access | Status |
|---|---|---|---|---|
| Super Admin | | full | protected-only | TBD |
| Admin | | admin limited | super-admin actions | TBD |
| Manager | | module mgmt | system settings / role root | TBD |
| Editor | | create/edit | delete / approve / admin | TBD |
| Viewer | | view only | edit/delete/export/admin | TBD |
| Billing / Ops / NOC / External | | role-scoped | out-of-role | N/A unless present |

### 5.2 Evidence folder / Evidence folder

```
audit/
  00-summary/       verdict.md · executive-summary.md · risk-register.md · release-decision.md
  01-commands/      install/lint/typecheck/build/tests/npm-audit/outdated/depcheck/circular
  02-screenshots/   login/ workspace/ main-flows/ admin/ mobile/ errors/ empty-states/
  03-api-tests/     auth/ permissions/ validation/ exports/ errors/
  04-db-checks/     schema.md · constraints.md · migrations.md · orphan-records.md
  05-manual-flows/  login/ main-business/ lead/ billing/ admin/ export/
  06-security/      auth-bypass/ idor/ upload/ xss/ secrets-scan/
  07-uat/           role-*.md
  08-post-release/  monitoring-plan.md · rollback-plan.md · known-risks.md
```

**Evidence naming / Evidence-ի անվանում:** `YYYY-MM-DD_section_testname_result.ext` — e.g. `2026-07-02_auth_direct-admin-route-forbidden_PASS.png`.

---

## 6. App-type profiles (per-project tailoring) / App-type profile-ներ (per-project հարմարեցում)

> **EN:** Not every app needs every dimension at the same depth. Pick the project's type; its MUSTs get maximum depth, the rest scale down (or N/A). This is how "every project gets the audit **it** needs." Then record the selection (which dimensions MUST/SHOULD/NICE/N-A) in the report's scope section.
>
> **HY:** Ամեն app-ին պետք չէ ամեն dimension նույն խորությամբ։ Ընտրիր project-ի type-ը. իր MUST-երը՝ առավելագույն խորություն, մնացածը՝ ցածր (կամ N/A)։ Սա է «ամեն project ստանում է **իրեն** պետք audit-ը»։ Հետո selection-ը գրիր report-ի scope-ում։

- **CRM / ERP / internal business system** — MUST: permission matrix · audit log · export permission · lifecycle/status · business-rule enforcement · module + data ownership · admin protection · backup/recovery · UAT by role.
- **E-commerce** — MUST: payment security · order lifecycle · refund flow · inventory consistency · price-not-editable-from-frontend · tax/discount validation · notification correctness · checkout + failed-payment handling.
- **SaaS** — MUST: **tenant isolation (P0)** · subscription/billing · plan limits · trial/upgrade/downgrade · usage limits · team/user mgmt · account cancellation · data export/deletion · webhook reliability.
- **Public / marketing website** — MUST: SEO · performance / Core Web Vitals · lead-form validation · spam protection · responsive · a11y basics · analytics/consent (if tracking).
- **Internal admin app** — MUST: admin action audit log · RBAC · sensitive-data visibility · dangerous-action confirmation · soft delete/restore · export restriction · user-mgmt protection · super-admin boundaries.
- **Marketplace / multi-sided** — MUST: user-type isolation · payment/payout · dispute/refund · role dashboards · messaging safety · search correctness · moderation · fraud/abuse signals.
- **ISP / Telecom platform** *(GAA, SCOUT flavor)* — MUST: the operational lifecycle **Lead → Contract → Order → Scheduling → Config → Installation → Connection Test → Payment → Activation → Billing**; role-scoped access (Sales / Dispatch / NOC / Technical / Billing); business-rule gates (no order without lead; no activation without payment/connection-test; no double slot/technician assignment); status transition control per role; billing correctness; audit log on every transition; multi-department UAT.

**Tailoring rule / Հարմարեցման կանոն:** start from the canonical §4 list, apply the profile, and **write the selection down** (MUST / SHOULD / NICE / N-A per dimension). A dimension marked N-A must say why — nothing dropped silently. / Սկսիր §4 canonical-ից, կիրառիր profile-ը, ու **selection-ը գրիր** (MUST/SHOULD/NICE/N-A)։ N-A-ն ասում է ինչու — ոչինչ լուռ չի ընկնում։

---

## 7. Audit runbook (execution order) / Audit runbook (կատարման հերթ)

1. **Preparation** — access (repo, staging, prod, test users per role, `.env.example`, business-flow explanation, module/page list, permission matrix, schema access if allowed, deployment + rollback description). / access-երը ձեռք բեր։
2. **Automated technical checks** — clean install · lint · typecheck · tests · build · `npm audit` · `npm outdated` · `depcheck` · `madge --circular` · security + hardcode keyword scan. / automated check-երը վազացրու։
3. **Manual product / UX** — login, main business flow end-to-end, CRUD, empty/error/loading states, mobile, search/filter/sort/pagination, export/import. / manual product/UX pass։
4. **Security / permission hard test** — protected routes logged-out; admin route as normal user; viewer edit API; editor delete API; IDOR (A reads B's ID); export permission; sensitive fields in API; role-change refresh; direct-API bypass. / security/permission hard test։
5. **Data / DB / business rules** — required relationships, FKs, unique constraints, nullable critical fields, status transitions, orphan/duplicate records, destructive-action audit logging. / data/DB/business rule։
6. **Release decision** — collect evidence · classify P0/P1/P2/P3 · fill the risk register · pick GREEN/YELLOW/RED by §3 · GO/NO-GO/GO-WITH-RISK · fix recommendations · owners · blockers · **coverage / what-was-NOT-covered statement**. / release decision + coverage statement։

**First-pass command set (React/Next/Node) / First-pass command set:**
```bash
npm install        # or: npm ci
npm run lint
npm run typecheck  # or: npx tsc --noEmit
npm test           # or: npx vitest run
npm run build
npm audit
npm outdated
npx depcheck
npx madge --circular src
npx knip           # unused exports/deps
npx playwright test   # if E2E exists
```
If scripts are missing → mark at least YELLOW; a missing/failing `build` → production readiness cannot be GREEN. / Script-երը բացակայում → առնվազն YELLOW. բացակա/failing `build` → GREEN չի կարող։

**Keyword scan (hardcode / secrets / dead code) / Keyword scan:**
```
any · as any · @ts-ignore · @ts-expect-error · console.log · debugger · alert( ·
TODO · FIXME · HACK · mock · fake · demo · sample · lorem · dummy · testUser · testPassword ·
localhost · 127.0.0.1 · password · secret · token · apiKey · private_key · client_secret ·
access_token · refresh_token · bearer · old · legacy · deprecated · unused · temp · backup ·
copy · draft · v1 · v2 · hardcoded · role === · status ===   · #<hex-color> · <NNpx literal>
```

---

## 8. Anti-patterns — how NOT to audit / Anti-pattern-ներ — ոնց ՉԻ պետք audit անել

**EN:** "Looks good" without evidence · only the happy path tested · only tested as admin · restricted roles never tested · backend permission never tested · direct API never tried · button-hide treated as permission · build never run · typecheck never run · DB constraints never checked · mobile/error/empty states never checked · export leakage never checked · no rollback/backup check · no UAT · no priority · no owner · no release decision · no coverage statement. Replace "seems fine / probably works / should be okay / I clicked around" with **"viewer PATCH /api/x/:id → 403, evidence attached."**

**HY:** «Looks good» առանց evidence · միայն happy path · միայն admin-ով · restricted role-երը երբեք չ-test · backend permission երբեք չ-test · direct API երբեք չ-փորձ · button-hide-ը որպես permission · build երբեք չ-run · typecheck երբեք չ-run · DB constraint երբեք չ-ստուգ · mobile/error/empty երբեք չ-ստուգ · export leakage չ-ստուգ · no rollback/backup · no UAT · no priority · no owner · no release decision · no coverage statement։ «Seems fine / probably works»-ի փոխարեն՝ **«viewer PATCH /api/x/:id → 403, evidence կցված»**։

---

## 9. Canonical final verdict format (the ONE format) / Canonical վերջնական verdict format (ՄԻԱԿ format-ը)

> The report template holds the full fillable version; this is the canonical shape. / Report template-ը կրում է լրիվ լցվող տարբերակը. սա canonical ձևն է։

```
APP AUDIT VERDICT

Project · Version/Commit · Environment · Audit date · Auditor
Overall score (avg 0–5) · Minimum critical score
Final status: GREEN / YELLOW / RED
Release decision: GO / NO-GO / GO WITH RISK
Decision reason:

Readiness (status + score per selected dimension from §4, N/A where profiled out)

P0 / P1 / P2 / P3 issue lists
Risk register summary (+ accepted risks with owner + deadline)
Required before release  ·  Allowed after release
Evidence location:
COVERAGE / WHAT WAS NOT COVERED + residual risk:   ← MANDATORY (completeness law)
Owner sign-off: Product · Engineering · Security · Operations · Business
```

---

## 10. AI-run prompt (dispatch a Bro/agent to run this) / AI-run prompt (dispatch արա Bro/agent սա վազացնելու)

```
Use APP_AUDIT_MASTER.md as the audit protocol. Do not only summarize the app.
Run the audit dimension by dimension (§4), tailored by the app-type profile (§6).

For every dimension return: Status (GREEN/YELLOW/RED) · Score 0–5 · Evidence ·
Issues · Priority (P0–P3) · Severity · Fix recommendation · Owner (if known) · Release impact.

Rules:
- No GREEN without evidence.  - Backend permissions must be TESTED, not assumed.
- Frontend-only security is not security.  - Hidden buttons are not authorization.
- Build fails → production readiness is RED.  - Auth/permission bypass → RED.
- Any P0 → release decision NO-GO.  - Main flow can't complete → final status RED.
- Missing evidence → YELLOW or RED by risk, never silent GREEN.
- End with the COVERAGE / what-was-NOT-covered + residual-risk statement.

Fill APP_AUDIT_REPORT_TEMPLATE.md. Output: executive summary · dimension-by-dimension verdict ·
P0–P3 lists · risk register · cleanup tasks · release decision (GO / NO-GO / GO WITH RISK) · coverage statement.
```

---

## 11. Where this fits in Bro / Ինչպես է սա տեղավորվում Bro-ում

- **Method owner:** the `auditing` skill (universal audit method — criteria-first, independence, evidence, sampling, 5 C's findings, completeness law). This file is the **app-production-readiness instrument** it dispatches to for that audit type. / **Մեթոդի տերը՝** `auditing` skill-ը։ Այս ֆայլը իր dispatch-ած **app-production-readiness instrument**-ն է։
- **Delivery:** SuperBro-governed; delivered to a project with `bro-docs -Deliver -ProjectId X -Sections "13"` (select-don't-copy). Never authored project-local (L10). / **Delivery՝** SuperBro-governed. `bro-docs`-ով։ Երբեք project-local (L10)։
- **Independence (self-audit caveat):** auditing your own work is a **self-check**, not an independent audit — declare the self-review threat and label it as such (auditing skill, decision rule 2). / **Independence՝** քո սեփականը audit անելը **self-check** է, ոչ independent — հայտարարիր self-review threat-ը։
- **Result location:** the filled report + evidence live in the audited **project's** repo (`<project>/audit/`), never in SuperBro (L8 — memory sealed per work). / **Արդյունքի տեղը՝** audit-ված **project**-ի repo-ում (`<project>/audit/`), երբեք SuperBro-ում (L8)։

---

*EN: No evidence = no GREEN. Any P0 = NO-GO. Nothing slips through uncovered.*
*HY: Evidence չկա = GREEN չկա։ Ցանկացած P0 = NO-GO։ Ոչինչ չծածկված չի սահում։ 💪🤍*
