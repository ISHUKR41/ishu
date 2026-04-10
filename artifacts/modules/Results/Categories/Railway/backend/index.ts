// ============================================================================
// FILE: modules/Results/Categories/Railway/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Railway Results",
  description: "Configuration for Railway results category.",
  apiEndpoint: "/api/results?category=Railway",
} as const;

export default categoryConfig;
