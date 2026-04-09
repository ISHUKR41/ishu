// ============================================================================
// FILE: modules/Results/Detail/backend/index.ts
// PURPOSE: Backend configuration for Results detail page.
//          The actual detail API is served by the main results router.
// ============================================================================

export const detailConfig = {
  section: "Results",
  apiEndpoint: "/api/results/:id",
} as const;

export default detailConfig;
