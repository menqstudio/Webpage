# MenQ Webpage — Zero-Trust Design Audit / MenQ Webpage — Zero-trust դիզայն audit

**Status / Կարգավիճակ:** YELLOW — remediation in progress / YELLOW — remediation-ը ընթացքի մեջ է  
**Audit date / Audit ամսաթիվ:** 2026-07-13  
**Audited baseline:** `f766943d92aa9c6c579a99ca0729c50a8f2206e1`  
**Working branch:** `menq-design-platform-adoption-v1`  
**Draft PR:** `#1`

## Հայերեն

### 1. Audit scope

Audit-ը ներառում է՝

- repository architecture և documentation continuity,
- token dependency model,
- semantic/component/product-extension boundaries,
- landing page composition,
- theme, locale, accessibility և motion behavior,
- build/lint/typecheck/test evidence,
- D-025 consumer adoption requirements,
- migration և rollback readiness։

Audit-ը չի փոխում business logic-ը, data model-ը կամ integrations-ը առանց separate defect evidence-ի։

### 2. Confirmed strengths

1. Existing app-ը իրական full-stack product է, ոչ screenshot/demo։
2. Stack-ը modern և maintainable է՝ Next.js 16, React 19, TypeScript, Prisma/PostgreSQL։
3. Public website-ը HY/EN/RU locale-ներ ունի։
4. Dark/light theme և prefers-color-scheme fallback կա։
5. Reduced-motion handling և focus-visible baseline կա։
6. Landing page-ը section-based reusable composition ունի։
7. Token files-ը հստակ շերտավորված են՝ primitives, semantic, components, motion, sections։
8. Existing build history-ը արձանագրում է prior build/lint/TypeScript և accessibility hardening work։
9. Admin/auth/RBAC/security scope-ը visual migration-ից առանձին է և պահպանվում է։

### 3. Confirmed defects

#### D-01 — Missing governed consumer identity

Root canonical project context, AI continuity, adoption record և D-025 mapping բացակայում էին։ Repository-ն product էր, բայց governed Design Platform consumer չէր։

**Severity:** High governance defect  
**Fix:** root continuity files և `docs/menq-standard/` package։

#### D-02 — Product expression mixed into semantic layer

`semantic.css`-ում տեղադրված են Webpage-specific hero gradient, grid և glass treatment tokens։ Դրանք product-local expression են և պետք է լինեն Product Extension layer-ում։

**Severity:** Medium architecture drift  
**Fix:** move to `product-extension.css` with stable token names to avoid UI regression։

#### D-03 — No package/version/compatibility linkage

Local tokens կան, բայց Design Platform release/package version, compatibility mode և migration state machine-readable ձևով չեն գրանցված։

**Severity:** High adoption-evidence gap  
**Fix:** adoption record + mapping/compatibility fields + validator։

#### D-04 — Documentation parity gap

Existing `docs/SPEC.md` և `docs/WIREFRAME.md` valuable product specs են, բայց հիմնականում Armenian-first են։ MenQ canonical governance records-ը պարտադիր HY/EN equal meaning պիտի ունենան։

**Severity:** Medium documentation gap  
**Fix:** preserve old specs; add equal bilingual governance package։

#### D-05 — No adoption CI gate

Existing app validation scripts կան, բայց Design Platform boundary, required files, end markers, adoption record և source-layer imports enforce չեն արվում։

**Severity:** High machine-enforcement gap  
**Fix:** dedicated validator և GitHub Actions gate։

### 4. Unverified risks

Հետևյալները մինչև automated full-tree evidence-ը YELLOW են՝

- raw visual hardcodes component source-ում,
- token aliases-ի orphan/unused drift,
- all interactive state coverage,
- visual regression across HY/EN/RU and light/dark,
- responsive breakpoints across all routes,
- admin/public shared visual divergence,
- runtime bundle/performance impact։

Unverified risk-ը defect claim չէ, բայց GREEN verdict-ի համար evidence է պահանջում։

### 5. Current verdict

- Architecture baseline: YELLOW
- Documentation governance: YELLOW → remediation active
- Product-extension boundary: RED before fix, target GREEN
- Accessibility baseline: provisionally GREEN, automation pending
- Localization baseline: provisionally GREEN for product locales, governance parity pending
- Build/test evidence: pending current branch run
- Adoption maturity: M1 candidate only after this package validates
- Merge readiness: NOT AUTHORIZED

---

## English

### 1. Audit scope

The audit covers:

- repository architecture and documentation continuity,
- token dependency model,
- semantic, component, and product-extension boundaries,
- landing-page composition,
- theme, locale, accessibility, and motion behavior,
- build, lint, typecheck, and test evidence,
- D-025 consumer-adoption requirements,
- migration and rollback readiness.

The audit does not change business logic, the data model, or integrations without separate defect evidence.

### 2. Confirmed strengths

1. The existing application is a real full-stack product, not a screenshot or demo.
2. The stack is modern and maintainable: Next.js 16, React 19, TypeScript, and Prisma/PostgreSQL.
3. The public website supports HY/EN/RU locales.
4. Dark/light theme support and a prefers-color-scheme fallback exist.
5. Reduced-motion handling and a focus-visible baseline exist.
6. The landing page uses section-based reusable composition.
7. Token files are clearly layered into primitives, semantic, components, motion, and sections.
8. Existing build history records prior build, lint, TypeScript, and accessibility hardening work.
9. Admin, authentication, RBAC, and security scope remains separate from the visual migration and is preserved.

### 3. Confirmed defects

#### D-01 — Missing governed consumer identity

Root canonical project context, AI continuity, an adoption record, and D-025 mapping were absent. The repository was a product but not a governed Design Platform consumer.

**Severity:** High governance defect  
**Fix:** root continuity files and the `docs/menq-standard/` package.

#### D-02 — Product expression mixed into the semantic layer

`semantic.css` contains Webpage-specific hero-gradient, grid, and glass-treatment tokens. These are product-local expression and belong in the Product Extension layer.

**Severity:** Medium architecture drift  
**Fix:** move them to `product-extension.css` while preserving stable token names to avoid UI regression.

#### D-03 — No package/version/compatibility linkage

Local tokens exist, but the Design Platform release/package version, compatibility mode, and migration state are not recorded in machine-readable form.

**Severity:** High adoption-evidence gap  
**Fix:** adoption record, mapping and compatibility fields, and a validator.

#### D-04 — Documentation parity gap

Existing `docs/SPEC.md` and `docs/WIREFRAME.md` are valuable product specifications but are primarily Armenian-first. MenQ canonical governance records require HY/EN equal meaning.

**Severity:** Medium documentation gap  
**Fix:** preserve the old specifications and add an equal bilingual governance package.

#### D-05 — No adoption CI gate

Application validation scripts exist, but Design Platform boundaries, required files, ending markers, the adoption record, and source-layer imports are not enforced.

**Severity:** High machine-enforcement gap  
**Fix:** dedicated validator and GitHub Actions gate.

### 4. Unverified risks

The following remain YELLOW until automated full-tree evidence exists:

- raw visual hardcodes in component source,
- orphan or unused token aliases,
- complete interactive-state coverage,
- visual regression across HY/EN/RU and light/dark,
- responsive breakpoints across all routes,
- admin/public shared-visual divergence,
- runtime bundle and performance impact.

An unverified risk is not a defect claim, but it requires evidence before a GREEN verdict.

### 5. Current verdict

- Architecture baseline: YELLOW
- Documentation governance: YELLOW → remediation active
- Product-extension boundary: RED before fix, target GREEN
- Accessibility baseline: provisionally GREEN, automation pending
- Localization baseline: provisionally GREEN for product locales, governance parity pending
- Build/test evidence: pending current-branch run
- Adoption maturity: M1 candidate only after this package validates
- Merge readiness: NOT AUTHORIZED

<!-- END: MENQ_WEBPAGE_DESIGN_AUDIT_REPORT -->
