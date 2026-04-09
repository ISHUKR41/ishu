// ============================================================================
// FILE: modules/News/Categories/national/backend/index.ts
// PURPOSE: Isolated backend configuration for "National" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/national route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "National".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "National",
  slug: "national",
  title: "National News - Latest Updates | Ishu",
  description: "Stay updated with the latest National news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/national",
} as const;

export default categoryConfig;
