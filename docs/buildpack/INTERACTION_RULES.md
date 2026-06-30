# Interaction Rules

## Motion direction
The page should feel premium, AI-driven, and slightly futuristic, but not excessive. Motion must support clarity, not distract.

## Required interactions
- Smooth scroll for section navigation.
- Subtle hover on cards.
- CTA hover states.
- Card fade-in on scroll.
- Glowing workflow lines in hero/AI sections.
- FAQ accordion open/close animation.
- Header background transition on scroll.
- Theme transition between dark/light.

## Motion tokens only
All durations and easings must use motion tokens.
No hardcoded `300ms`, `ease-in-out`, or arbitrary animation values inside components.

## Hover rules
### Cards
- Slight lift using motion token.
- Border accent becomes slightly stronger.
- Shadow increases using card shadow/glow token.

### Buttons
- Primary button background transitions to hover token.
- Secondary button border/content transition.
- No aggressive scaling.

### Service chips
- Minimal background/border transition.

## Scroll reveal
Recommended:
- Section heading fades in.
- Cards stagger subtly.
- Use once-per-section reveal.

Do not over-animate every small element.

## Hero animation
Allowed:
- subtle glowing lines,
- slow node pulse,
- dashboard metric micro-movement,
- grid glow.

Not allowed:
- fast flashing,
- distracting particle storm,
- heavy 3D animations,
- autoplay video as primary hero visual.

## Reduced motion
If user prefers reduced motion:
- disable scroll reveal movement,
- disable pulsing/glowing animations,
- keep opacity transitions minimal or none.

## Form interactions
- Show loading state on submit.
- Prevent duplicate submissions.
- Show inline validation errors.
- Show success state in form card.
- Keep user input if submission fails.

## FAQ interactions
- Accordion must be keyboard accessible.
- Only one item may be open or multiple items may be open; choose one behavior and keep consistent.
- Use tokens for transition.

## Theme switcher
- Toggle dark/light.
- Persist preference in local storage.
- Respect system preference when no saved preference exists.
- All color changes must come from tokens.

## Language switcher
- HY / EN / RU.
- Current locale visible.
- Dropdown or segmented control acceptable.
- Keep content unmixed by language.

## Error states
- Do not show raw technical errors to users.
- Show friendly message.
- Log technical details server-side.
