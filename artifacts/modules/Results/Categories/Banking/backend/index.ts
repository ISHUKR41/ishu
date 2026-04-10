// ============================================================================
// FILE: modules/Results/Categories/Banking/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Banking Results",
  description: "Configuration for Banking results category.",
  apiEndpoint: "/api/results?category=Banking",
} as const;

export default categoryConfig;
