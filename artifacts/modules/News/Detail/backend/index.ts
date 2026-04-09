// ============================================================================
// FILE: modules/News/Detail/backend/index.ts
// PURPOSE: Backend configuration for News detail page.
//          The actual detail API is served by the main news router.
// ============================================================================

export const detailConfig = {
  section: "News",
  apiEndpoint: "/api/news/:id",
} as const;

export default detailConfig;
