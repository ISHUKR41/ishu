// ============================================================================
// FILE: modules/Results/Categories/Defence/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Defence Results",
  description: "Configuration for Defence results category.",
  apiEndpoint: "/api/results?category=Defence",
} as const;

export default categoryConfig;
