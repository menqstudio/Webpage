# MenQ Webpage — Markdown Inventory Audit / Markdown inventory audit

**Status / Կարգավիճակ:** Complete and machine-enforced / Ավարտված և machine-enforced

## Հայերեն
Repository-ի բոլոր tracked Markdown files-ը canonical inventory-ում գրանցվում են deterministic path set + count ձևով։ Exact bytes և SHA-256 manifest-ը յուրաքանչյուր validated head-ի համար CI audit artifact-ն է գեներացնում։ Այս բաժանումը կանխում է stale hash record-ը canonical tree-ում և պահպանում է exact-tree evidence-ը build execution-ի հետ։ Root continuity և `docs/menq-standard/` package-ը canonical authority classes են։ Legacy/buildpack/must/QA/agent docs-ը preserved evidence են։

## English
All tracked Markdown files are recorded in the canonical inventory as a deterministic path set and count. The CI audit artifact generates the exact byte and SHA-256 manifest for every validated head. This separation prevents stale hash records in the canonical tree while preserving exact-tree evidence with build execution. The root continuity set and `docs/menq-standard/` package are the canonical authority classes. Legacy, buildpack, must, QA, and agent documentation remains preserved evidence.

<!-- END: MENQ_WEBPAGE_MARKDOWN_INVENTORY_AUDIT -->
