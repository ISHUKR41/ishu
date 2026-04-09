// ============================================================================
// FILE: modules/News/Categories/jee/backend/index.ts
// PURPOSE: Isolated backend configuration for "JEE" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/jee route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "JEE".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "JEE",
  slug: "jee",
  title: "JEE News - Latest Updates | Ishu",
  description: "Stay updated with the latest JEE news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/jee",
} as const;

export default categoryConfig;
