// ============================================================================
// FILE: modules/Results/Categories/StatePSC/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "State PSC Results",
  description: "Configuration for State PSC results category.",
  apiEndpoint: "/api/results?category=StatePSC",
} as const;

export default categoryConfig;
