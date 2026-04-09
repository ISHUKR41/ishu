// ============================================================================
// FILE: modules/News/Categories/defence/backend/index.ts
// PURPOSE: Isolated backend configuration for "Defence" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/defence route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Defence".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Defence",
  slug: "defence",
  title: "Defence News - Latest Updates | Ishu",
  description: "Stay updated with the latest Defence news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/defence",
} as const;

export default categoryConfig;
