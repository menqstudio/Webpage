# MenQ Webpage — Project Context / MenQ Webpage — Նախագծի կոնտեքստ

**Status / Կարգավիճակ:** Adoption remediation complete; execution evidence pending / Adoption remediation-ը ավարտված է, execution evidence-ը սպասվում է  
**Owner / Պատասխանատու:** Gevorg Ohanyan, MenQ Owner  
**Repository:** `https://github.com/menqstudio/Webpage`  
**Canonical parent standard:** `menqstudio/MenQ-Standard`  
**Design Platform decision:** `D-025 — MenQ Design Platform Architecture v1`  
**Working branch:** `menq-design-platform-adoption-v1`  
**Draft PR:** `#1`  
**Current verdict:** YELLOW

## Հայերեն

### Նպատակ

MenQ Webpage-ը MenQ Studio-ի public business website և lead-generation product-ն է՝ HY/EN/RU public site, leads/bookings և invite-only admin capability-ներով։

### Architecture boundary

- MenQ Standard-ը և Locked D-025 Design Platform-ը canonical shared source-երն են։
- Webpage-ը governed product consumer է, ոչ Design Platform source of truth։
- Shared design contracts-ը գալիս են D-025-ից։
- Brand expression-ը, marketing composition-ը, business content-ը, routes-ը և lead/admin logic-ը product-local extension են։
- Shared core-ի silent fork/mutation-ը արգելված է։

### Ընթացիկ իրական վիճակ

- Next.js 16, React 19, TypeScript, Tailwind v3, Prisma/PostgreSQL։
- HY/EN/RU, dark/light/system theme, SEO, analytics, leads, bookings, RBAC և audit logging։
- Token order՝ primitives → semantic → components → motion → product extension → sections։
- Product-specific gradient/grid/glass tokens-ը հանվել են semantic layer-ից և տեղափոխվել `product-extension.css`՝ նույն variable names-ով, առանց նախատեսված visual փոփոխության։
- Canonical bilingual governance package, machine adoption record, validator և CI workflow-ը ավելացված են։
- Header drawer, FAQ և Lead Form key interactive accessibility flows-ը static review-ով GREEN են։
- Current-head lint/typecheck/tests/build և runtime theme/locale/responsive evidence դեռ չեն գործարկվել կամ չեն հրապարակվել GitHub Actions-ում։

### Authority և continuation

PR #1-ը մնում է Draft։ Ready/merge/maturity promotion authority չկա։ Հաջորդ gate-ը current-head execution evidence-ն է։ Failure-ի դեպքում fix արվում է միայն reported defect-ը։ GREEN-ի դեպքում final record-ը synchronized է արվում և Owner-ին ներկայացվում է merge decision-ը։

---

## English

### Purpose

MenQ Webpage is MenQ Studio's public business website and lead-generation product, with a HY/EN/RU public site, leads and bookings, and invite-only administration capabilities.

### Architecture boundary

- MenQ Standard and the Locked D-025 Design Platform are the canonical shared sources.
- Webpage is a governed product consumer, not a Design Platform source of truth.
- Shared design contracts come from D-025.
- Brand expression, marketing composition, business content, routes, and lead or admin logic remain product-local extensions.
- Silent forks or mutations of shared core are prohibited.

### Current real state

- Next.js 16, React 19, TypeScript, Tailwind v3, and Prisma/PostgreSQL.
- HY/EN/RU, dark/light/system theme, SEO, analytics, leads, bookings, RBAC, and audit logging.
- Token order: primitives → semantic → components → motion → product extension → sections.
- Product-specific gradient, grid, and glass tokens were removed from the semantic layer and moved to `product-extension.css` with stable variable names and no intended visual change.
- A canonical bilingual governance package, machine adoption record, validator, and CI workflow have been added.
- Key interactive accessibility flows for the Header drawer, FAQ, and Lead Form are GREEN by static review.
- Current-head lint, typecheck, tests, build, and runtime theme, locale, and responsive evidence have not yet executed or appeared in GitHub Actions.

### Authority and continuation

PR #1 remains Draft. Ready, merge, and maturity-promotion authority are absent. The next gate is current-head execution evidence. On failure, only reported defects are fixed. On GREEN, the final record is synchronized and the merge decision is presented to the Owner.

<!-- END: MENQ_WEBPAGE_PROJECT_CONTEXT -->
