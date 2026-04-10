// ============================================================================
// FILE: modules/Results/Categories/Teaching/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Teaching Results",
  description: "Configuration for Teaching results category.",
  apiEndpoint: "/api/results?category=Teaching",
} as const;

export default categoryConfig;
