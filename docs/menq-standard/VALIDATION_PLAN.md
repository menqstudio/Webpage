# MenQ Webpage — Validation Plan / MenQ Webpage — Վավերացման պլան

**Status / Կարգավիճակ:** Draft gate definition / Draft gate definition

## Հայերեն

### Required gates

1. **Documentation integrity** — required files exist, bilingual sections and end markers are present.
2. **Adoption evidence** — machine record is valid JSON and matches D-025 consumer state.
3. **Token architecture** — import order is primitive → semantic → component → motion → product extension → sections.
4. **Product-extension isolation** — Webpage gradient/grid/glass aliases exist only in the product-extension layer except scoped overrides.
5. **Source hygiene** — component source has no unapproved raw color literals or direct primitive-token consumption.
6. **Application quality** — `npm ci`, lint, TypeScript, tests, and production build are GREEN.
7. **Accessibility** — focus visibility, semantic headings/landmarks, form labels/errors, dialog focus, skip links, and reduced-motion are verified.
8. **Localization** — HY/EN/RU product locales load; HY/EN governance records carry equal meaning.
9. **Responsive/theme matrix** — public routes are checked on mobile/tablet/desktop and light/dark/system themes.
10. **Regression and authority** — existing business flows remain functional and merge requires explicit Owner authority.

### Verdict semantics

- **GREEN:** all applicable gates pass with evidence.
- **YELLOW:** no confirmed blocking regression, but required evidence or authority is incomplete.
- **RED:** confirmed defect, broken validator, failed build/test, missing required record, or authority violation.

### Minimum CI commands

```bash
npm ci
npm run lint
npx tsc --noEmit
npm test -- --run
npm run build
python scripts/validate_menq_design_adoption.py
```

### Required final evidence

- validated head SHA,
- workflow run IDs and conclusions,
- changed-file inventory,
- audit defect closure table,
- adoption record,
- rollback proof,
- Owner ready/merge decision.

---

## English

### Required gates

1. **Documentation integrity** — required files exist, bilingual sections and ending markers are present.
2. **Adoption evidence** — the machine record is valid JSON and matches D-025 consumer state.
3. **Token architecture** — import order is primitive → semantic → component → motion → product extension → sections.
4. **Product-extension isolation** — Webpage gradient, grid, and glass aliases exist only in the product-extension layer except for scoped overrides.
5. **Source hygiene** — component source contains no unapproved raw color literals or direct primitive-token consumption.
6. **Application quality** — `npm ci`, lint, TypeScript, tests, and production build are GREEN.
7. **Accessibility** — focus visibility, semantic headings and landmarks, form labels and errors, dialog focus, skip links, and reduced motion are verified.
8. **Localization** — HY/EN/RU product locales load; HY/EN governance records carry equal meaning.
9. **Responsive/theme matrix** — public routes are checked on mobile, tablet, and desktop across light, dark, and system themes.
10. **Regression and authority** — existing business flows remain functional and merge requires explicit Owner authority.

### Verdict semantics

- **GREEN:** all applicable gates pass with evidence.
- **YELLOW:** no confirmed blocking regression, but required evidence or authority is incomplete.
- **RED:** confirmed defect, broken validator, failed build or test, missing required record, or authority violation.

### Minimum CI commands

```bash
npm ci
npm run lint
npx tsc --noEmit
npm test -- --run
npm run build
python scripts/validate_menq_design_adoption.py
```

### Required final evidence

- validated head SHA,
- workflow run IDs and conclusions,
- changed-file inventory,
- audit-defect closure table,
- adoption record,
- rollback proof,
- Owner ready and merge decision.

<!-- END: MENQ_WEBPAGE_VALIDATION_PLAN -->
