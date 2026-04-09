// ============================================================================
// FILE: modules/News/Categories/health/backend/index.ts
// PURPOSE: Isolated backend configuration for "Health" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/health route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Health".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Health",
  slug: "health",
  title: "Health News - Latest Updates | Ishu",
  description: "Stay updated with the latest Health news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/health",
} as const;

export default categoryConfig;
