// ============================================================================
// FILE: modules/About/HeroSection/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const moduleConfig = {
  title: "About Hero Section",
  description: "Configuration for the About page hero section backend boundary.",
  apiEndpoint: "/api/modules/about/hero",
} as const;

export default moduleConfig;
