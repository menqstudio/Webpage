# PERFORMANCE_BUDGET.md

# Performance Budget Specification

## Purpose

The landing page must look premium and tech-driven while staying fast and production-ready.

## Lighthouse Targets

```text
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

## Core Rule

```text
A beautiful landing page that loads slowly loses leads.
```

## JavaScript Budget

```text
Keep client-side JavaScript minimal
Prefer server components where possible
Avoid heavy animation libraries unless required
Lazy-load non-critical components
```

Avoid:

```text
Large unused UI libraries
Heavy 3D libraries for simple visuals
Client-only rendering for static content
Large animation bundles
```

## Image Optimization

```text
Use Next.js Image where possible
Use AVIF/WebP where possible
Compress large images
Use responsive image sizes
Lazy-load below-the-fold images
Add width and height to avoid layout shift
```

## Font Loading

```text
Use limited font families
Use font-display swap
Preload only critical fonts
Avoid too many font weights
```

## Animation Budget

Allowed:

```text
Subtle hover
Cards fade-in
Smooth scroll
Glowing lines
Small dashboard motion
```

Avoid:

```text
Constant heavy background animation
Large particle engine unless optimized
Layout-triggering animation
```

Prefer animating:

```text
transform
opacity
```

## CSS Rules

Use tokenized design system. No hardcoded visual values.

Tokens required for:

```text
colors
spacing
radius
shadow
typography
breakpoints
motion
z-index
```

## Core Web Vitals

```text
LCP: under 2.5s
INP: under 200ms
CLS: under 0.1
```

## Third-Party Scripts

Allowed if needed:

```text
GA4/GTM
Calendly placeholder
Optional Meta Pixel later
```

Load non-critical scripts after page load where possible.

## Admin Performance

Admin lists must use:

```text
Pagination
Filtering
Search
Loading states
Empty states
Error states
```

## Checklist

```text
[ ] Lighthouse Performance 90+
[ ] Images optimized
[ ] Fonts optimized
[ ] No heavy animation libraries by default
[ ] Below-fold assets lazy-loaded
[ ] Third-party scripts minimized
[ ] Core Web Vitals checked
[ ] No large unused dependencies
[ ] Admin lists paginated
[ ] Static content server-rendered where possible
```
