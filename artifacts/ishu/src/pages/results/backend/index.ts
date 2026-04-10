// ============================================================================
// FILE: pages/results/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const ResultsBackendConfig = {
  unit: "results",
  apiEndpoint: "/api/pages/results",
} as const;

export default ResultsBackendConfig;
