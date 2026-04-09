// ============================================================================
// FILE: modules/Tools/Categories/pdf/backend/index.ts
// PURPOSE: Isolated backend config for "PDF Tools" tools category.
// ============================================================================

export const categoryConfig = {
  name: "PDF Tools",
  slug: "pdf",
  title: "PDF Tools - Free Online Tools | Ishu",
  description: "Use free online PDF Tools, secure and fast.",
  apiEndpoint: "/api/tools/category/pdf",
} as const;

export default categoryConfig;
