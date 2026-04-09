// ============================================================================
// FILE: modules/News/Categories/govt-schemes/backend/index.ts
// PURPOSE: Isolated backend configuration for "Govt Schemes" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/govt-schemes route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Govt Schemes".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Govt Schemes",
  slug: "govt-schemes",
  title: "Govt Schemes News - Latest Updates | Ishu",
  description: "Stay updated with the latest Govt Schemes news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/govt-schemes",
} as const;

export default categoryConfig;
