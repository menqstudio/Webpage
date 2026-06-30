# ANALYTICS_AND_CONVERSION.md

# Analytics and Conversion Tracking Specification

## Purpose

Understand which pages, languages, CTAs, campaigns, and traffic sources generate leads.

## Locked Decisions

```text
Analytics: placeholder-ready
Support GA4
Support GTM
Track CTA clicks
Track form submissions
Track booking clicks
Track UTM parameters
```

## Providers

Recommended:

```text
Google Analytics 4
Google Tag Manager
```

Optional later:

```text
Meta Pixel
LinkedIn Insight Tag
Microsoft Clarity
PostHog
Plausible
```

## Required Events

```text
page_view
cta_click
service_card_click
language_switch
lead_form_start
lead_form_submit
lead_form_success
lead_form_error
booking_click
contact_button_click
scroll_depth
faq_open
```

## CTA Event Fields

```text
cta_id
cta_label
cta_location
page_path
language
```

Locations:

```text
header
hero
services
results
final_cta
footer
```

## Form Tracking

Do not send PII to analytics.

Never send:

```text
name
phone
email
message body
```

Allowed metadata:

```text
form_id
interested_solution
language
page_path
utm_source
utm_medium
utm_campaign
```

## UTM Tracking

Capture and store:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
landing_page
language
first_seen_at
submitted_at
```

## Conversion Goals

Primary:

```text
lead_form_success
```

Secondary:

```text
booking_click
phone_click
email_click
telegram_click
whatsapp_click
```

## Admin Analytics Dashboard

Show:

```text
Total leads
Leads by source
Leads by language
Leads by interested solution
CTA clicks
Form conversion rate
Booking clicks
Top landing pages
UTM campaign performance
```

## Checklist

```text
[ ] Add analytics abstraction
[ ] Add GA4/GTM placeholders
[ ] Track CTA clicks
[ ] Track form start/success/error
[ ] Track booking clicks
[ ] Track contact button clicks
[ ] Capture UTM params
[ ] Store attribution in lead record
[ ] Avoid sending PII to analytics
```
