// ============================================================================
// FILE: pages//backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const RootBackendConfig = {
  unit: "root",
  apiEndpoint: "/api/pages/home",
} as const;

export default RootBackendConfig;
