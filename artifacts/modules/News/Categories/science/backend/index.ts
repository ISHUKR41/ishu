// ============================================================================
// FILE: modules/News/Categories/science/backend/index.ts
// PURPOSE: Isolated backend configuration for "Science" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/science route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Science".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Science",
  slug: "science",
  title: "Science News - Latest Updates | Ishu",
  description: "Stay updated with the latest Science news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/science",
} as const;

export default categoryConfig;
