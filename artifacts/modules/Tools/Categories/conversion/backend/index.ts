// ============================================================================
// FILE: modules/Tools/Categories/conversion/backend/index.ts
// PURPOSE: Isolated backend config for "Conversion Tools" tools category.
// ============================================================================

export const categoryConfig = {
  name: "Conversion Tools",
  slug: "conversion",
  title: "Conversion Tools - Free Online Tools | Ishu",
  description: "Use free online Conversion Tools, secure and fast.",
  apiEndpoint: "/api/tools/category/conversion",
} as const;

export default categoryConfig;
