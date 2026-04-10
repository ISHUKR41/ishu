// ============================================================================
// FILE: pages/about/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const AboutBackendConfig = {
  unit: "about",
  apiEndpoint: "/api/pages/about",
} as const;

export default AboutBackendConfig;
