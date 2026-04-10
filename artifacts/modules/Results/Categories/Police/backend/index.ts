// ============================================================================
// FILE: modules/Results/Categories/Police/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Police Results",
  description: "Configuration for Police results category.",
  apiEndpoint: "/api/results?category=Police",
} as const;

export default categoryConfig;
