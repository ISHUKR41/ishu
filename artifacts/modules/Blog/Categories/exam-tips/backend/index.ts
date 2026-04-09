// ============================================================================
// FILE: modules/Blog/Categories/exam-tips/backend/index.ts
// PURPOSE: Isolated backend configuration for "Exam Tips" blog category.
// ============================================================================

export const categoryConfig = {
  name: "Exam Tips",
  slug: "exam-tips",
  title: "Exam Tips - Blog | Ishu",
  description: "Read the best Exam Tips articles, guides, and insights.",
  apiEndpoint: "/api/blogs/category/exam-tips",
} as const;

export default categoryConfig;
