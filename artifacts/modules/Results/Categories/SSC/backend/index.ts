// ============================================================================
// FILE: modules/Results/Categories/SSC/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "SSC Results",
  description: "Configuration for SSC results category.",
  apiEndpoint: "/api/results?category=SSC",
} as const;

export default categoryConfig;
