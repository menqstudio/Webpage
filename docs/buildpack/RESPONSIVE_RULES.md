# Responsive Rules

## Breakpoint tokens
Breakpoints must be centralized in Tailwind config and documentation.

Recommended:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Do not use custom one-off breakpoints inside components unless added to token/config layer.

## Layout principles
- Mobile-first implementation.
- Desktop layouts can use two columns and grids.
- Mobile layouts must stack cleanly.
- No horizontal overflow.
- CTA must remain visible and easy to tap.

## Header
### Desktop
- Full nav visible.
- CTA visible.
- Language/theme controls visible.

### Tablet
- Nav may remain visible if enough width; otherwise switch to drawer.

### Mobile
- Logo + compact CTA or only logo + menu.
- Drawer includes nav, CTA, language switcher, theme switcher.

## Hero
### Desktop
- Two columns: copy left, visual right.
- Visual can overlap subtly with background grid.

### Tablet
- Keep two columns only if readable.
- Otherwise stack.

### Mobile
- Copy first.
- CTA buttons stack or full-width.
- Visual below copy, simplified.

## Grids
### Pain cards
- Desktop: 3 columns.
- Tablet: 2 columns.
- Mobile: 1 column.

### Service blocks
- Desktop: 2 columns.
- Tablet/mobile: 1 column.

### Industry groups
- Desktop: 3 or 2 columns depending content length.
- Tablet: 2 columns.
- Mobile: 1 column.

### Results
- Desktop: 3 columns.
- Tablet: 2 columns.
- Mobile: 1 column.

## Section spacing
Use section padding tokens.
Reduce vertical spacing on mobile but keep premium breathing room.

Suggested:
- Desktop large sections: `--section-padding-lg` or `--section-padding-xl`.
- Tablet: `--section-padding-md`.
- Mobile: `--section-padding-sm`.

## Typography scaling
Hero H1 must scale:
- Mobile: large but not oversized.
- Desktop: premium large display.

Use tokens/classes mapped to tokens. Do not use arbitrary font sizes.

## Form responsiveness
- Desktop: form card beside CTA copy.
- Mobile: form below copy.
- Inputs full-width.
- Tap targets minimum 44px.

## Visual complexity control
On mobile:
- reduce animated background intensity,
- hide non-essential decorative nodes,
- keep dashboard mockup simplified,
- ensure fast load.

## Accessibility
- Text contrast must pass WCAG AA.
- Interactive targets must be tappable.
- Reduced motion must disable non-essential animation.
