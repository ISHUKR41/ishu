// ============================================================================
// FILE: modules/News/Categories/innovation/backend/index.ts
// PURPOSE: Isolated backend configuration for "Innovation" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/innovation route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Innovation".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Innovation",
  slug: "innovation",
  title: "Innovation News - Latest Updates | Ishu",
  description: "Stay updated with the latest Innovation news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/innovation",
} as const;

export default categoryConfig;
