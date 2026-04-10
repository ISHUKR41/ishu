// ============================================================================
// FILE: pages/home/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const HomeBackendConfig = {
  unit: "home",
  apiEndpoint: "/api/pages/home",
} as const;

export default HomeBackendConfig;
