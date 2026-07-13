# MenQ Webpage — Product Extension Boundary / MenQ Webpage — Product Extension սահման

**Status / Կարգավիճակ:** Approved for implementation in Draft PR / Draft PR-ում ներդրման համար հաստատված  
**Parent:** Locked D-025 MenQ Design Platform Architecture v1

## Հայերեն

### Shared Design Platform contract

Webpage-ը shared contract է համարում՝

- token dependency direction՝ primitive/reference → semantic → component → pattern → product extension,
- semantic naming և theme/state behavior,
- reusable button, card, form, container, section, header և disclosure behavior,
- typography, spacing, radius, elevation, focus և motion foundations,
- accessibility, localization, reduced-motion և responsive requirements,
- package/API/version/compatibility/validation expectations։

### Webpage-local Product Extension

Հետևյալը Webpage product expression է և չի դառնում shared Design Platform truth՝

- MenQ website hero gradient և grid treatment,
- glass surface expression և accent glow intensity,
- contrast/spotlight landing section compositions,
- marketing-specific hero/dashboard/network illustration,
- service, industry, trust, result և CTA section compositions,
- public-site content density և conversion hierarchy,
- product-local analytics event placements,
- website/admin-specific route layouts,
- MenQ Studio business copy և service taxonomy։

### Required source boundary

- Shared semantic aliases՝ `src/styles/tokens/semantic.css`։
- Reusable component aliases՝ `src/styles/tokens/components.css`։
- Webpage-local expression՝ `src/styles/tokens/product-extension.css`։
- Section-scoped product patterns՝ `src/styles/tokens/sections.css`։
- Components consume semantic/component/product-extension aliases, ոչ raw primitive values, բացառությամբ documented token-definition files-ի։

### Prohibited drift

1. Product-specific gradient կամ copy չավելացնել shared semantic contract-ում։
2. Shared token name-ը silently redefine չանել incompatible meaning-ով։
3. Component source-ում raw colors/spacing/radius չավելացնել, եթե governed token կա։
4. Website-specific component-ը Design Platform canonical component չանվանել առանց separate contribution transaction-ի։
5. Existing product-local extension-ը shared core տեղափոխել միայն reusable evidence, impact analysis և Owner approval-ից հետո։

---

## English

### Shared Design Platform contract

Webpage treats the following as shared contracts:

- token dependency direction: primitive/reference → semantic → component → pattern → product extension,
- semantic naming and theme/state behavior,
- reusable button, card, form, container, section, header, and disclosure behavior,
- typography, spacing, radius, elevation, focus, and motion foundations,
- accessibility, localization, reduced-motion, and responsive requirements,
- package, API, version, compatibility, and validation expectations.

### Webpage-local Product Extension

The following remains Webpage product expression and does not become shared Design Platform truth:

- MenQ website hero gradient and grid treatment,
- glass-surface expression and accent-glow intensity,
- contrast and spotlight landing-section compositions,
- marketing-specific hero/dashboard/network illustration,
- service, industry, trust, result, and CTA compositions,
- public-site content density and conversion hierarchy,
- product-local analytics-event placement,
- website/admin-specific route layouts,
- MenQ Studio business copy and service taxonomy.

### Required source boundary

- Shared semantic aliases: `src/styles/tokens/semantic.css`.
- Reusable component aliases: `src/styles/tokens/components.css`.
- Webpage-local expression: `src/styles/tokens/product-extension.css`.
- Section-scoped product patterns: `src/styles/tokens/sections.css`.
- Components consume semantic, component, or product-extension aliases rather than raw primitive values, except within documented token-definition files.

### Prohibited drift

1. Do not add product-specific gradients or copy to the shared semantic contract.
2. Do not silently redefine a shared token name with incompatible meaning.
3. Do not add raw colors, spacing, or radius values in component source when a governed token exists.
4. Do not call a website-specific component a canonical Design Platform component without a separate contribution transaction.
5. Move a product-local extension into shared core only after reusable evidence, impact analysis, and Owner approval.

<!-- END: MENQ_WEBPAGE_PRODUCT_EXTENSION_BOUNDARY -->
