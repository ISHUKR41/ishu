#!/usr/bin/env python3
"""
FILE: scripts/tools-python/generate_tools_catalog.py
PURPOSE: Build a normalized tools catalog JSON from the real seed source.

Why this script exists:
- Keeps tool catalog synchronized with backend seed definitions.
- Uses Python for robust text parsing and data normalization.
- Generates deterministic JSON used by isolated tools backend modules.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

REPO_ROOT = Path(__file__).resolve().parents[2]
SEED_FILE = REPO_ROOT / "artifacts" / "api-server" / "src" / "lib" / "seed.ts"
OUTPUT_FILE = (
    REPO_ROOT
    / "artifacts"
    / "modules"
    / "Tools"
    / "Catalog"
    / "backend"
    / "generated"
    / "tools-catalog.generated.json"
)

TOOLS_BLOCK_PATTERN = re.compile(
    r"const\s+TOOLS\s*=\s*\[(?P<body>.*?)\]\s*;",
    re.DOTALL,
)

TOOL_ITEM_PATTERN = re.compile(
    r"\{\s*"
    r"name:\s*\"(?P<name>[^\"]+)\"\s*,\s*"
    r"slug:\s*\"(?P<slug>[^\"]+)\"\s*,\s*"
    r"description:\s*\"(?P<description>[^\"]+)\"\s*,\s*"
    r"category:\s*\"(?P<category>[^\"]+)\"\s*,\s*"
    r"isNew:\s*(?P<is_new>true|false)\s*"
    r"\}",
    re.DOTALL,
)


def load_seed_source() -> str:
    if not SEED_FILE.exists():
        raise FileNotFoundError(f"Seed file not found: {SEED_FILE}")
    return SEED_FILE.read_text(encoding="utf-8")


def parse_tools(seed_source: str) -> List[Dict[str, Any]]:
    tools_block_match = TOOLS_BLOCK_PATTERN.search(seed_source)
    if not tools_block_match:
        raise ValueError("Could not locate TOOLS array in seed.ts")

    body = tools_block_match.group("body")
    parsed_tools: List[Dict[str, Any]] = []

    for match in TOOL_ITEM_PATTERN.finditer(body):
        tool = {
            "name": match.group("name").strip(),
            "slug": match.group("slug").strip(),
            "description": match.group("description").strip(),
            "category": match.group("category").strip(),
            "isNew": match.group("is_new").strip() == "true",
        }
        parsed_tools.append(tool)

    if not parsed_tools:
        raise ValueError("No tool entries parsed from TOOLS array")

    deduped: Dict[str, Dict[str, Any]] = {}
    for tool in parsed_tools:
        deduped[tool["slug"]] = tool

    normalized = sorted(deduped.values(), key=lambda item: (item["category"], item["name"]))
    return normalized


def write_catalog(tools: List[Dict[str, Any]]) -> None:
    grouped: Dict[str, List[Dict[str, Any]]] = {}
    for tool in tools:
        grouped.setdefault(tool["category"], []).append(tool)

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "totalTools": len(tools),
        "categories": sorted(grouped.keys()),
        "tools": tools,
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def main() -> None:
    seed_source = load_seed_source()
    tools = parse_tools(seed_source)
    write_catalog(tools)

    print("=== Tools Catalog Generator (Python) ===")
    print(f"Seed source: {SEED_FILE}")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Tools parsed: {len(tools)}")


if __name__ == "__main__":
    main()
