// ============================================================================
// FILE: modules/News/Categories/environment/backend/index.ts
// PURPOSE: Isolated backend configuration for "Environment" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/environment route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Environment".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Environment",
  slug: "environment",
  title: "Environment News - Latest Updates | Ishu",
  description: "Stay updated with the latest Environment news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/environment",
} as const;

export default categoryConfig;
