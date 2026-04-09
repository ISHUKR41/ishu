// ============================================================================
// FILE: modules/News/Categories/engineering/backend/index.ts
// PURPOSE: Isolated backend configuration for "Engineering" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/engineering route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Engineering".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Engineering",
  slug: "engineering",
  title: "Engineering News - Latest Updates | Ishu",
  description: "Stay updated with the latest Engineering news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/engineering",
} as const;

export default categoryConfig;
