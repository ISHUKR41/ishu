// ============================================================================
// FILE: modules/News/Categories/admit-cards/backend/index.ts
// PURPOSE: Isolated backend configuration for "Admit Cards" news category.
//          The actual API routing is handled by the api-server's
//          /api/news/category/admit-cards route using the shared factory.
//
// DATABASE SCHEMA (newsTable):
//   id, title, shortDescription, content, category, imageUrl,
//   language, author, isTrending, viewCount, relatedNewsIds,
//   createdAt, updatedAt
// ============================================================================

/**
 * Category-specific configuration for "Admit Cards".
 * Used by the frontend and potentially by the api-server route factory.
 */
export const categoryConfig = {
  name: "Admit Cards",
  slug: "admit-cards",
  title: "Admit Cards News - Latest Updates | Ishu",
  description: "Stay updated with the latest Admit Cards news, notifications, and important announcements.",
  apiEndpoint: "/api/news/category/admit-cards",
} as const;

export default categoryConfig;
