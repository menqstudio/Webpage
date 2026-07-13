from __future__ import annotations
import json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
errors=[]
canonical=[
 'README.md','PROJECT_CONTEXT.md','AI_WORKING_CONTEXT.md','COLLABORATION_STYLE.md','DOCUMENTATION_INDEX.md','DECISION_INDEX.md','DECISIONS.md','ROADMAP.md','CHANGELOG.md','NEXT_CHAT_HANDOFF.md',
 'docs/menq-standard/README.md','docs/menq-standard/ARCHITECTURE.md','docs/menq-standard/CONTRACTS.md','docs/menq-standard/GOVERNANCE.md','docs/menq-standard/DOCUMENTATION_STANDARD.md','docs/menq-standard/ROUTES_AND_DATA_FLOWS.md','docs/menq-standard/ADMIN_ARCHITECTURE.md','docs/menq-standard/CONTENT_AND_LOCALIZATION.md','docs/menq-standard/ACCESSIBILITY_MOTION_RESPONSIVE.md','docs/menq-standard/SECURITY_PRIVACY_BOUNDARY.md','docs/menq-standard/TESTING_AND_QUALITY_GATES.md','docs/menq-standard/RELEASE_OPERATIONS_AND_ROLLBACK.md','docs/menq-standard/DESIGN_PLATFORM_ADOPTION.md','docs/menq-standard/PRODUCT_EXTENSION_BOUNDARY.md','docs/menq-standard/COMPONENT_AND_PAGE_INVENTORY.md','docs/menq-standard/DESIGN_AUDIT_REPORT.md','docs/menq-standard/DESIGN_IMPLEMENTATION_RECORD.md','docs/menq-standard/FINAL_VALIDATION_RECORD.md','docs/menq-standard/POST_MERGE_CLOSURE_RECORD.md','docs/menq-standard/HOMEPAGE_VISUAL_SPEC.md','docs/menq-standard/MARKDOWN_INVENTORY_AUDIT.md','docs/menq-standard/MIGRATION_AND_ROLLBACK_PLAN.md','docs/menq-standard/VALIDATION_PLAN.md','docs/menq-standard/decisions/DECISION_INDEX.md',
]
canonical += [f'docs/menq-standard/decisions/W-D00{i}-{name}.md' for i,name in [
 (1,'GOVERNED-DESIGN-PLATFORM-CONSUMER'),(2,'PRODUCT-EXTENSION-BOUNDARY'),(3,'NON-DESTRUCTIVE-MIGRATION'),(4,'EVIDENCE-BASED-MATURITY'),(5,'CANONICAL-DOCUMENTATION-AUTHORITY'),(6,'PROTECTED-RUNTIME-BOUNDARY'),(7,'CANONICAL-BILINGUAL-PARITY')]]
for rel in canonical:
 p=ROOT/rel
 if not p.is_file(): errors.append(f'Missing canonical file: {rel}'); continue
 text=p.read_text(encoding='utf-8')
 if not any(x in text for x in ('## Հայերեն','### Հայերեն','**HY:**','/ Որոշումներ','/ Փաստաթղթերի')): errors.append(f'Missing Armenian canonical content: {rel}')
 if not any(x in text for x in ('## English','### English','**EN:**','English')): errors.append(f'Missing English canonical content: {rel}')
 if '<!-- END:' not in text: errors.append(f'Missing end marker: {rel}')

for rel in canonical:
 p=ROOT/rel
 if p.is_file():
  text=p.read_text(encoding='utf-8')
  for stale in ('Draft PR #1','final CI pending','remediation in progress','execution evidence pending'):
   if stale in text: errors.append(f'Stale state {stale!r} in {rel}')

invp=ROOT/'docs/menq-standard/evidence/markdown-inventory.json'
try: inv=json.loads(invp.read_text(encoding='utf-8'))
except Exception as e: errors.append(f'Invalid markdown inventory: {e}'); inv={}
actual=sorted(p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*.md'))
if inv:
 if inv.get('fileCount')!=len(actual): errors.append(f'Inventory count mismatch: {inv.get("fileCount")} != {len(actual)}')
 rows=[r.get('path') for r in inv.get('files',[])]
 if rows!=actual: errors.append('Inventory path set or ordering mismatch')
 model=inv.get('integrityModel',{})
 if model.get('canonicalInventory')!='path-set-and-count': errors.append('Canonical inventory model must be path-set-and-count')
 if 'CI' not in model.get('exactByteAndSha256Manifest',''): errors.append('Exact byte/hash authority must be delegated to the CI artifact')

if errors:
 print('MENQ WEBPAGE DOCUMENTATION VALIDATION: RED'); [print('-',e) for e in errors]; sys.exit(1)
print('MENQ WEBPAGE DOCUMENTATION VALIDATION: GREEN')
print(f'Canonical files: {len(canonical)}; tracked Markdown files: {len(actual)}')
