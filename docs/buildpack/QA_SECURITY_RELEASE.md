# QA, Security, and Release

## Pre-release QA
### Content
- Armenian content reviewed.
- No mixed Armenian/English/Russian copy where not intended.
- CTA text consistent.
- No fake testimonials.
- No unverified certificate logos.
- No unsupported numerical claims.

### Visual
- Dark mode works.
- Light mode works.
- Theme switch persists.
- No hardcoded visual values outside token files.
- Cards, buttons, sections use tokens.
- Hero visual is not too futuristic or distracting.

### Responsive
- Mobile header works.
- Mobile form works.
- No horizontal scrolling.
- CTA buttons are tappable.
- All section grids stack correctly.

### Forms
- Required validation works.
- Phone/email contact rule works.
- Success state works.
- Error state works.
- Duplicate submit blocked.
- Email notification sent.
- Telegram notification sent.

### SEO
- Title tag set.
- Meta description set.
- H1 only once.
- H2 hierarchy clean.
- Open Graph placeholder configured.
- FAQ schema valid if implemented.

### Accessibility
- Keyboard navigation works.
- Focus states visible.
- Form labels accessible.
- Accordion accessible.
- Reduced motion respected.
- Contrast checked in both themes.

## Security checklist
- No secrets in client bundle.
- Environment variables used.
- Server-side validation enabled.
- Honeypot anti-spam enabled.
- Rate limit configured if possible.
- Error messages do not expose internals.
- HTTPS enabled in production.

## Release checklist
- Production environment variables set.
- Contact placeholders replaced.
- Domain configured.
- Analytics decision made.
- Privacy/cookie decision made.
- Form tested on production.
- Telegram notification tested.
- Email notification tested.
- Mobile test completed.

## Post-release monitoring
- Monitor form delivery.
- Monitor page performance.
- Monitor errors.
- Review lead quality.
- Improve copy based on visitor questions.
