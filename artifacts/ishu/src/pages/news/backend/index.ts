// ============================================================================
// FILE: pages/news/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const NewsBackendConfig = {
  unit: "news",
  apiEndpoint: "/api/pages/news",
} as const;

export default NewsBackendConfig;
