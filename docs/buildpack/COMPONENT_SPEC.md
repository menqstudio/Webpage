# Component Spec

## Global component rules
1. Components must be reusable.
2. Components must accept content as props or from config.
3. Components must not hardcode text copy.
4. Components must not hardcode visual values.
5. Components must use design tokens and semantic Tailwind classes mapped to tokens.

## Core UI components

### Container
Controls max width and horizontal padding.
Props:
- `size`: `default | narrow | wide | full`
- `children`

Token usage:
- `--container-default`
- `--container-narrow`
- `--container-wide`
- `--space-page-x`

### Section
Generic section wrapper.
Props:
- `variant`: `light | dark | muted | gradient`
- `spacing`: `sm | md | lg | xl`
- `id`

### SectionHeading
Reusable heading block.
Props:
- `eyebrow`
- `title`
- `description`
- `align`: `left | center`

### Button
Variants:
- `primary`
- `secondary`
- `ghost`
- `outline`

Sizes:
- `sm`
- `md`
- `lg`

States:
- default,
- hover,
- active,
- focus,
- disabled,
- loading.

No hardcoded colors. Use semantic button tokens.

### Badge
Used for hero badge, trust tags, service tags.
Variants:
- `neutral`
- `accent`
- `glass`

### Card
Basic content card.
Props:
- `variant`: `solid | elevated | outline | glass`
- `interactive`: boolean

### GlassCard
Used in dark futuristic sections.
Must use glass tokens:
- `--glass-bg`
- `--glass-border`
- `--glass-blur`
- `--glass-shadow`

### IconWrap
Wraps icons in tokenized visual container.
Variants:
- `soft`
- `accent`
- `glass`

### AnimatedGrid
Decorative background grid.
Must be subtle and token-based.
Must not reduce readability.

### DashboardMockup
Hero visual showing abstract dashboard cards.
Must not use real client data.
Elements:
- metric cards,
- pipeline rows,
- automation status chip,
- AI insight panel.

### WorkflowVisual
AI workflow node visual.
Elements:
- nodes,
- glowing connection lines,
- status badges.
Motion must respect reduced-motion.

### ServiceBlockCard
Props:
- `title`
- `goal`
- `services[]`
- `businessValue`
- `icon`

### IndustryGroupCard
Props:
- `title`
- `industries[]`
- `recommendedSolutions[]`

### OutcomeCard
Props:
- `title`
- `description`
- `icon`

### StepCard
Used in How We Work.
Props:
- `number`
- `title`
- `description`

### FAQAccordion
Keyboard accessible.
Props:
- `items[]`

### LeadForm
Fields:
- name,
- company,
- phone,
- email,
- interestedSolution,
- message.

Features:
- validation,
- loading state,
- success state,
- error state,
- honeypot anti-spam field,
- optional consent checkbox.

## Landing section components

### Header
Includes:
- logo placeholder,
- nav,
- language switcher,
- theme switcher,
- CTA.

### HeroSection
Uses:
- Section,
- Container,
- Badge,
- Button,
- DashboardMockup,
- WorkflowVisual.

### PainSection
Uses:
- SectionHeading,
- Card grid,
- highlight callout.

### SolutionOverviewSection
Uses:
- copy column,
- feature cards.

### ServiceBlocksSection
Uses:
- ServiceBlockCard 4 times.

### BusinessSuccessSection
Uses:
- Glass cards,
- strategic copy,
- 6-point grid.

### IndustriesSection
Uses:
- IndustryGroupCard 5 times.

### ResultsSection
Uses:
- OutcomeCard 6 times.

### AISection
Uses:
- capability matrix,
- AI workflow visual.

### HowWeWorkSection
Uses:
- StepCard stepper.

### TrustSection
Uses:
- trust cards,
- security mini-card,
- certification wording.

### CTASection
Uses:
- LeadForm,
- contact alternatives.

## State rules
Every interactive component must define:
- hover,
- focus-visible,
- active,
- disabled,
- loading where applicable.

## Accessibility rules
- Use semantic HTML.
- Buttons must be buttons or links correctly.
- Form inputs must have labels.
- Decorative visuals must be `aria-hidden`.
- Accordion must support keyboard navigation.
