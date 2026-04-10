// ============================================================================
// FILE: pages/terms/sections/hero/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const TermsSectionsHeroBackendConfig = {
  unit: "terms/sections/hero",
  apiEndpoint: "/api/pages/terms/sections/hero",
} as const;

export default TermsSectionsHeroBackendConfig;
