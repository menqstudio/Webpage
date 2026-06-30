# Project Structure

## Recommended stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Token-based design system
- Component-based architecture
- Locale-aware routing
- Server action or API route for lead form submission
- Email + Telegram notification integration

## Recommended high-level structure
```txt
src/
  app/
    [locale]/
      page.tsx
      layout.tsx
      loading.tsx
      error.tsx
    api/
      leads/
        route.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      Section.tsx
      Container.tsx
    landing/
      HeroSection.tsx
      PainSection.tsx
      SolutionOverviewSection.tsx
      ServiceBlocksSection.tsx
      BusinessSuccessSection.tsx
      IndustriesSection.tsx
      ResultsSection.tsx
      AISection.tsx
      HowWeWorkSection.tsx
      TrustSection.tsx
      FAQSection.tsx
      CTASection.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      GlassCard.tsx
      SectionHeading.tsx
      IconWrap.tsx
      FormField.tsx
      SelectField.tsx
      TextArea.tsx
      AnimatedGrid.tsx
      WorkflowVisual.tsx
      DashboardMockup.tsx
  content/
    locales/
      hy.ts
      en.ts
      ru.ts
  config/
    site.ts
    navigation.ts
    services.ts
    industries.ts
    faq.ts
    contact.ts
  lib/
    tokens/
      theme.css
      semantic.css
      motion.css
    forms/
      validation.ts
      submitLead.ts
    integrations/
      email.ts
      telegram.ts
    seo/
      metadata.ts
  styles/
    globals.css
```

## Key principle
Components must consume content and tokens. Components must not contain business copy or hardcoded visual values.

## Content separation
All displayed text must come from `content/locales/*` or structured config files. This keeps Armenian, English, and Russian cleanly separated.

## Token separation
All design values must be defined in token files:
- color tokens,
- typography tokens,
- spacing tokens,
- radius tokens,
- shadow tokens,
- border tokens,
- z-index tokens,
- motion tokens,
- layout tokens,
- component tokens.

## Suggested route model
```txt
/hy
/en
/ru
```

Default locale can redirect to `/hy` or use browser preference. If the first release is Armenian-only visually, keep `/en` and `/ru` structurally ready.

## Component ownership
- `layout/*` controls global page frame.
- `landing/*` controls sections.
- `ui/*` controls reusable atomic and molecule components.
- `config/*` controls structured arrays.
- `content/locales/*` controls language copy.
- `lib/integrations/*` controls backend integrations.

## No-hardcode enforcement
Do not write arbitrary values like `text-[17px]`, `p-[37px]`, `#00BFFF`, `rounded-[18px]`, or `duration-[420ms]` inside components.

Allowed:
```tsx
className="bg-surface-primary text-content-primary rounded-card shadow-card"
```

Not allowed:
```tsx
className="bg-[#071527] text-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,.3)]"
```
