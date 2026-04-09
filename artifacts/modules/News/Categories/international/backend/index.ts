// ============================================================================
// FILE: modules/News/Categories/international/backend/index.ts
// PURPOSE: Isolated backend configuration for "International" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/international route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "International".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "International",
  slug: "international",
  title: "International News - Latest Updates | Ishu",
  description: "Stay updated with the latest International news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/international",
} as const;

export default categoryConfig;
