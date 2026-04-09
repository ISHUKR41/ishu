// ============================================================================
// FILE: modules/Tools/Categories/ai/backend/index.ts
// PURPOSE: Isolated backend config for "AI Tools" tools category.
// ============================================================================

export const categoryConfig = {
  name: "AI Tools",
  slug: "ai",
  title: "AI Tools - Free Online Tools | Ishu",
  description: "Use free online AI Tools, secure and fast.",
  apiEndpoint: "/api/tools/category/ai",
} as const;

export default categoryConfig;
