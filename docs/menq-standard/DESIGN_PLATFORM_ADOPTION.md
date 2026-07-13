# MenQ Webpage — Design Platform Adoption / Design Platform որդեգրում

**Status / Կարգավիճակ:** Validated and merged — M1 candidate / Validate և merge արված — M1 candidate  
**Parent decision:** Locked `D-025`  
**Consumer ID:** `menq.webpage.public-site-admin`

## Հայերեն

### Purpose
Webpage-ը governed Design Platform consumer է՝ առանց business logic, backend, routes կամ content ownership-ը shared core տեղափոխելու։

### Scope
Tokens, components, patterns, themes, responsive behavior, HY/EN/RU locale behavior, accessibility, motion և public/admin visual foundations։

### Excluded scope
Database schema, lead/booking business logic, auth/session/RBAC semantics, notification integrations և deployment secrets։

### Adoption mode
Մինչև released package consumption-ը repository-ն controlled source-mapped mode-ում է՝ no-silent-fork, compatibility, validation և rollback evidence-ով։

### Maturity
M1 candidate։ M2+ պահանջում է separate operational pilot evidence։

## English

### Purpose
Webpage is a governed Design Platform consumer without moving business logic, backend, routes, or content ownership into shared core.

### Scope
Tokens, components, patterns, themes, responsive behavior, HY/EN/RU locale behavior, accessibility, motion, and public/admin visual foundations.

### Excluded scope
Database schema, lead/booking business logic, authentication/session/RBAC semantics, notification integrations, and deployment secrets.

### Adoption mode
Until released package consumption exists, the repository operates in controlled source-mapped mode with no-silent-fork, compatibility, validation, and rollback evidence.

### Maturity
M1 candidate. M2+ requires separate operational-pilot evidence.

<!-- END: MENQ_WEBPAGE_DESIGN_PLATFORM_ADOPTION -->
