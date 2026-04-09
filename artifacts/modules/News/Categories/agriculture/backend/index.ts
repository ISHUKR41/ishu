// ============================================================================
// FILE: modules/News/Categories/agriculture/backend/index.ts
// PURPOSE: Isolated backend configuration for "Agriculture" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/agriculture route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Agriculture".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Agriculture",
  slug: "agriculture",
  title: "Agriculture News - Latest Updates | Ishu",
  description: "Stay updated with the latest Agriculture news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/agriculture",
} as const;

export default categoryConfig;
