// ============================================================================
// FILE: modules/Results/Categories/UPSC/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "UPSC Results",
  description: "Configuration for UPSC results category.",
  apiEndpoint: "/api/results?category=UPSC",
} as const;

export default categoryConfig;
