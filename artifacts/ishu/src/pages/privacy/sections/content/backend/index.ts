// ============================================================================
// FILE: pages/privacy/sections/content/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const PrivacySectionsContentBackendConfig = {
  unit: "privacy/sections/content",
  apiEndpoint: "/api/pages/privacy/sections/content",
} as const;

export default PrivacySectionsContentBackendConfig;
