// ============================================================================
// FILE: modules/News/Categories/upsc/backend/index.ts
// PURPOSE: Isolated backend configuration for "UPSC" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/upsc route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "UPSC".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "UPSC",
  slug: "upsc",
  title: "UPSC News - Latest Updates | Ishu",
  description: "Stay updated with the latest UPSC news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/upsc",
} as const;

export default categoryConfig;
