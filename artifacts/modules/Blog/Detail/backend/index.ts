// ============================================================================
// FILE: modules/Blog/Detail/backend/index.ts
// PURPOSE: Backend configuration for Blog detail page.
//          The actual detail API is served by the main blog router.
// ============================================================================

export const detailConfig = {
  section: "Blog",
  apiEndpoint: "/api/blog/:id",
} as const;

export default detailConfig;
