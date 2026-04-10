// ============================================================================
// FILE: modules/Results/Categories/JEE/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "JEE Results",
  description: "Configuration for JEE results category.",
  apiEndpoint: "/api/results?category=JEE",
} as const;

export default categoryConfig;
