# MenQ Webpage — MenQ Standard Governance Package / MenQ Webpage — MenQ Standard կառավարման փաթեթ

**Status / Կարգավիճակ:** Draft — Audit and adoption in progress / Draft — Audit և adoption ընթացքի մեջ  
**Owner / Պատասխանատու:** Gevorg Ohanyan, MenQ Owner  
**Parent standard:** `menqstudio/MenQ-Standard`  
**Design Platform authority:** Locked `D-025`

## Հայերեն

Այս directory-ն MenQ Webpage-ի canonical governance և Design Platform adoption package-ն է։ Այն չի փոխարինում existing product specs-ին (`docs/SPEC.md`, `docs/WIREFRAME.md`, buildpack/must docs)։ Այն սահմանում է authority, architecture boundary, adoption evidence, audit, validation և migration/rollback controls։

### Canonical files

- `DESIGN_PLATFORM_ADOPTION.md` — D-025 consumer contract և maturity path։
- `PRODUCT_EXTENSION_BOUNDARY.md` — shared core vs Webpage-local expression։
- `DESIGN_AUDIT_REPORT.md` — zero-trust audit findings և verdict։
- `VALIDATION_PLAN.md` — required validators/checks/evidence։
- `MIGRATION_AND_ROLLBACK_PLAN.md` — safe migration և exit/rollback։
- `COMPONENT_AND_PAGE_INVENTORY.md` — routes, sections, primitives և gaps։
- `decisions/DECISION_INDEX.md` — Webpage-local decisions։
- `evidence/adoption-record.json` — machine-readable state։

### Truth hierarchy

1. MenQ Standard repository — shared canonical truth։
2. Locked D-025 Design Platform contracts — shared design authority։
3. Այս package-ը — Webpage consumer adoption truth։
4. Existing product specs — product requirements/history։
5. Generated build output/screenshots — evidence only, ոչ source of truth։

---

## English

This directory is the canonical governance and Design Platform adoption package for MenQ Webpage. It does not replace existing product specifications (`docs/SPEC.md`, `docs/WIREFRAME.md`, or buildpack/must documentation). It defines authority, architecture boundaries, adoption evidence, audit, validation, and migration/rollback controls.

### Canonical files

- `DESIGN_PLATFORM_ADOPTION.md` — D-025 consumer contract and maturity path.
- `PRODUCT_EXTENSION_BOUNDARY.md` — shared core versus Webpage-local expression.
- `DESIGN_AUDIT_REPORT.md` — zero-trust audit findings and verdict.
- `VALIDATION_PLAN.md` — required validators, checks, and evidence.
- `MIGRATION_AND_ROLLBACK_PLAN.md` — safe migration and exit/rollback.
- `COMPONENT_AND_PAGE_INVENTORY.md` — routes, sections, primitives, and gaps.
- `decisions/DECISION_INDEX.md` — Webpage-local decisions.
- `evidence/adoption-record.json` — machine-readable state.

### Truth hierarchy

1. MenQ Standard repository — shared canonical truth.
2. Locked D-025 Design Platform contracts — shared design authority.
3. This package — Webpage consumer adoption truth.
4. Existing product specifications — product requirements and history.
5. Generated build output and screenshots — evidence only, not source of truth.

<!-- END: MENQ_WEBPAGE_STANDARD_PACKAGE_INDEX -->
