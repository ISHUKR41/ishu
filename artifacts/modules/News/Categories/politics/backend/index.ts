// ============================================================================
// FILE: modules/News/Categories/politics/backend/index.ts
// PURPOSE: Isolated backend configuration for "Politics" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/politics route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Politics".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Politics",
  slug: "politics",
  title: "Politics News - Latest Updates | Ishu",
  description: "Stay updated with the latest Politics news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/politics",
} as const;

export default categoryConfig;
