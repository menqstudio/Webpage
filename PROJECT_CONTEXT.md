# MenQ Webpage — Project Context / Նախագծի կոնտեքստ

**Status / Կարգավիճակ:** Active — implementation merged and validated / Ակտիվ — implementation-ը merge և validate է արված  
**Owner / Պատասխանատու:** Gevorg Ohanyan  
**Repository:** `menqstudio/Webpage`  
**Parent standard:** `menqstudio/MenQ-Standard`  
**Design authority:** Locked `D-025`  
**Implementation merge:** `d985a5718ed7ec47717fdf271d14580e8eb947cb`

## Հայերեն

### Product identity
MenQ Webpage-ը MenQ Studio-ի public business website և lead-generation product-ն է։ Այն ունի HY/EN/RU locale-ներ, leads, bookings, SEO, analytics hooks և invite-only admin panel։

### Technology
Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v3, Prisma և PostgreSQL։

### Architecture boundary
- MenQ Standard-ը shared operating authority-ն է։
- Locked D-025-ը shared design authority-ն է։
- Webpage-ը consumer է, ոչ Design Platform source of truth։
- Brand, copy, routes, lead/admin workflows և product-specific visuals-ը product-local են։
- API, database, auth/session/RBAC, notifications և integrations semantics-ը protected runtime scope են։

### Current state
- Design migration merge է արված PR #1-ով։
- Token chain-ը՝ primitives → semantic → components → motion → product extension → sections/patterns։
- Shared `BrandMark`, premium public/admin foundation, light/dark/system և reduced-motion support կան։
- Validator, lint, typecheck, 24 tests և production build GREEN են։
- Adoption maturity-ն մնում է M1-candidate։

## English

### Product identity
MenQ Webpage is MenQ Studio's public business website and lead-generation product. It supports HY/EN/RU locales, leads, bookings, SEO, analytics hooks, and an invite-only administration panel.

### Technology
Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v3, Prisma, and PostgreSQL.

### Architecture boundary
- MenQ Standard is the shared operating authority.
- Locked D-025 is the shared design authority.
- Webpage is a consumer, not the Design Platform source of truth.
- Brand, copy, routes, lead/admin workflows, and product-specific visuals remain product-local.
- API, database, authentication/session/RBAC, notifications, and integration semantics are protected runtime scope.

### Current state
- The design migration was merged through PR #1.
- Token chain: primitives → semantic → components → motion → product extension → sections/patterns.
- Shared `BrandMark`, premium public/admin foundation, light/dark/system, and reduced-motion support are implemented.
- Validator, lint, typecheck, 24 tests, and production build are GREEN.
- Adoption maturity remains M1-candidate.

<!-- END: MENQ_WEBPAGE_PROJECT_CONTEXT -->
