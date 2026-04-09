// ============================================================================
// FILE: modules/News/Categories/teaching/backend/index.ts
// PURPOSE: Isolated backend configuration for "Teaching" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/teaching route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Teaching".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Teaching",
  slug: "teaching",
  title: "Teaching News - Latest Updates | Ishu",
  description: "Stay updated with the latest Teaching news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/teaching",
} as const;

export default categoryConfig;
