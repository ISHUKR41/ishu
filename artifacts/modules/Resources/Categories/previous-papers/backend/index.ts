// ============================================================================
// FILE: modules/Resources/Categories/previous-papers/backend/index.ts
// PURPOSE: Isolated backend config for "Previous Papers" resources.
// ============================================================================

export const categoryConfig = {
  name: "Previous Papers",
  slug: "previous-papers",
  title: "Previous Papers - Study Resources | Ishu",
  description: "Download free Previous Papers for exam preparation.",
  apiEndpoint: "/api/resources/category/previous-papers",
} as const;

export default categoryConfig;
