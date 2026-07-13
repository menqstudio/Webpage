# MenQ Webpage — Component and Page Inventory / MenQ Webpage — Component և էջերի inventory

**Status / Կարգավիճակ:** Audit baseline / Audit baseline  
**Source ref:** `menq-design-platform-adoption-v1`

## Հայերեն

### Public page composition

`src/app/(site)/[locale]/page.tsx` composition-ը՝

1. `SkipLink`
2. `Header`
3. `Hero`
4. `Pain`
5. `SolutionOverview`
6. `ServiceBlocks`
7. `BusinessSuccess`
8. `Industries`
9. `Results`
10. `AISection`
11. `HowWeWork`
12. `Trust`
13. `Faq`
14. `CTA`
15. `Footer`
16. `MobileStickyCTA`
17. `RevealController`
18. `JsonLd`

### Product capabilities and routes

- Locale roots՝ `/hy`, `/en`, `/ru`։
- Legal pages՝ localized site routes։
- Admin root և invite-only panel routes՝ `/admin/*`։
- Public APIs՝ leads և bookings։
- SEO surfaces՝ sitemap, robots, localized metadata, JSON-LD, Open Graph։
- Product services՝ lead persistence, notifications, auth, RBAC, audit logs, settings, editable content։

### Token layers

- `primitives.css` — raw palette, type, spacing, layout, radius, shadow, z-index։
- `semantic.css` — theme-aware meaning aliases։
- `components.css` — button/card/header aliases։
- `motion.css` — duration/easing contracts։
- `sections.css` — contrast/spotlight section-scoped product patterns։
- `product-extension.css` — required Webpage-local expression layer introduced by this transaction։

### Existing reusable UI inventory

README/build evidence identifies reusable primitives for:

- Container
- Section
- SectionHeading
- Button / ButtonLink
- Badge
- Card / GlassCard
- IconWrap
- Reveal / RevealController
- FormField
- Select
- TextArea
- Header/Footer/SkipLink
- FAQ disclosure behavior
- Theme and locale controls

### Audit gaps

1. No canonical mapping manifest from local token aliases to D-025 contracts.
2. No explicit version/compatibility record for Design Platform consumption.
3. Product-specific gradient/grid/glass expression is mixed into semantic tokens.
4. Existing product specs are not equal bilingual canonical governance records.
5. No machine-readable adoption record or adoption validator existed.
6. No root continuity files existed before this transaction.
7. Final full-tree hardcode scan and component-state matrix still require automated evidence.

### Preservation rule

The current route and component composition is preserved unless a confirmed accessibility, responsive, token, interaction, or regression defect requires a scoped change.

---

## English

### Public page composition

The composition in `src/app/(site)/[locale]/page.tsx` is:

1. `SkipLink`
2. `Header`
3. `Hero`
4. `Pain`
5. `SolutionOverview`
6. `ServiceBlocks`
7. `BusinessSuccess`
8. `Industries`
9. `Results`
10. `AISection`
11. `HowWeWork`
12. `Trust`
13. `Faq`
14. `CTA`
15. `Footer`
16. `MobileStickyCTA`
17. `RevealController`
18. `JsonLd`

### Product capabilities and routes

- Locale roots: `/hy`, `/en`, and `/ru`.
- Localized legal pages.
- Admin root and invite-only panel routes under `/admin/*`.
- Public lead and booking APIs.
- SEO surfaces: sitemap, robots, localized metadata, JSON-LD, and Open Graph.
- Product services: lead persistence, notifications, authentication, RBAC, audit logs, settings, and editable content.

### Token layers

- `primitives.css` — raw palette, type, spacing, layout, radius, shadow, and z-index.
- `semantic.css` — theme-aware meaning aliases.
- `components.css` — button, card, and header aliases.
- `motion.css` — duration and easing contracts.
- `sections.css` — contrast and spotlight section-scoped product patterns.
- `product-extension.css` — required Webpage-local expression layer introduced by this transaction.

### Existing reusable UI inventory

README and build evidence identify reusable primitives for:

- Container
- Section
- SectionHeading
- Button / ButtonLink
- Badge
- Card / GlassCard
- IconWrap
- Reveal / RevealController
- FormField
- Select
- TextArea
- Header, Footer, and SkipLink
- FAQ disclosure behavior
- Theme and locale controls

### Audit gaps

1. No canonical mapping manifest exists from local token aliases to D-025 contracts.
2. No explicit version or compatibility record exists for Design Platform consumption.
3. Product-specific gradient, grid, and glass expression is mixed into semantic tokens.
4. Existing product specifications are not equal bilingual canonical governance records.
5. No machine-readable adoption record or adoption validator existed.
6. No root continuity files existed before this transaction.
7. Final full-tree hardcode scanning and component-state matrices still require automated evidence.

### Preservation rule

The current route and component composition is preserved unless a confirmed accessibility, responsive, token, interaction, or regression defect requires a scoped change.

<!-- END: MENQ_WEBPAGE_COMPONENT_PAGE_INVENTORY -->
