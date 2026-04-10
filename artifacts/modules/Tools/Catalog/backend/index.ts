// ============================================================================
// FILE: modules/Tools/Catalog/backend/index.ts
// PURPOSE: Backend metadata boundary for generated tools catalog payload.
// ============================================================================

/**
 * Backend catalog metadata for isolated tool catalog workflows.
 */
export const toolsCatalogConfig = {
  generatedFile: "generated/tools-catalog.generated.json",
  sourceScript: "scripts/tools-python/generate_tools_catalog.py",
} as const;

export default toolsCatalogConfig;
