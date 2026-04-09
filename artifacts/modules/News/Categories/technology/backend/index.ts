// ============================================================================
// FILE: modules/News/Categories/technology/backend/index.ts
// PURPOSE: Isolated backend configuration for "Technology" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/technology route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Technology".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Technology",
  slug: "technology",
  title: "Technology News - Latest Updates | Ishu",
  description: "Stay updated with the latest Technology news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/technology",
} as const;

export default categoryConfig;
