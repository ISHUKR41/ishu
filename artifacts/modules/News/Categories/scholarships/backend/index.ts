// ============================================================================
// FILE: modules/News/Categories/scholarships/backend/index.ts
// PURPOSE: Isolated backend configuration for "Scholarships" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/scholarships route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Scholarships".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Scholarships",
  slug: "scholarships",
  title: "Scholarships News - Latest Updates | Ishu",
  description: "Stay updated with the latest Scholarships news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/scholarships",
} as const;

export default categoryConfig;
