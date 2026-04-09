// ============================================================================
// FILE: modules/Blog/Categories/career-guidance/backend/index.ts
// PURPOSE: Isolated backend configuration for "Career Guidance" blog category.
// ============================================================================

export const categoryConfig = {
  name: "Career Guidance",
  slug: "career-guidance",
  title: "Career Guidance - Blog | Ishu",
  description: "Read the best Career Guidance articles, guides, and insights.",
  apiEndpoint: "/api/blogs/category/career-guidance",
} as const;

export default categoryConfig;
