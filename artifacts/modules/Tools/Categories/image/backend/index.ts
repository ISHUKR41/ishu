// ============================================================================
// FILE: modules/Tools/Categories/image/backend/index.ts
// PURPOSE: Isolated backend config for "Image Tools" tools category.
// ============================================================================

export const categoryConfig = {
  name: "Image Tools",
  slug: "image",
  title: "Image Tools - Free Online Tools | Ishu",
  description: "Use free online Image Tools, secure and fast.",
  apiEndpoint: "/api/tools/category/image",
} as const;

export default categoryConfig;
