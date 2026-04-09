// ============================================================================
// FILE: modules/News/Categories/business/backend/index.ts
// PURPOSE: Isolated backend configuration for "Business" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/business route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Business".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Business",
  slug: "business",
  title: "Business News - Latest Updates | Ishu",
  description: "Stay updated with the latest Business news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/business",
} as const;

export default categoryConfig;
