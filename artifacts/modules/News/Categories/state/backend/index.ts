// ============================================================================
// FILE: modules/News/Categories/state/backend/index.ts
// PURPOSE: Isolated backend configuration for "State News" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/state route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "State News".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "State News",
  slug: "state",
  title: "State News News - Latest Updates | Ishu",
  description: "Stay updated with the latest State News news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/state",
} as const;

export default categoryConfig;
