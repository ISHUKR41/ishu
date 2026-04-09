// ============================================================================
// FILE: modules/Blog/Categories/study-strategies/backend/index.ts
// PURPOSE: Isolated backend configuration for "Study Strategies" blog category.
// ============================================================================

export const categoryConfig = {
  name: "Study Strategies",
  slug: "study-strategies",
  title: "Study Strategies - Blog | Ishu",
  description: "Read the best Study Strategies articles, guides, and insights.",
  apiEndpoint: "/api/blogs/category/study-strategies",
} as const;

export default categoryConfig;
