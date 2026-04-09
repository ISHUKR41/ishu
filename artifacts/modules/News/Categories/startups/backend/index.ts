// ============================================================================
// FILE: modules/News/Categories/startups/backend/index.ts
// PURPOSE: Isolated backend configuration for "Startups" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/startups route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Startups".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Startups",
  slug: "startups",
  title: "Startups News - Latest Updates | Ishu",
  description: "Stay updated with the latest Startups news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/startups",
} as const;

export default categoryConfig;
