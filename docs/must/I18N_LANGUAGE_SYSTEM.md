# I18N_LANGUAGE_SYSTEM.md

# Internationalization and Language System

## Purpose

Defines multilingual architecture for Armenian, English, and Russian.

## Locked Decisions

```text
Default language: Armenian / hy
Supported languages: hy, en, ru
URL structure: /hy /en /ru
No mixed-language copy inside a single locale
```

## Locale Codes

```text
hy -> Armenian
en -> English
ru -> Russian
```

## URL Structure

```text
/ -> /hy
/hy
/en
/ru
```

Examples:

```text
/hy/services
/en/services
/ru/services
/hy/privacy
/en/privacy
/ru/privacy
```

## Language Switcher

Labels:

```text
Հայ
EN
RU
```

Switcher must preserve current page when possible.

## Language Purity Rule

Armenian page uses Armenian copy. English page uses English copy. Russian page uses Russian copy.

Allowed technical exceptions:

```text
CRM
ERP
SEO
API
Dashboard
E-commerce
```

## HTML Lang

```html
<html lang="hy">
<html lang="en">
<html lang="ru">
```

## Content Fields

Every translatable entity must include:

```text
language
translation_group_id
slug
title
description
body
seo_title
seo_description
```

## Slug Strategy

MVP recommendation:

```text
Use stable English-safe slugs for all locales
```

Example:

```text
/hy/services
/en/services
/ru/services
```

## SEO hreflang

Each multilingual page must include hreflang links.

## Lead Form Language Tracking

Lead submissions must store:

```text
language: hy | en | ru
```

## Missing Translation Rule

Public site must not show mixed-language content. If translation is missing, hide the unfinished item or use fallback page, not another language block.

## Checklist

```text
[ ] Add locale routing
[ ] Redirect root to /hy
[ ] Add language switcher
[ ] Add translation files
[ ] Add hreflang tags
[ ] Add localized metadata
[ ] Store lead language
[ ] Add admin language field
[ ] Prevent mixed-language copy
```
