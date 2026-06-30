# ACCESSIBILITY_SPEC.md

# Accessibility Specification

## Purpose

The public page and admin panel must be premium, readable, keyboard-friendly, and accessible.

## Target

```text
Lighthouse Accessibility: 95+
```

## Core Rules

```text
Use semantic HTML
Use accessible buttons and links
Use proper headings
Use readable contrast
Support keyboard navigation
Show visible focus states
Provide form labels
Provide form error messages
Respect reduced motion preference
Add alt text to meaningful images
Do not rely on color alone
```

## Heading Structure

```text
One h1 per page
Section titles use h2
Card titles use h3
Nested content uses h4 only if needed
```

## Keyboard Navigation

Must support:

```text
Header navigation
Language switcher
CTA buttons
Forms
FAQ accordion
Admin tables
Dropdowns
Modals
Drawers
```

## Focus States

All focus states must use design tokens. No hardcoded focus colors.

Example tokens:

```text
--focus-ring-color
--focus-ring-width
--focus-ring-offset
```

## Contrast

```text
Normal text: 4.5:1
Large text: 3:1
UI controls: 3:1
```

## Motion

Animations must support reduced motion.

Allowed:

```text
Subtle hover
Cards fade-in
Glowing lines
Smooth scroll
Small dashboard motion
```

Avoid:

```text
Fast flashing
Heavy parallax
Constant distracting motion
Motion that blocks reading
```

## Forms

Every field needs:

```text
Visible label or accessible label
Clear placeholder
Validation message
Error state
Success state
```

Do not use placeholder as the only label.

## Language Attributes

```html
<html lang="hy">
<html lang="en">
<html lang="ru">
```

## Modals and Drawers

```text
Trap focus
Close with Escape
Restore focus after close
Provide accessible title
```

## Checklist

```text
[ ] One h1 per page
[ ] Semantic sections
[ ] Correct lang attribute
[ ] Keyboard navigation works
[ ] Visible focus states
[ ] Form labels and errors
[ ] Alt text for meaningful images
[ ] Reduced motion support
[ ] Color contrast checked
[ ] Accessible modals/drawers
[ ] Lighthouse Accessibility 95+
```
