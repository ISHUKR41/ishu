// ============================================================================
// FILE: modules/News/Categories/banking/backend/index.ts
// PURPOSE: Isolated backend configuration for "Banking" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/banking route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Banking".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Banking",
  slug: "banking",
  title: "Banking News - Latest Updates | Ishu",
  description: "Stay updated with the latest Banking news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/banking",
} as const;

export default categoryConfig;
