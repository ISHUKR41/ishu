# Tools Python Utilities

This folder contains Python-based utilities dedicated to the Tools platform.

## `generate_tools_catalog.py`

Generates a normalized JSON catalog from the real `TOOLS` seed source in:

- `artifacts/api-server/src/lib/seed.ts`

Output file:

- `artifacts/modules/Tools/Catalog/backend/generated/tools-catalog.generated.json`

### Run

```bash
python scripts/tools-python/generate_tools_catalog.py
```

This utility is non-destructive and does not modify application source code.
