# Implementation Notes

## Stack
Recommended:
- Next.js
- TypeScript
- Tailwind CSS
- CSS variable design tokens
- App Router
- Server route for lead submission

## Build principle
Build with components, content config, and design tokens. Do not build a static hardcoded page.

## Token implementation
1. Create global token CSS files.
2. Map tokens into Tailwind config.
3. Use semantic class names.
4. Audit for hardcoded visual values.

## Localization implementation
Create locale content files:
- `hy.ts`
- `en.ts`
- `ru.ts`

Each should export the same structure. Example:
```ts
export const landing = {
  hero: {
    eyebrow: '',
    title: '',
    description: '',
    primaryCta: '',
    secondaryCta: '',
  },
};
```

## Theme implementation
- Use `data-theme="dark"` and `data-theme="light"` on root element.
- Respect system preference.
- Store user preference in local storage.
- Avoid duplicate color classes; use semantic tokens.

## Form implementation
- Use client component for form interactivity.
- Use server route/API for submit.
- Validate server-side.
- Send Email + Telegram.
- Use environment variables.

## Animation implementation
Recommended library options:
- CSS only for basic transitions.
- Framer Motion for scroll reveal if already accepted.

Keep animation restrained. Respect reduced motion.

## SEO implementation
- Use Next metadata API.
- Add locale alternates.
- Add FAQ schema.
- Add Organization schema.

## Performance rules
- Avoid heavy animation libraries unless needed.
- Optimize fonts.
- Use static content where possible.
- Do not load unnecessary third-party scripts.
- Keep hero visual lightweight.

## Accessibility rules
- Semantic headings.
- Single H1.
- Visible focus states.
- Correct form labels.
- Keyboard accessible FAQ.
- Sufficient contrast in both themes.

## Open item handling
The builder must not stop for missing business values. Use placeholders and log in `OPEN_ITEMS_LOG.md`.

Examples:
- company name,
- logo,
- real contacts,
- certificate names,
- deployment target,
- final English/Russian translations.

## No hardcode audit command ideas
Search manually or with scripts for:
- hex colors,
- arbitrary Tailwind values,
- raw px values,
- inline styles.

All exceptions must be justified in code comments and ideally limited to token files or SVG geometry.
