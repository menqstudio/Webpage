# MenQ Webpage — Project Context / MenQ Webpage — Նախագծի կոնտեքստ

**Status / Կարգավիճակ:** Design Platform adoption audit in progress / Design Platform adoption audit-ը ընթացքի մեջ է  
**Owner / Պատասխանատու:** Gevorg Ohanyan, MenQ Owner  
**Repository:** `https://github.com/menqstudio/Webpage`  
**Canonical parent standard:** `menqstudio/MenQ-Standard`  
**Design Platform decision:** `D-025 — MenQ Design Platform Architecture v1`  
**Working branch:** `menq-design-platform-adoption-v1`  
**Draft PR:** `#1`

## Հայերեն

### Նպատակ

MenQ Webpage-ը MenQ Studio-ի public business website և lead-generation product-ն է։ Այն ներկայացնում է AI, automation և custom software ծառայությունները, ընդունում է leads/bookings և ներառում է invite-only admin capability։

### Architecture boundary

- MenQ Standard-ը և Locked D-025 Design Platform-ը canonical shared source-երն են։
- Webpage repository-ն product consumer է, ոչ Design Platform source of truth։
- Shared design contracts, token dependency direction, component behavior, accessibility, localization, motion և validation rules-ը գալիս են D-025-ից։
- MenQ Webpage-ի brand expression-ը, marketing composition-ը, business content-ը, routes-ը, lead/admin logic-ը և product-specific visual choices-ը մնում են product-local extension boundary-ում։
- Shared core-ը silently fork կամ mutate անել չի թույլատրվում։

### Ընթացիկ իրական վիճակ

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v3։
- Prisma + PostgreSQL backend և invite-only admin panel։
- Public website՝ Armenian, English և Russian locale-ներով։
- Dark/light themes, SEO, analytics hooks, leads, bookings, RBAC և audit logging։
- Existing local token stack՝ primitives → semantic → components → sections/motion։
- Existing product specs՝ `docs/SPEC.md`, `docs/WIREFRAME.md`, build and release documentation։
- Design Platform package/version linkage և governed adoption evidence դեռ canonical ձևով գրանցված չէ։

### Current transaction

1. ամբողջ repository inventory և baseline validation,
2. existing documentation preservation և canonical governance package,
3. D-025 mapping և product-extension boundary,
4. token/component/page/accessibility/motion audit,
5. code remediation միայն confirmed defects-ի համար,
6. machine-readable evidence և CI gates,
7. GREEN validation record,
8. merge միայն explicit Owner authority-ով։

---

## English

### Purpose

MenQ Webpage is the public business website and lead-generation product for MenQ Studio. It presents AI, automation, and custom-software services, accepts leads and bookings, and includes invite-only administration capabilities.

### Architecture boundary

- MenQ Standard and the Locked D-025 Design Platform are the canonical shared sources.
- The Webpage repository is a product consumer, not a Design Platform source of truth.
- Shared design contracts, token dependency direction, component behavior, accessibility, localization, motion, and validation rules come from D-025.
- MenQ Webpage brand expression, marketing composition, business content, routes, lead/admin logic, and product-specific visual choices remain inside the product-local extension boundary.
- Silent forks or mutations of the shared core are prohibited.

### Current real state

- Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v3.
- Prisma + PostgreSQL backend with an invite-only admin panel.
- Public website with Armenian, English, and Russian locales.
- Dark/light themes, SEO, analytics hooks, leads, bookings, RBAC, and audit logging.
- Existing local token stack: primitives → semantic → components → sections/motion.
- Existing product specifications in `docs/SPEC.md`, `docs/WIREFRAME.md`, and build/release documentation.
- Governed Design Platform package/version linkage and adoption evidence are not yet recorded canonically.

### Current transaction

1. complete repository inventory and baseline validation,
2. preserve existing documentation and add a canonical governance package,
3. map the product to D-025 and define the product-extension boundary,
4. audit tokens, components, pages, accessibility, and motion,
5. remediate only confirmed defects,
6. add machine-readable evidence and CI gates,
7. produce a GREEN validation record,
8. merge only with explicit Owner authority.

<!-- END: MENQ_WEBPAGE_PROJECT_CONTEXT -->
