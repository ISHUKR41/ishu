// ============================================================================
// FILE: modules/News/Categories/medical/backend/index.ts
// PURPOSE: Isolated backend configuration for "Medical" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/medical route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Medical".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Medical",
  slug: "medical",
  title: "Medical News - Latest Updates | Ishu",
  description: "Stay updated with the latest Medical news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/medical",
} as const;

export default categoryConfig;
