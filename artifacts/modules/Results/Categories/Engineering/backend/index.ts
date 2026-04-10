// ============================================================================
// FILE: modules/Results/Categories/Engineering/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Engineering Results",
  description: "Configuration for Engineering results category.",
  apiEndpoint: "/api/results?category=Engineering",
} as const;

export default categoryConfig;
