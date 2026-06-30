# CONTENT_MODEL.md

# Content Model Specification

## Purpose

Defines content models for public landing page and admin panel. The site is multilingual and content-managed.

## Languages

```text
hy
en
ru
```

Every public content item must have a language.

## Core Content Types

MVP:

```text
Page Section
Service
Industry
FAQ
CTA
Legal Page
Media Asset
```

Phase 2:

```text
Blog Post
News
Announcement
Example Problem
```

## Shared Fields

```text
id
type
language
translation_group_id
title
slug
short_description
content
status
order
is_featured
seo_title
seo_description
created_by
updated_by
submitted_by
submitted_at
reviewed_by
reviewed_at
rejection_reason
published_by
published_at
archived_by
archived_at
created_at
updated_at
```

## Statuses

```text
Draft
Pending Review
Approved
Published
Rejected
Archived
```

## Page Section Types

```text
hero
pain
solution
services_overview
business_success
industries
results
ai_tool
how_we_work
trust
faq
final_cta
footer
```

## Service Model

Fields:

```text
title
slug
category
short_description
full_description
business_value
features
icon_key
order
is_featured
language
translation_group_id
status
seo_title
seo_description
```

Categories:

```text
New customer acquisition
Internal management
AI business solutions
Infrastructure and integrations
```

## Industry Model

Fields:

```text
title
slug
group
description
pain_points
recommended_solutions
icon_key
order
is_featured
language
translation_group_id
status
seo_title
seo_description
```

Groups:

```text
Sales and customer businesses
Service and field operations
Education and healthcare
Finance and professional services
Manufacturing, logistics, warehouse
```

## FAQ Model

```text
question
answer
category
order
language
translation_group_id
status
```

## Media Model

```text
id
file_url
file_type
title
alt_text
usage_context
language
uploaded_by
status
created_at
updated_at
archived_at
```

Every public image needs alt text.

## Translation Rule

Do not mix languages in one content item. Use translation_group_id to connect translations.

## Checklist

```text
[ ] Add content status fields
[ ] Add language field
[ ] Add translation_group_id
[ ] Add SEO fields
[ ] Add service model
[ ] Add industry model
[ ] Add FAQ model
[ ] Add media model
[ ] Add legal page model
[ ] Add approval workflow fields
```
