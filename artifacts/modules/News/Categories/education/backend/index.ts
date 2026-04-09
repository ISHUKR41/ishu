// ============================================================================
// FILE: modules/News/Categories/education/backend/index.ts
// PURPOSE: Isolated backend configuration for "Education" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/education route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Education".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Education",
  slug: "education",
  title: "Education News - Latest Updates | Ishu",
  description: "Stay updated with the latest Education news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/education",
} as const;

export default categoryConfig;
