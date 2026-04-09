// ============================================================================
// FILE: modules/Tools/Categories/text/backend/index.ts
// PURPOSE: Isolated backend config for "Text Tools" tools category.
// ============================================================================

export const categoryConfig = {
  name: "Text Tools",
  slug: "text",
  title: "Text Tools - Free Online Tools | Ishu",
  description: "Use free online Text Tools, secure and fast.",
  apiEndpoint: "/api/tools/category/text",
} as const;

export default categoryConfig;
