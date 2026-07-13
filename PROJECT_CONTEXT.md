# MenQ Webpage — Project Context / MenQ Webpage — Նախագծի կոնտեքստ

**Status / Կարգավիճակ:** Visual implementation complete — final CI pending / Visual implementation-ն ավարտված է — final CI-ն սպասվում է  
**Owner / Պատասխանատու:** Gevorg Ohanyan, MenQ Owner  
**Repository:** `menqstudio/Webpage`  
**Parent standard:** `menqstudio/MenQ-Standard`  
**Decision:** Locked `D-025`  
**Branch:** `menq-design-platform-adoption-v1`  
**PR:** `#1`

## Հայերեն

### Product identity

MenQ Webpage-ը public business website և lead-generation product է՝ HY/EN/RU, leads/bookings և invite-only admin capability-ներով։

### Authority boundary

- MenQ Standard/D-025-ը shared authority-ն են։
- Webpage-ը governed consumer է։
- Brand expression, marketing composition, copy, routes և business logic-ը product-local են։
- Silent fork կամ incompatible shared-core mutation արգելված է։

### Current implementation

- Next.js 16, React 19, TypeScript, Tailwind v3, Prisma/PostgreSQL։
- Token chain՝ primitives → semantic → components → motion → product extension → patterns։
- Shared `BrandMark`, premium primitives և public/admin visual foundation։
- Full hero/header/admin-shell migration և existing section system-ի premium treatment։
- Protected scope՝ routes, locales, APIs, DB schema, auth/session/RBAC, notifications, analytics և SEO contracts։

### Validation rule

Final authority-ն GitHub Actions final head-ն է։ RED-ի դեպքում ուղղվում է միայն reported defect-ը։ GREEN-ից հետո final evidence-ը synchronized է արվում, PR-ը ready է դառնում և merge-ը կատարվում է Owner-ի explicit instruction-ով։

---

## English

### Product identity

MenQ Webpage is the public business website and lead-generation product, with HY/EN/RU, leads and bookings, and invite-only administration capabilities.

### Authority boundary

- MenQ Standard and D-025 are the shared authority.
- Webpage is a governed consumer.
- Brand expression, marketing composition, copy, routes, and business logic remain product-local.
- Silent forks or incompatible shared-core mutations are prohibited.

### Current implementation

- Next.js 16, React 19, TypeScript, Tailwind v3, and Prisma/PostgreSQL.
- Token chain: primitives → semantic → components → motion → product extension → patterns.
- Shared `BrandMark`, premium primitives, and a public and admin visual foundation.
- Complete hero, header, and admin-shell migration plus premium treatment for the existing section system.
- Protected scope: routes, locales, APIs, database schema, authentication, session and RBAC, notifications, analytics, and SEO contracts.

### Validation rule

The final authority is GitHub Actions on the final head. On RED, only the reported defect is fixed. After GREEN, final evidence is synchronized, the PR is marked ready, and the merge is executed under explicit Owner instruction.

<!-- END: MENQ_WEBPAGE_PROJECT_CONTEXT -->
