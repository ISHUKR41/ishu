// ============================================================================
// FILE: modules/Results/Categories/_template/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const categoryConfig = {
  title: "Results Category Template",
  description: "Template backend configuration for creating new results categories.",
  apiEndpoint: "/api/results/category/template",
} as const;

export default categoryConfig;
