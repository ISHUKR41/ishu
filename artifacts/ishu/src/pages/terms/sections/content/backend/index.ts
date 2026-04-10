// ============================================================================
// FILE: pages/terms/sections/content/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const TermsSectionsContentBackendConfig = {
  unit: "terms/sections/content",
  apiEndpoint: "/api/pages/terms/sections/content",
} as const;

export default TermsSectionsContentBackendConfig;
