# APP AUDIT REPORT — <PROJECT> / APP AUDIT REPORT — <PROJECT>

> **EN:** Fill this per project, evidence-first, following `APP_AUDIT_MASTER.md` (the standard). The report **proves** the current state; the release decision comes only from the evidence. Copy this file to `<project>/audit/00-summary/APP_AUDIT_REPORT.md` and fill it. No GREEN without a working paper. End with the coverage statement.
>
> **HY:** Լցրու ամեն project-ի, evidence-first, հետևելով `APP_AUDIT_MASTER.md`-ին (ստանդարտը)։ Report-ը **ապացուցում** է ընթացիկ վիճակը. release-ի որոշումը գալիս է միայն evidence-ից։ Պատճենիր `<project>/audit/00-summary/APP_AUDIT_REPORT.md` ու լցրու։ Ոչ մի GREEN առանց working paper-ի։ Ավարտիր coverage statement-ով։

---

## 1. Metadata / Metadata

```text
Project name:
Project type (see §6 profile):      CRM/ERP · E-commerce · SaaS · Public site · Admin · Marketplace · ISP/Telecom · Other
Version / Commit:
Repository:
Environment:                        local / staging / production
Staging URL:
Production URL:
Audit date:
Auditor:                            (independent) / (SELF-CHECK — self-review threat declared)
Business owner · Technical owner · Security owner · Operations owner:
```

---

## 2. Executive summary / Executive summary

```text
Overall status:      GREEN / YELLOW / RED
Release decision:    GO / NO-GO / GO WITH RISK
Average score (0–5):
Minimum critical score:
P0 · P1 · P2 · P3 counts:
Evidence location:   <project>/audit/

Summary (EN): what works · what is risky · what blocks release.
Ամփոփում (HY): ինչն է աշխատում · ինչն է risky · ինչն է block անում release-ը։

Final decision reason (EN):
Վերջնական որոշման պատճառ (HY):
```

---

## 3. Scope & tailoring / Scope & հարմարեցում

```text
App-type profile applied:
Included dimensions (from §4):
Excluded / N-A dimensions + WHY (completeness law — nothing dropped silently):
```

**Selection (MUST / SHOULD / NICE / N-A per dimension) / Selection:**

| Dimension (§4) | Level | Note |
|---|---|---|
| … | MUST / SHOULD / NICE / N-A | why, if N-A |

---

## 4. Automated technical checks / Automated technical check-եր

| Check | Command | Result | Evidence |
|---|---|---|---|
| Install | `npm ci` / `npm install` | PASS / FAIL / N-A | |
| Lint | `npm run lint` | PASS / FAIL / N-A | |
| Typecheck | `npm run typecheck` / `tsc --noEmit` | PASS / FAIL / N-A | |
| Tests | `npm test` | PASS / FAIL / N-A | |
| Build | `npm run build` | PASS / FAIL / N-A | |
| Security audit | `npm audit` | PASS / FAIL / N-A | |
| Outdated | `npm outdated` | PASS / FAIL / N-A | |
| Unused deps | `npx depcheck` | PASS / FAIL / N-A | |
| Circular deps | `npx madge --circular src` | PASS / FAIL / N-A | |
| Unused exports | `npx knip` | PASS / FAIL / N-A | |
| E2E | `npx playwright test` | PASS / FAIL / N-A | |

```text
Verdict: GREEN / YELLOW / RED   Score 0–5:   Issues:   Release impact:
(A missing/failing build → production readiness cannot be GREEN.)
```

---

## 5. Minimum MVP verdict / Minimum MVP verdict

| Area | Result | Evidence |
|---|---|---|
| Build | PASS / FAIL | |
| Login / logout | PASS / FAIL | |
| Protected routes | PASS / FAIL | |
| Main flow end-to-end | PASS / FAIL | |
| Critical CRUD | PASS / FAIL | |
| Backend permissions | PASS / FAIL | |
| Direct-API bypass blocked | PASS / FAIL | |
| Validation (frontend + backend) | PASS / FAIL | |
| Database safety | PASS / FAIL | |
| Secrets check | PASS / FAIL | |
| Mock/demo data check | PASS / FAIL | |
| Loading / empty / error states | PASS / FAIL | |
| Mobile main flow | PASS / FAIL | |
| Deployment known | PASS / FAIL | |
| Backup / rollback | PASS / FAIL / N-A | |
| Hardcode / token (L13) | PASS / FAIL | |
| Bilingual parity (L0, if applicable) | PASS / FAIL / N-A | |

```text
MVP status: GREEN / YELLOW / RED    Release: GO / NO-GO / GO WITH RISK    Reason:
(Any failed MUST → RED/YELLOW and NO-GO/GO-WITH-RISK.)
```

---

## 6. Readiness scorecard (per selected §4 dimension) / Readiness scorecard

> Fill only the dimensions selected in §3; mark the rest N-A. Status + Score + Evidence + Release impact per row. / Լցրու միայն §3-ում ընտրվածները. մնացածը N-A։

| # | Dimension | Status | Score 0–5 | Evidence | Release impact |
|---|---|---|---:|---|---|
| A1 | Product / business logic | | | | |
| A2 | User flows | | | | |
| A3 | Functional behavior | | | | |
| A4 | UI / UX | | | | |
| A5 | Responsive | | | | |
| A6 | Accessibility | | | | |
| A7 | Browser compatibility | | | | |
| B8 | Authentication | | | | |
| B9 | Authorization / permissions | | | | |
| B10 | Security | | | | |
| B11 | Data validation | | | | |
| B12 | Tenant isolation ⟂ | | | | |
| B13 | Data ownership / privacy | | | | |
| C14 | Database / data integrity | | | | |
| C15 | API contract | | | | |
| C16 | Business rule enforcement | | | | |
| C17 | Lifecycle / status | | | | |
| D18 | Architecture | | | | |
| D19 | Codebase cleanliness | | | | |
| D20 | Dead code | | | | |
| D21 | Duplicate code | | | | |
| D22 | Type safety | | | | |
| D23 | Dependency health | | | | |
| D24 | Config / environment | | | | |
| D25 | Hardcode / tokens (L13) | | | | |
| D26 | Mock / demo / test data | | | | |
| D27 | State management | | | | |
| D28 | Page-by-page coverage | | | | |
| D29 | Component-level | | | | |
| E30 | Performance | | | | |
| E31 | Logging / observability | | | | |
| E32 | Testing | | | | |
| E33 | Build / CI | | | | |
| E34 | Deployment | | | | |
| E35 | Backup / recovery | | | | |
| E36 | Production data safety | | | | |
| E37 | Migration safety ⟂ | | | | |
| E38 | Staging/prod parity ⟂ | | | | |
| E39 | Documentation | | | | |
| E40 | Regression safety | | | | |
| E41 | AI / automation ⟂ | | | | |
| F42 | Payment / billing ⟂ | | | | |
| F43 | Integration ⟂ | | | | |
| F44 | Notifications ⟂ | | | | |
| F45 | Reports / export ⟂ | | | | |
| F46 | File upload / download ⟂ | | | | |
| F47 | Admin panel ⟂ | | | | |
| F48 | Audit log / activity log | | | | |
| F49 | i18n / language (L0+L13) | | | | |
| F50 | Timezone / date ⟂ | | | | |
| F51 | SEO ⟂ | | | | |
| F52 | Legal / compliance (light) ⟂ | | | | |
| G53 | Module ownership | | | | |
| G54 | UAT (by role) | | | | |
| G55 | Risk register | | | | |
| G56 | Release gate | | | | |
| G57 | Post-release monitoring | | | | |

---

## 7. Section detail (use per dimension that is not trivially GREEN) / Section detail

```text
Dimension:
Status: GREEN / YELLOW / RED     Score: 0–5
Evidence: (file / route / screenshot / command output / manual test / API req+resp / DB check)
Issues:
Priority: P0 / P1 / P2 / P3      Severity: Critical / High / Medium / Low
Fix recommendation:
Owner:
Release impact:
```

### Key hard-test tables / Key hard-test աղյուսակներ

**Authentication (B8):**

| Test | Expected | Actual | Result | Evidence |
|---|---|---|---|---|
| Wrong password | safe error | | PASS/FAIL | |
| Direct protected route logged-out | redirect / 401 | | PASS/FAIL | |
| Back after logout | app not accessible | | PASS/FAIL | |
| Expired session | handled | | PASS/FAIL | |

**Authorization / IDOR (B9):**

| Test | Role | Expected | Actual | Result | Evidence |
|---|---|---|---|---|---|
| Admin route | normal user | 403 / blocked | | PASS/FAIL | |
| Edit via direct API | viewer | 403 | | PASS/FAIL | |
| Delete via direct API | editor | 403 | | PASS/FAIL | |
| Open another user's record by ID | user A | blocked | | PASS/FAIL | |
| Export restricted data | viewer | 403 / filtered | | PASS/FAIL | |

**Security (B10):**

| Test | Expected | Actual | Result | Evidence |
|---|---|---|---|---|
| XSS input `<script>` | escaped | | PASS/FAIL | |
| SQLi `' OR 1=1 --` | blocked | | PASS/FAIL | |
| Secrets in frontend | none | | PASS/FAIL | |
| `.env` in repo | not committed | | PASS/FAIL | |
| Login rate limit | exists | | PASS/FAIL | |
| Sensitive errors | hidden | | PASS/FAIL | |

**Business rule / lifecycle (C16/C17):**

| Rule | UI | Backend | DB | Direct-API test | Result | Evidence |
|---|---|---|---|---|---|---|
| e.g. Order requires lead_id | Y/N | Y/N | Y/N/N-A | create without lead_id → 400/422 | PASS/FAIL | |
| Illegal status transition | Y/N | Y/N | Y/N/N-A | via API → blocked | PASS/FAIL | |

**Tenant isolation (B12, if SaaS):**

| Test | Expected | Actual | Result | Evidence |
|---|---|---|---|---|
| A reads B's record by ID | 403 / not found | | PASS/FAIL/N-A | |
| A's export excludes B | excluded | | PASS/FAIL/N-A | |
| Search is tenant-scoped | no leak | | PASS/FAIL/N-A | |

*(Tenant isolation failure = P0 = NO-GO.)*

---

## 8. UAT by role / UAT ըստ role-ի

| Scenario | Role | Tester | Expected | Actual | Passed | Issue | Priority | Evidence |
|---|---|---|---|---|---|---|---|---|
| | Admin | | | | Y/N/Partial | | | |
| | Manager | | | | Y/N/Partial | | | |
| | (main business role) | | | | Y/N/Partial | | | |
| | Billing / NOC / etc. | | | | Y/N/Partial | | | |
| | Viewer | | | | Y/N/Partial | | | |

```text
UAT status: PASS / PARTIAL / FAIL    Business sign-off:    Release impact:
(Failed main-business-role UAT → NO-GO/GO-WITH-RISK; failed admin/security UAT → NO-GO.)
```

---

## 9. Issues by priority / Issue-ներ ըստ priority

**P0 — blocking / production stopper:**

| ID | Issue | Dimension | Severity | Evidence | Owner | Required fix | Status |
|---|---|---|---|---|---|---|---|
| P0-001 | | | Critical | | | | Open |

**P1 — must fix before real users** · **P2 — should fix soon** · **P3 — nice to have** — same columns. / նույն սյուները։

---

## 10. Risk register / Risk register

| Risk ID | Risk | Category | Impact | Likelihood | Severity | Module | Mitigation | Decision | Owner | Deadline | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RISK-001 | | Security/Permission/Data-loss/Privacy/Perf/Integration/Deployment/UX | L/M/H/Crit | L/M/H | P0–P3 | | | Fix/Accept/Monitor/Defer | | | |

**Accepted risks (owner + deadline required; security/data cannot be accepted casually) / Accepted risk-եր:**

| Risk ID | Reason | Owner | Follow-up deadline |
|---|---|---|---|

---

## 11. Release gate / Release gate

| Gate | Required | Result | Evidence |
|---|---|---|---|
| P0 issues | 0 | PASS/FAIL | |
| Security / auth / permission blockers | 0 | PASS/FAIL | |
| Build · Typecheck | pass | PASS/FAIL | |
| Lint | pass / approved exceptions | PASS/FAIL | |
| Main E2E flows | pass | PASS/FAIL | |
| Migration | tested | PASS/FAIL/N-A | |
| Rollback plan · Backup verified | exists / verified | PASS/FAIL | |
| Release notes · Known limitations | ready / documented | PASS/FAIL | |
| Hardcode/token (L13) · Bilingual (L0) | clean / parity | PASS/FAIL/N-A | |

```text
Release decision: GO / NO-GO / GO WITH RISK    Reason:
```

---

## 12. Required before release / Allowed after release / Պահանջվող release-ից առաջ / Թույլատրված հետո

| ID | Item | Priority | Owner | Deadline | Status |
|---|---|---|---|---|---|
| REL-001 (before) | | P0/P1 | | | Open |
| POST-001 (after) | | P2/P3 | | | Open |

---

## 13. Post-release monitoring / Post-release monitoring

```text
First 1h:   deploy health · login/5xx spike · latency · critical pages · DB · jobs
First 24h:  failed logins/payments/webhooks · tickets · permission-denied spikes · slow endpoints · data anomalies · admin audit log
First 72h:  trends · real-usage confirmation of critical workflows · backup verified · rollback need · follow-up prioritized
```

---

## 14. FINAL VERDICT / ՎԵՐՋՆԱԿԱՆ VERDICT

```text
APP AUDIT FINAL VERDICT

Project · Version/Commit · Environment · Audit date · Auditor
Overall score (0–5):        Minimum critical score:
Final status: GREEN / YELLOW / RED
Release decision: GO / NO-GO / GO WITH RISK
Decision reason:

P0 / P1 / P2 / P3 (top items):
Critical risks · Accepted risks (owner + deadline):
Required before release · Allowed after release:
Evidence location:
```

### COVERAGE / WHAT WAS NOT COVERED (MANDATORY) / COVERAGE / ԻՆՉ ՉԻ ԾԱԾԿՎԵԼ (ՊԱՐՏԱԴԻՐ)

```text
Population (EN): total pages/endpoints/entities/roles vs how many audited (e.g. 60 of 412).
Not covered:     the named remainder + what was out of scope + why.
Sampling risk:   the untested part may differ from the tested part.
Residual risk:   what remains even after this audit.

Population (HY): ընդհանուր pages/endpoints/entities/roles ընդդեմ քանիսը audit-ված։
Չծածկված:       անվանված մնացորդը + ինչ էր out of scope + ինչու։
Sampling risk:   չ-թեստավորած մասը կարող է տարբերվել թեստավորածից։
Residual risk:   ինչ է մնում այս audit-ից հետո։
```

### Owner sign-off / Owner sign-off

| Owner | Name | Decision | Date |
|---|---|---|---|
| Product | | Approved / Rejected / Risk Accepted | |
| Engineering | | Approved / Rejected / Risk Accepted | |
| Security | | Approved / Rejected / Risk Accepted | |
| Operations | | Approved / Rejected / Risk Accepted | |
| Business | | Approved / Rejected / Risk Accepted | |

---

*EN: No evidence = no GREEN. Frontend-only permission = not security. Any P0 = NO-GO. Name what you did NOT cover.*
*HY: Evidence չկա = GREEN չկա։ Միայն frontend permission = security չէ։ Ցանկացած P0 = NO-GO։ Անվանիր՝ ինչ չծածկեցիր։ 💪🤍*
