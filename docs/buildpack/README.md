# AI Business Landing Page Build Pack

## Purpose
This pack defines a production-ready public landing page for a business-focused AI, automation, and custom software solutions company. The page is designed to attract new clients, explain business value clearly, and guide visitors toward a consultation request.

## Core positioning
Խելացի համակարգեր բիզնեսի աճի համար։

The page sells business outcomes, not just software development:
- cost reduction,
- time savings,
- new customer acquisition,
- operational control,
- business visibility,
- scalable digital infrastructure.

## Confirmed build direction
- Public business landing page.
- Armenian, English, and Russian language support.
- Market: Armenia, diaspora, and international clients.
- Primary CTA: Ստանալ անվճար խորհրդատվություն.
- Secondary CTA: Տեսնել լուծումները / Դիտել ծառայությունները.
- Design: premium AI business tech, dark/light capable, slightly futuristic but not excessive.
- Stack assumption: Next.js + TypeScript + Tailwind CSS + component-based architecture.
- Lead form destination: Email + Telegram.
- Deployment target: unspecified, keep deploy layer portable.
- Documentation level: pixel-level build guidance.
- Design system: fully tokenized, zero hardcoded visual values.

## Non-negotiable rules
1. No hardcoded design values in components.
2. All visual decisions must come from design tokens.
3. All text must be cleanly localized by language.
4. Armenian copy must be Armenian; English copy must be English; Russian copy must be Russian. Do not mix languages inside the same localized copy unless the term is a brand, product, or unavoidable technical standard.
5. The builder should continue without blocking. Unknown real-world values must be logged in `OPEN_ITEMS_LOG.md` and implemented with safe placeholders.
6. Testimonials and real case studies are excluded for now.
7. Certifications should be mentioned carefully without forcing certificate display until final assets are available.

## Folder contents
- `MVP_SCOPE.md` — what is included in the first release.
- `PROJECT_STRUCTURE.md` — recommended Next.js structure.
- `FEATURE_SPEC.md` — functional requirements.
- `UI_PAGE_STRUCTURE.md` — section-by-section page structure.
- `UX_FLOW.md` — visitor journey and conversion path.
- `COMPONENT_SPEC.md` — reusable component specification.
- `DESIGN_TOKENS.md` — complete tokenized design system.
- `RESPONSIVE_RULES.md` — responsive behavior.
- `INTERACTION_RULES.md` — animation, hover, motion, accessibility.
- `CONTENT_COPY.md` — production copy in Armenian plus localization rules.
- `SEO_CONTENT.md` — SEO structure and metadata strategy.
- `FORM_AND_LEAD_FLOW.md` — lead form and notification flow.
- `TRUST_SECURITY_NOTES.md` — trust, privacy, security, AI data handling.
- `DATABASE_SCHEMA.md` — lead form schema and optional CRM handoff schema.
- `IMPLEMENTATION_NOTES.md` — build guidance and engineering rules.
- `QA_SECURITY_RELEASE.md` — QA, security, release checklist.
- `BUILD_CHECKLIST.md` — step-by-step builder checklist.
- `DEPLOYMENT_OPERATIONS.md` — deploy and operations guidance.
- `PRODUCTION_ROADMAP.md` — roadmap from MVP to full production.
- `BUILDER_HANDOFF.md` — instructions for a developer or AI builder.
- `OPEN_ITEMS_LOG.md` — unresolved values and placeholders.
- `NEXTJS_STARTER_STRUCTURE/TREE.md` — recommended app structure.
