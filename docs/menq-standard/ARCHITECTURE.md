# Architecture / Ճարտարապետություն

## Հայերեն
### System context
Public website, localized content, lead/booking intake, admin management, persistence, notifications, analytics և SEO surfaces։
### Layering
1. App/routes
2. Product UI and sections
3. Shared UI primitives
4. Semantic/component tokens
5. Primitive tokens
6. Product Extension patterns
7. Domain services and persistence
### Invariants
- Server/client boundaries explicit են։
- UI-ը domain persistence չի կատարում անմիջապես։
- Runtime contracts-ը design layer-ից անկախ են։
- Product Extension-ը shared semantic meaning չի վերագրում։

## English
### System context
Public website, localized content, lead/booking intake, admin management, persistence, notifications, analytics, and SEO surfaces.
### Layering
1. App/routes
2. Product UI and sections
3. Shared UI primitives
4. Semantic/component tokens
5. Primitive tokens
6. Product Extension patterns
7. Domain services and persistence
### Invariants
- Server/client boundaries are explicit.
- UI does not perform domain persistence directly.
- Runtime contracts remain independent from the design layer.
- Product Extensions do not redefine shared semantic meaning.

<!-- END: MENQ_WEBPAGE_ARCHITECTURE -->
