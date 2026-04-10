// ============================================================================
// FILE: modules/News/CategoryFilter/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const moduleConfig = {
  title: "News Category Filter",
  description: "Configuration for centralized news category filter metadata.",
  apiEndpoint: "/api/news/categories",
} as const;

export default moduleConfig;
