// ============================================================================
// FILE: modules/News/Categories/sports/backend/index.ts
// PURPOSE: Isolated backend configuration for "Sports" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/sports route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Sports".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Sports",
  slug: "sports",
  title: "Sports News - Latest Updates | Ishu",
  description: "Stay updated with the latest Sports news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/sports",
} as const;

export default categoryConfig;
