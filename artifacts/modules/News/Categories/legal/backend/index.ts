// ============================================================================
// FILE: modules/News/Categories/legal/backend/index.ts
// PURPOSE: Isolated backend configuration for "Legal" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/legal route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Legal".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Legal",
  slug: "legal",
  title: "Legal News - Latest Updates | Ishu",
  description: "Stay updated with the latest Legal news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/legal",
} as const;

export default categoryConfig;
