// ============================================================================
// FILE: modules/Tools/Detail/backend/index.ts
// PURPOSE: Backend configuration for Tools detail page.
//          The actual detail API is served by the main tools router.
// ============================================================================

export const detailConfig = {
  section: "Tools",
  apiEndpoint: "/api/tools/:id",
} as const;

export default detailConfig;
