# Design Tokens

## Absolute rule
The design system must be tokenized. There must be **zero hardcoded visual values** inside page components.

Do not hardcode:
- hex colors,
- RGB values,
- pixel spacing,
- font sizes,
- radii,
- shadows,
- animation durations,
- z-index values,
- gradients,
- border values,
- layout max widths.

All values must come from global, semantic, or component tokens.

## Token architecture
Use three token layers:

### 1. Primitive tokens
Raw values.
Example:
```css
--blue-500: #2563eb;
--space-6: 1.5rem;
```

### 2. Semantic tokens
Meaning-based values.
Example:
```css
--color-surface-primary: var(--neutral-0);
--color-action-primary: var(--blue-500);
```

### 3. Component tokens
Component-specific aliases.
Example:
```css
--button-primary-bg: var(--color-action-primary);
--card-radius: var(--radius-xl);
```

Components should mostly consume semantic and component tokens.

## Theme modes
Two themes are required:

### Dark mode
Direction:
- Dark navy base,
- electric blue accent,
- cyan highlights,
- glass cards,
- subtle glowing lines.

### Light mode
Direction:
- white clean base,
- blue accent,
- dark sections for contrast,
- premium business feel.

## Primitive color tokens
```css
:root {
  --neutral-0: #ffffff;
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
  --neutral-950: #020617;

  --blue-400: #38bdf8;
  --blue-500: #0ea5e9;
  --blue-600: #0284c7;
  --cyan-300: #67e8f9;
  --cyan-400: #22d3ee;
  --cyan-500: #06b6d4;
  --violet-500: #8b5cf6;
  --green-500: #22c55e;
  --amber-500: #f59e0b;
  --red-500: #ef4444;
}
```

The exact primitive values can change, but must remain centralized.

## Semantic theme tokens
### Light theme
```css
:root[data-theme="light"] {
  --color-page-bg: var(--neutral-0);
  --color-surface-primary: var(--neutral-0);
  --color-surface-secondary: var(--neutral-50);
  --color-surface-muted: var(--neutral-100);
  --color-surface-inverse: var(--neutral-950);

  --color-content-primary: var(--neutral-950);
  --color-content-secondary: var(--neutral-700);
  --color-content-muted: var(--neutral-500);
  --color-content-inverse: var(--neutral-0);

  --color-border-subtle: var(--neutral-200);
  --color-border-strong: var(--neutral-300);

  --color-action-primary: var(--blue-600);
  --color-action-primary-hover: var(--blue-500);
  --color-action-secondary: var(--neutral-900);
  --color-accent: var(--cyan-500);

  --color-focus-ring: var(--blue-500);
}
```

### Dark theme
```css
:root[data-theme="dark"] {
  --color-page-bg: var(--neutral-950);
  --color-surface-primary: var(--neutral-900);
  --color-surface-secondary: var(--neutral-800);
  --color-surface-muted: color-mix(in srgb, var(--neutral-900) 72%, var(--blue-600) 28%);
  --color-surface-inverse: var(--neutral-0);

  --color-content-primary: var(--neutral-0);
  --color-content-secondary: var(--neutral-200);
  --color-content-muted: var(--neutral-400);
  --color-content-inverse: var(--neutral-950);

  --color-border-subtle: color-mix(in srgb, var(--neutral-0) 12%, transparent);
  --color-border-strong: color-mix(in srgb, var(--cyan-400) 32%, transparent);

  --color-action-primary: var(--blue-500);
  --color-action-primary-hover: var(--cyan-400);
  --color-action-secondary: var(--neutral-0);
  --color-accent: var(--cyan-400);

  --color-focus-ring: var(--cyan-400);
}
```

## Typography tokens
```css
:root {
  --font-family-sans: var(--font-inter), system-ui, sans-serif;
  --font-family-display: var(--font-inter), system-ui, sans-serif;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;

  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

## Spacing tokens
```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

## Layout tokens
```css
:root {
  --container-narrow: 48rem;
  --container-default: 72rem;
  --container-wide: 84rem;
  --space-page-x: var(--space-6);
  --size-header-height: 4.5rem;
  --section-padding-sm: var(--space-16);
  --section-padding-md: var(--space-20);
  --section-padding-lg: var(--space-24);
  --section-padding-xl: var(--space-32);
}
```

## Radius tokens
```css
:root {
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 2rem;
  --radius-pill: 999rem;
  --radius-card: var(--radius-2xl);
  --radius-button: var(--radius-pill);
}
```

## Shadow tokens
```css
:root {
  --shadow-sm: 0 1px 2px rgb(15 23 42 / 0.08);
  --shadow-md: 0 12px 30px rgb(15 23 42 / 0.10);
  --shadow-lg: 0 24px 70px rgb(15 23 42 / 0.16);
  --shadow-glow: 0 0 40px color-mix(in srgb, var(--color-accent) 24%, transparent);
  --shadow-card: var(--shadow-md);
}
```

## Glass tokens
```css
:root {
  --glass-bg: color-mix(in srgb, var(--color-surface-primary) 72%, transparent);
  --glass-border: 1px solid var(--color-border-subtle);
  --glass-blur: 18px;
  --glass-shadow: var(--shadow-lg);
}
```

## Motion tokens
```css
:root {
  --duration-fast: 150ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --duration-section: 700ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --motion-hover-lift: translateY(-2px);
  --motion-card-lift: translateY(-4px);
}
```

## Z-index tokens
```css
:root {
  --z-base: 0;
  --z-raised: 10;
  --z-header: 50;
  --z-drawer: 80;
  --z-modal: 100;
  --z-toast: 120;
}
```

## Component tokens
### Button
```css
:root {
  --button-height-md: 3rem;
  --button-height-lg: 3.5rem;
  --button-padding-x-md: var(--space-5);
  --button-padding-x-lg: var(--space-6);
  --button-radius: var(--radius-button);
  --button-primary-bg: var(--color-action-primary);
  --button-primary-bg-hover: var(--color-action-primary-hover);
  --button-primary-text: var(--color-content-inverse);
}
```

### Card
```css
:root {
  --card-bg: var(--color-surface-primary);
  --card-border: 1px solid var(--color-border-subtle);
  --card-radius: var(--radius-card);
  --card-padding: var(--space-6);
  --card-shadow: var(--shadow-card);
}
```

### Header
```css
:root {
  --header-bg: color-mix(in srgb, var(--color-page-bg) 82%, transparent);
  --header-border: 1px solid var(--color-border-subtle);
  --header-blur: 16px;
}
```

## Tailwind mapping requirement
Tailwind theme must map to CSS variables. Example:
```ts
colors: {
  page: 'var(--color-page-bg)',
  surface: {
    primary: 'var(--color-surface-primary)',
    secondary: 'var(--color-surface-secondary)',
    muted: 'var(--color-surface-muted)',
    inverse: 'var(--color-surface-inverse)',
  },
  content: {
    primary: 'var(--color-content-primary)',
    secondary: 'var(--color-content-secondary)',
    muted: 'var(--color-content-muted)',
    inverse: 'var(--color-content-inverse)',
  },
  action: {
    primary: 'var(--color-action-primary)',
    hover: 'var(--color-action-primary-hover)',
  },
}
```

## Hardcode audit checklist
Search the codebase for:
- `#[0-9A-Fa-f]{3,8}`
- `rgb(`
- `rgba(`
- arbitrary Tailwind values with `[`
- pixel values in class names
- direct CSS values inside components

Allowed exceptions:
- token definition files,
- SVG path geometry values,
- third-party embed code if unavoidable and isolated.
