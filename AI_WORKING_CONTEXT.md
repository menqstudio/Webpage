# MenQ Webpage — AI Working Context / MenQ Webpage — AI աշխատանքային կոնտեքստ

**Status / Կարգավիճակ:** Current / Ընթացիկ  
**Owner / Պատասխանատու:** Gevorg Ohanyan  
**Working branch:** `menq-design-platform-adoption-v1`  
**Draft PR:** `#1`

## Հայերեն

### Պարտադիր մեկնարկ

1. Կարդալ `PROJECT_CONTEXT.md`, այս file-ը, `NEXT_CHAT_HANDOFF.md`, `ROADMAP.md`, `CHANGELOG.md`։
2. Կարդալ `docs/menq-standard/README.md` և referenced audit/adoption files-ը։
3. Active PR-ի դեպքում ստուգել metadata, changed files, diff, comments/review threads և checks։
4. MenQ Standard-ի shared truth-ը repository memory-ից չհորինել․ անհրաժեշտ shared contract-ը կարդալ canonical `menqstudio/MenQ-Standard` repository-ից։

### Current task

Existing MenQ Webpage-ը migration է անցնում Locked D-025 MenQ Design Platform-ի governed consumer model-ին։ Նպատակը նորից app կառուցելը չէ։ Existing routes, content, backend, admin, leads, bookings, security և integrations-ը պահպանվում են, եթե audit-ը defect չի ապացուցում։

### Known baseline

- Stack՝ Next.js 16, React 19, TypeScript, Tailwind v3, Prisma/PostgreSQL։
- Public locale-ներ՝ HY/EN/RU։
- Main landing composition՝ Header, Hero, Pain, Solution Overview, Services, Business Success, Industries, Results, AI, How We Work, Trust, FAQ, CTA, Footer։
- Existing token files՝ `src/styles/tokens/primitives.css`, `semantic.css`, `components.css`, `motion.css`, `sections.css`։
- Existing documentation-ը պահվում է որպես historical/product evidence և չի ջնջվում առանց Owner approval-ի։

### Current audit findings

- Local token dependency direction-ը conceptually aligned է D-025-ի Reference/Primitive → Semantic → Component direction-ին։
- Current repository-ն ինքն իրեն ներկայացնում է որպես fully tokenized, բայց canonical Design Platform version/package linkage չկա։
- Product-specific gradients, glass expression և section composition-ը պետք է explicitly գրանցվեն որպես Product Extension, ոչ shared core։
- Existing specs հիմնականում Armenian-first են և canonical bilingual governance parity չունեն։
- Root AI continuity/governance files բացակայում էին և այժմ ավելացվում են։

### Authority boundary

AI-ն կարող է audit անել, documentation/code draft անել, validator գործարկել և PR պատրաստել։ AI-ն չի կարող PR merge անել կամ adoption maturity-ն M3/M4/M5 հայտարարել առանց evidence և explicit Owner authority-ի։

---

## English

### Mandatory startup

1. Read `PROJECT_CONTEXT.md`, this file, `NEXT_CHAT_HANDOFF.md`, `ROADMAP.md`, and `CHANGELOG.md`.
2. Read `docs/menq-standard/README.md` and its referenced audit/adoption files.
3. For an active PR, inspect metadata, changed files, diff, comments/review threads, and checks.
4. Do not invent shared MenQ Standard truth from memory; read required contracts from the canonical `menqstudio/MenQ-Standard` repository.

### Current task

The existing MenQ Webpage is being migrated into the governed-consumer model of the Locked D-025 MenQ Design Platform. This is not a rebuild. Existing routes, content, backend, admin, leads, bookings, security, and integrations are preserved unless the audit proves a defect.

### Known baseline

- Stack: Next.js 16, React 19, TypeScript, Tailwind v3, Prisma/PostgreSQL.
- Public locales: HY/EN/RU.
- Main landing composition: Header, Hero, Pain, Solution Overview, Services, Business Success, Industries, Results, AI, How We Work, Trust, FAQ, CTA, Footer.
- Existing token files: `src/styles/tokens/primitives.css`, `semantic.css`, `components.css`, `motion.css`, and `sections.css`.
- Existing documentation is preserved as historical/product evidence and is not deleted without Owner approval.

### Current audit findings

- The local token dependency direction is conceptually aligned with D-025 Reference/Primitive → Semantic → Component direction.
- The repository describes itself as fully tokenized, but canonical Design Platform version/package linkage is absent.
- Product-specific gradients, glass expression, and section composition must be explicitly recorded as Product Extensions rather than shared core.
- Existing specifications are primarily Armenian-first and do not provide canonical bilingual governance parity.
- Root AI continuity/governance files were absent and are now being added.

### Authority boundary

AI may audit, draft documentation/code, execute validators, and prepare a PR. AI may not merge the PR or declare M3/M4/M5 adoption maturity without evidence and explicit Owner authority.

<!-- END: MENQ_WEBPAGE_AI_WORKING_CONTEXT -->
