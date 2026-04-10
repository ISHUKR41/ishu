// ============================================================================
// FILE: modules/Results/Categories/NEET/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "NEET Results",
  description: "Configuration for NEET results category.",
  apiEndpoint: "/api/results?category=NEET",
} as const;

export default categoryConfig;
