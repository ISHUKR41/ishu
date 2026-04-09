// ============================================================================
// FILE: modules/News/Categories/neet/backend/index.ts
// PURPOSE: Isolated backend configuration for "NEET" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/neet route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "NEET".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "NEET",
  slug: "neet",
  title: "NEET News - Latest Updates | Ishu",
  description: "Stay updated with the latest NEET news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/neet",
} as const;

export default categoryConfig;
