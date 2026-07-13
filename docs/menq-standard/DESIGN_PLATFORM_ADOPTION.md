# MenQ Webpage — Design Platform Adoption / MenQ Webpage — Design Platform որդեգրում

**Status / Կարգավիճակ:** Candidate adoption — M1 target / Candidate adoption — M1 թիրախ  
**Parent decision / Ծնող որոշում:** `D-025 — MenQ Design Platform Architecture v1`  
**Consumer ID:** `menq.webpage.public-site-admin`  
**Consumer Owner:** Gevorg Ohanyan  
**Technical owner:** MenQ Webpage maintainers

## Հայերեն

### 1. Adoption նպատակը

Existing MenQ Webpage-ը դառնում է MenQ Design Platform-ի governed product consumer՝ առանց business logic, backend, routes կամ content ownership-ը shared core տեղափոխելու։ Adoption-ը package install չէ․ այն contract mapping, version linkage, conformance validation, product-extension discipline և rollback readiness է։

### 2. Adoption scope

Scope-ի մեջ են՝

- color, typography, spacing, radius, shadow և z-index token hierarchy,
- semantic theme mapping,
- button/card/form/header primitives,
- landing section composition patterns,
- dark/light mode,
- responsive behavior,
- Armenian/English/Russian locale behavior,
- accessibility and reduced-motion behavior,
- public website և admin visual foundations,
- design validation and evidence.

Scope-ից դուրս են՝

- Prisma schema և data ownership,
- lead/booking workflows,
- authentication, session և RBAC logic,
- notifications, integrations և audit events,
- marketing copy ownership,
- SEO business metadata,
- deployment secrets և infrastructure credentials։

### 3. Package/version linkage

Current implementation-ը local token files է օգտագործում։ Formal package publishing/consumption path-ը դեռ ապացուցված չէ։ Մինչև released Design Platform package consumption-ը՝ Webpage-ը գործում է controlled source-mapped adoption mode-ում և պարտավոր է պահել՝

- D-025 decision reference,
- mapping manifest,
- no-silent-fork rule,
- compatibility note,
- migration/rollback plan,
- validation evidence։

### 4. Maturity path

- **M0 — Unassessed:** historical pre-audit state։
- **M1 — Candidate:** owner, scope, risks, expected value և dependency mapping documented։ Այս PR-ի documentation baseline-ը թիրախավորում է M1։
- **M2 — Pilot:** one bounded real flow consumes governed mapped contracts with GREEN validation and rollback proof։
- **M3 — Conformant:** applicable conformance profile GREEN, accessibility/localization/theme/product-extension boundaries verified։
- **M4 — Operational:** production-equivalent operation, monitoring/support/release linkage/incident readiness։
- **M5 — Proven:** meaningful release/migration cycle, measured value, traceable feedback and reusable lessons returned to Platform governance։

Maturity verdict-ը չի տրվում միայն documentation claim-ով։

### 5. Success criteria

1. All design values map through governed token layers.
2. Components do not consume primitive values directly except approved infrastructure cases.
3. Product-specific expression is isolated and documented.
4. HY/EN canonical governance parity is complete; RU remains a supported product locale.
5. Accessibility, responsive, theme, motion, build, lint, typecheck, and tests are GREEN.
6. No business-function regression is introduced.
7. Machine-readable adoption evidence matches repository state.

---

## English

### 1. Adoption purpose

The existing MenQ Webpage becomes a governed product consumer of the MenQ Design Platform without moving business logic, backend, routes, or content ownership into the shared core. Adoption is not package installation alone; it requires contract mapping, version linkage, conformance validation, product-extension discipline, and rollback readiness.

### 2. Adoption scope

In scope:

- color, typography, spacing, radius, shadow, and z-index token hierarchy,
- semantic theme mapping,
- button/card/form/header primitives,
- landing-section composition patterns,
- dark/light mode,
- responsive behavior,
- Armenian/English/Russian locale behavior,
- accessibility and reduced-motion behavior,
- public website and admin visual foundations,
- design validation and evidence.

Out of scope:

- Prisma schema and data ownership,
- lead and booking workflows,
- authentication, session, and RBAC logic,
- notifications, integrations, and audit events,
- marketing-copy ownership,
- SEO business metadata,
- deployment secrets and infrastructure credentials.

### 3. Package/version linkage

The current implementation uses local token files. Formal package publishing and consumption have not yet been proven. Until released Design Platform package consumption exists, Webpage operates in controlled source-mapped adoption mode and must preserve:

- the D-025 decision reference,
- a mapping manifest,
- the no-silent-fork rule,
- a compatibility note,
- a migration and rollback plan,
- validation evidence.

### 4. Maturity path

- **M0 — Unassessed:** historical pre-audit state.
- **M1 — Candidate:** owner, scope, risks, expected value, and dependency mapping are documented. This PR targets M1 documentation baseline.
- **M2 — Pilot:** one bounded real flow consumes governed mapped contracts with GREEN validation and rollback proof.
- **M3 — Conformant:** the applicable conformance profile is GREEN, with accessibility, localization, theme, and product-extension boundaries verified.
- **M4 — Operational:** production-equivalent operation with monitoring, support, release linkage, and incident readiness.
- **M5 — Proven:** a meaningful release or migration cycle, measured value, traceable feedback, and reusable lessons returned to Platform governance.

A maturity verdict cannot be granted by documentation claims alone.

### 5. Success criteria

1. All design values map through governed token layers.
2. Components do not consume primitive values directly except approved infrastructure cases.
3. Product-specific expression is isolated and documented.
4. HY/EN canonical governance parity is complete; RU remains a supported product locale.
5. Accessibility, responsive, theme, motion, build, lint, typecheck, and tests are GREEN.
6. No business-function regression is introduced.
7. Machine-readable adoption evidence matches repository state.

<!-- END: MENQ_WEBPAGE_DESIGN_PLATFORM_ADOPTION -->
