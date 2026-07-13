from __future__ import annotations
import json, re, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
errors=[]; warnings=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file(): errors.append(f'Missing required file: {rel}'); return ''
 return p.read_text(encoding='utf-8')

record=json.loads(read('docs/menq-standard/evidence/adoption-record.json') or '{}')
expected={
 'schemaVersion':2,
 'consumerId':'menq.webpage.public-site-admin',
 'parentStandardRepository':'menqstudio/MenQ-Standard',
 'parentDecision':'D-025',
 'designPlatformStatus':'Locked',
 'adoptionMode':'controlled-source-mapped',
 'pullRequest':1,
 'mergeCommit':'d985a5718ed7ec47717fdf271d14580e8eb947cb',
}
for k,v in expected.items():
 if record.get(k)!=v: errors.append(f'Adoption record {k} must be {v!r}; got {record.get(k)!r}')
if record.get('adoptionStatus')!='ValidatedAndMerged': errors.append('Adoption status must be ValidatedAndMerged')
if record.get('maturity')!='M1-candidate': errors.append('Maturity must remain M1-candidate')
if record.get('documentationClosure',{}).get('runtimeCodeChanged') is not False: errors.append('Documentation closure must state runtimeCodeChanged=false')
if record.get('authority',{}).get('maturityPromotionAuthorized') is not False: errors.append('Maturity promotion must remain unauthorized')

imports=[
 '@import "../styles/tokens/primitives.css";',
 '@import "../styles/tokens/semantic.css";',
 '@import "../styles/tokens/components.css";',
 '@import "../styles/tokens/motion.css";',
 '@import "../styles/tokens/product-extension.css";',
 '@import "../styles/tokens/sections.css";',
]
global_css=read('src/app/globals.css')
pos=[global_css.find(x) for x in imports]
if any(x<0 for x in pos) or pos!=sorted(pos): errors.append('Token imports are missing or out of canonical order')
semantic=read('src/styles/tokens/semantic.css'); extension=read('src/styles/tokens/product-extension.css')
tokens={'--gradient-hero','--grid-line-color','--shadow-glow','--glass-bg','--glass-border-color','--glass-blur','--glass-shadow'}
for token in sorted(tokens):
 if token not in extension: errors.append(f'Missing Product Extension token: {token}')
 if token in semantic: errors.append(f'Product-local token leaked into semantic.css: {token}')

hexpat=re.compile(r'#[0-9a-fA-F]{3,8}\b')
for p in sorted((ROOT/'src').rglob('*')):
 if p.is_file() and p.suffix in {'.ts','.tsx','.js','.jsx','.css'} and 'styles/tokens' not in p.as_posix():
  vals=sorted(set(hexpat.findall(p.read_text(encoding='utf-8'))))
  if vals: warnings.append(f"Review raw colors in {p.relative_to(ROOT)}: {', '.join(vals)}")
if warnings:
 print('MENQ DESIGN ADOPTION WARNINGS'); [print('-',x) for x in warnings]
if errors:
 print('MENQ DESIGN ADOPTION VALIDATION: RED'); [print('-',x) for x in errors]; sys.exit(1)
print('MENQ DESIGN ADOPTION VALIDATION: GREEN')
print('Validated merged adoption record, token order, and Product Extension isolation.')
