# MenQ Webpage — Migration and Rollback Plan / MenQ Webpage — Migration և rollback պլան

**Status / Կարգավիճակ:** Active migration control / Ակտիվ migration control

## Հայերեն

### Migration strategy

Migration-ը incremental և non-destructive է։ Existing working website-ը չի rebuild արվում։ Փոփոխությունները կատարվում են bounded steps-ով՝ documentation → token-boundary fix → validator → confirmed UI fixes → evidence։

### Protected behavior

Հետևյալը չի փոխվում միայն design adoption-ի պատճառով՝

- route structure,
- locale URLs,
- lead/booking request contracts,
- Prisma schema,
- auth/session/RBAC semantics,
- notification integrations,
- admin permissions,
- SEO and analytics event names,
- published business content semantics։

### Migration phases

1. Baseline SHA և branch creation։
2. Canonical governance documentation։
3. Stable product-extension token extraction։
4. Validator and CI gate introduction։
5. Source hygiene and accessibility fixes only when confirmed։
6. Build/test/theme/locale/responsive validation։
7. Final evidence and Owner decision։

### Rollback mechanism

- Primary rollback unit՝ PR/merge commit revert։
- Token-boundary move-ը պահպանում է existing CSS variable names, այնպես որ rollback-ը մեկ commit revert է։
- No database migration is allowed in this transaction։
- No API or persisted-data format change is allowed։
- Եթե build/test կամ visual behavior-ը regress է անում, transaction-ը RED է և merge չի արվում։
- Եթե post-merge defect հայտնվի, revert the adoption merge commit and restore previous import/token file state։

### Stop conditions

Migration-ը կանգնում է, եթե՝

- business logic diff է հայտնվում առանց approved scope-ի,
- locale կամ theme regression կա,
- accessibility failure կա,
- validator-ը չի կարող հաստատել source boundary-ն,
- current main-ից unrelated drift է մտնում branch,
- Owner authority չկա merge-ի համար։

---

## English

### Migration strategy

Migration is incremental and non-destructive. The working website is not rebuilt. Changes are delivered in bounded steps: documentation → token-boundary fix → validator → confirmed UI fixes → evidence.

### Protected behavior

The following does not change merely because of design adoption:

- route structure,
- locale URLs,
- lead and booking request contracts,
- Prisma schema,
- authentication, session, and RBAC semantics,
- notification integrations,
- admin permissions,
- SEO and analytics event names,
- published business-content semantics.

### Migration phases

1. Baseline SHA and branch creation.
2. Canonical governance documentation.
3. Stable product-extension token extraction.
4. Validator and CI-gate introduction.
5. Source-hygiene and accessibility fixes only when confirmed.
6. Build, test, theme, locale, and responsive validation.
7. Final evidence and Owner decision.

### Rollback mechanism

- The primary rollback unit is a PR or merge-commit revert.
- The token-boundary move preserves existing CSS variable names, so rollback is a single commit revert.
- No database migration is allowed in this transaction.
- No API or persisted-data format change is allowed.
- If build, test, or visual behavior regresses, the transaction is RED and must not merge.
- If a post-merge defect appears, revert the adoption merge commit and restore the previous import and token-file state.

### Stop conditions

Migration stops if:

- a business-logic diff appears outside approved scope,
- a locale or theme regression exists,
- an accessibility failure exists,
- the validator cannot prove the source boundary,
- unrelated drift from current `main` enters the branch,
- Owner authority for merge is absent.

<!-- END: MENQ_WEBPAGE_MIGRATION_ROLLBACK_PLAN -->
