// ============================================================================
// FILE: modules/News/Categories/results-news/backend/index.ts
// PURPOSE: Isolated backend configuration for "Results News" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/results-news route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Results News".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Results News",
  slug: "results-news",
  title: "Results News News - Latest Updates | Ishu",
  description: "Stay updated with the latest Results News news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/results-news",
} as const;

export default categoryConfig;
