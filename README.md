# MenQ Webpage

**Status / Կարգավիճակ:** Design Platform visual implementation complete — final CI pending / Design Platform visual implementation-ն ավարտված է — final CI-ն սպասվում է  
**Repository:** `menqstudio/Webpage`  
**Canonical parent:** `menqstudio/MenQ-Standard`  
**Design authority:** Locked `D-025`  
**Branch:** `menq-design-platform-adoption-v1`  
**PR:** `#1`

## Հայերեն

MenQ Webpage-ը MenQ Studio-ի public business website և lead-generation product-ն է՝ HY/EN/RU public surface, leads/bookings և invite-only admin panel-ով։

### Design architecture

```text
primitive/reference
→ semantic
→ component
→ motion
→ Webpage Product Extension
→ section/pattern
```

Repository-ն governed consumer է, ոչ shared Design Platform source of truth։ MenQ brand expression-ը, homepage composition-ը, routes-ը և business logic-ը product-local են։ Canonical adoption/audit package-ը՝ [`docs/menq-standard/README.md`](docs/menq-standard/README.md)։

### Implemented visual system

- shared MenQ `BrandMark`,
- premium header/navigation և mobile drawer,
- redesigned hero + live operations dashboard,
- premium cards, headings, buttons և panels,
- public/admin shared visual foundation,
- light/dark/system theme և reduced-motion support,
- responsive mobile/desktop composition,
- machine Design Platform validator և CI gate։

### Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v3 · CSS variables · Prisma · PostgreSQL։

### Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Validate

```bash
npm run validate
```

---

## English

MenQ Webpage is MenQ Studio's public business website and lead-generation product, with a HY/EN/RU public surface, leads and bookings, and an invite-only admin panel.

### Design architecture

```text
primitive/reference
→ semantic
→ component
→ motion
→ Webpage Product Extension
→ section/pattern
```

The repository is a governed consumer, not the source of truth for the shared Design Platform. MenQ brand expression, homepage composition, routes, and business logic remain product-local. The canonical adoption and audit package is [`docs/menq-standard/README.md`](docs/menq-standard/README.md).

### Implemented visual system

- shared MenQ `BrandMark`,
- premium header, navigation, and mobile drawer,
- redesigned hero and live operations dashboard,
- premium cards, headings, buttons, and panels,
- shared visual foundation for public and admin surfaces,
- light, dark, and system theme support with reduced motion,
- responsive mobile and desktop composition,
- machine Design Platform validator and CI gate.

### Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v3 · CSS variables · Prisma · PostgreSQL.

### Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Validate

```bash
npm run validate
```

<!-- END: MENQ_WEBPAGE_ROOT_README -->
