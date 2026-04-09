// ============================================================================
// FILE: modules/Blog/Categories/success-stories/backend/index.ts
// PURPOSE: Isolated backend configuration for "Success Stories" blog category.
// ============================================================================

export const categoryConfig = {
  name: "Success Stories",
  slug: "success-stories",
  title: "Success Stories - Blog | Ishu",
  description: "Read the best Success Stories articles, guides, and insights.",
  apiEndpoint: "/api/blogs/category/success-stories",
} as const;

export default categoryConfig;
