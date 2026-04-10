// ============================================================================
// FILE: modules/Results/Categories/Judiciary/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Judiciary Results",
  description: "Configuration for Judiciary results category.",
  apiEndpoint: "/api/results?category=Judiciary",
} as const;

export default categoryConfig;
