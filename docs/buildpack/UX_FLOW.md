# UX Flow

## Primary visitor journey
1. Visitor lands on the page.
2. Hero communicates business result: reduce cost, save time, attract customers, improve control.
3. Pain section helps visitor recognize current business problems.
4. Solution section reframes the company as a business systems builder.
5. Services section shows concrete categories.
6. Industries section confirms relevance to visitor’s sector.
7. Results section makes the value measurable.
8. Trust section reduces risk.
9. FAQ removes objections.
10. CTA/form captures the lead.

## Conversion paths
### Path A: Direct high-intent visitor
- Hero CTA -> scroll to lead form -> submit.

### Path B: Research visitor
- Hero -> Services -> Industries -> FAQ -> CTA.

### Path C: Business owner with pain but unclear solution
- Pain section -> Solution overview -> How we work -> form option “I am not sure, I want consultation”.

## CTA behavior
Primary CTA always scrolls to `#consultation-form`.
Secondary CTA scrolls to `#solutions`.
Navigation links scroll smoothly to page sections.

## Form UX
### Required fields
- name,
- phone or email,
- interested solution,
- problem description.

### Optional fields
- company.

### Validation
- Human-readable validation messages.
- No aggressive error styles.
- On success, show confirmation message and optionally clear the form.

### Success message Armenian
Շնորհակալություն։ Ձեր հայտը ստացվել է։ Մեր թիմը կապ կհաստատի Ձեզ հետ հնարավորինս շուտ։

## Language UX
- Language switcher: HY / EN / RU.
- Preserve current section when switching language if possible.
- Do not mix translations in a single locale.

## Theme UX
- Dark/light toggle.
- Respect system preference by default.
- Store preference locally.
- All theme changes must use tokens, not class-level hardcoded values.

## Trust UX
Do not overclaim. Trust section must sound professional and careful:
- certified specialists,
- business process analysis,
- custom solutions,
- AI-driven implementation,
- long-term support,
- privacy/security awareness.

## Objection handling
FAQ and trust sections must answer:
- “Do I need a big budget?”
- “Can we start small?”
- “Can you work with my existing system?”
- “Is AI safe for business data?”
- “Will I get support after launch?”

## Accessibility UX
- CTAs must be keyboard focusable.
- Form labels must be visible or accessible.
- Accordion must be keyboard accessible.
- Motion must respect reduced-motion preference.
