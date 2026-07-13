from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_MARKERS = {
    "PROJECT_CONTEXT.md": "<!-- END: MENQ_WEBPAGE_PROJECT_CONTEXT -->",
    "AI_WORKING_CONTEXT.md": "<!-- END: MENQ_WEBPAGE_AI_WORKING_CONTEXT -->",
    "NEXT_CHAT_HANDOFF.md": "<!-- END: MENQ_WEBPAGE_NEXT_CHAT_HANDOFF -->",
    "ROADMAP.md": "<!-- END: MENQ_WEBPAGE_ROADMAP -->",
    "CHANGELOG.md": "<!-- END: MENQ_WEBPAGE_CHANGELOG -->",
    "docs/menq-standard/README.md": "<!-- END: MENQ_WEBPAGE_STANDARD_PACKAGE_INDEX -->",
    "docs/menq-standard/DESIGN_PLATFORM_ADOPTION.md": "<!-- END: MENQ_WEBPAGE_DESIGN_PLATFORM_ADOPTION -->",
    "docs/menq-standard/PRODUCT_EXTENSION_BOUNDARY.md": "<!-- END: MENQ_WEBPAGE_PRODUCT_EXTENSION_BOUNDARY -->",
    "docs/menq-standard/COMPONENT_AND_PAGE_INVENTORY.md": "<!-- END: MENQ_WEBPAGE_COMPONENT_PAGE_INVENTORY -->",
    "docs/menq-standard/DESIGN_AUDIT_REPORT.md": "<!-- END: MENQ_WEBPAGE_DESIGN_AUDIT_REPORT -->",
    "docs/menq-standard/VALIDATION_PLAN.md": "<!-- END: MENQ_WEBPAGE_VALIDATION_PLAN -->",
    "docs/menq-standard/MIGRATION_AND_ROLLBACK_PLAN.md": "<!-- END: MENQ_WEBPAGE_MIGRATION_ROLLBACK_PLAN -->",
    "docs/menq-standard/decisions/DECISION_INDEX.md": "<!-- END: MENQ_WEBPAGE_DECISION_INDEX -->",
}

BILINGUAL_FILES = list(REQUIRED_MARKERS)

TOKEN_IMPORT_ORDER = [
    '@import "../styles/tokens/primitives.css";',
    '@import "../styles/tokens/semantic.css";',
    '@import "../styles/tokens/components.css";',
    '@import "../styles/tokens/motion.css";',
    '@import "../styles/tokens/product-extension.css";',
    '@import "../styles/tokens/sections.css";',
]

PRODUCT_EXTENSION_TOKENS = {
    "--gradient-hero",
    "--grid-line-color",
    "--shadow-glow",
    "--glass-bg",
    "--glass-border-color",
    "--glass-blur",
    "--glass-shadow",
}

errors: list[str] = []
warnings: list[str] = []


def read_text(relative: str) -> str:
    path = ROOT / relative
    if not path.is_file():
        errors.append(f"Missing required file: {relative}")
        return ""
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError as exc:
        errors.append(f"UTF-8 read failed for {relative}: {exc}")
        return ""


for relative, marker in REQUIRED_MARKERS.items():
    text = read_text(relative)
    if text and not text.rstrip().endswith(marker):
        errors.append(f"Missing or misplaced ending marker: {relative}")

for relative in BILINGUAL_FILES:
    text = read_text(relative)
    if text and ("## Հայերեն" not in text or "## English" not in text):
        errors.append(f"Missing equal bilingual top-level sections: {relative}")

record_path = ROOT / "docs/menq-standard/evidence/adoption-record.json"
try:
    record = json.loads(record_path.read_text(encoding="utf-8"))
except (OSError, json.JSONDecodeError) as exc:
    errors.append(f"Invalid adoption record: {exc}")
    record = {}

if record:
    expected = {
        "schemaVersion": 1,
        "consumerId": "menq.webpage.public-site-admin",
        "parentStandardRepository": "menqstudio/MenQ-Standard",
        "parentDecision": "D-025",
        "designPlatformStatus": "Locked",
        "adoptionMode": "controlled-source-mapped",
        "workingBranch": "menq-design-platform-adoption-v1",
        "pullRequest": 1,
    }
    for key, value in expected.items():
        if record.get(key) != value:
            errors.append(
                f"Adoption record field {key!r} must equal {value!r}; got {record.get(key)!r}"
            )
    if record.get("authority", {}).get("mergeAuthorized") is not False:
        errors.append("Draft adoption record must not claim merge authority")
    if record.get("overallVerdict") not in {"YELLOW", "GREEN", "RED"}:
        errors.append("Adoption record has an invalid overall verdict")

product_extension = read_text("src/styles/tokens/product-extension.css")
semantic = read_text("src/styles/tokens/semantic.css")
globals_css = read_text("src/app/globals.css")
sections = read_text("src/styles/tokens/sections.css")

for token in sorted(PRODUCT_EXTENSION_TOKENS):
    if token not in product_extension:
        errors.append(f"Product Extension token missing from product-extension.css: {token}")

for token in sorted(PRODUCT_EXTENSION_TOKENS):
    if token in semantic:
        errors.append(f"Product-local token leaked into semantic.css: {token}")

positions = [globals_css.find(line) for line in TOKEN_IMPORT_ORDER]
if any(position < 0 for position in positions):
    missing = [
        line for line, position in zip(TOKEN_IMPORT_ORDER, positions, strict=True) if position < 0
    ]
    errors.append(f"Missing token imports in globals.css: {missing}")
elif positions != sorted(positions):
    errors.append("Token imports in globals.css are not in canonical dependency order")

if "--glass-bg" not in sections or "--grid-line-color" not in sections:
    errors.append("Section-scoped Product Extension overrides are incomplete")

# Informational source scan. Raw literals are warnings because generated assets,
# email templates, charts, and infrastructure can require reviewed exceptions.
hex_pattern = re.compile(r"#[0-9a-fA-F]{3,8}\b")
for path in sorted((ROOT / "src").rglob("*")):
    if not path.is_file() or path.suffix not in {".ts", ".tsx", ".js", ".jsx", ".css"}:
        continue
    if "styles/tokens" in path.as_posix():
        continue
    text = path.read_text(encoding="utf-8")
    matches = sorted(set(hex_pattern.findall(text)))
    if matches:
        warnings.append(
            f"Review raw color literal(s) in {path.relative_to(ROOT).as_posix()}: {', '.join(matches)}"
        )

if warnings:
    print("MENQ DESIGN ADOPTION WARNINGS")
    for warning in warnings:
        print(f"- {warning}")

if errors:
    print("MENQ DESIGN ADOPTION VALIDATION: RED")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("MENQ DESIGN ADOPTION VALIDATION: GREEN")
print(f"Validated {len(REQUIRED_MARKERS)} canonical documentation files.")
print("Token dependency order: GREEN")
print("Product Extension isolation: GREEN")
print("Machine-readable adoption evidence: GREEN")
