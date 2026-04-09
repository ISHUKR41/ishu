// ============================================================================
// FILE: modules/News/Categories/police/backend/index.ts
// PURPOSE: Isolated backend configuration for "Police" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/police route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Police".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Police",
  slug: "police",
  title: "Police News - Latest Updates | Ishu",
  description: "Stay updated with the latest Police news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/police",
} as const;

export default categoryConfig;
