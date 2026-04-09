// ============================================================================
// FILE: modules/News/Categories/railway/backend/index.ts
// PURPOSE: Isolated backend configuration for "Railway" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/railway route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Railway".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Railway",
  slug: "railway",
  title: "Railway News - Latest Updates | Ishu",
  description: "Stay updated with the latest Railway news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/railway",
} as const;

export default categoryConfig;
