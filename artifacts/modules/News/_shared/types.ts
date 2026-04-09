// ============================================================================
// FILE: modules/News/_shared/types.ts
// PURPOSE: TypeScript type definitions for the entire News module.
//          Defines the data model for news articles, categories, and API
//          responses used across all News sections and subcategories.
//
// REAL DATA: All types map to actual educational/government news content.
// ============================================================================

/**
 * Represents a single news article in the system.
 * Maps to the `news` table in the database via Drizzle ORM.
 */
export interface NewsArticle {
  id: number;
  /** Headline of the news article */
  title: string;
  /** URL-safe slug for SEO routing */
  slug: string;
  /** Full article content (HTML or markdown) */
  content: string;
  /** Brief summary shown in listing cards */
  excerpt: string;
  /** News category (e.g., "UPSC", "SSC", "Education") */
  category: string;
  /** Source of the news (e.g., "Press Information Bureau", "NTA") */
  source: string;
  /** URL to the original source article */
  sourceUrl: string | null;
  /** Author name */
  author: string;
  /** Cover image URL for the article */
  imageUrl: string | null;
  /** Whether this article is currently featured/pinned */
  isFeatured: boolean;
  /** Whether this is a breaking news item */
  isBreaking: boolean;
  /** Article tags as JSON array string */
  tags: string | null;
  /** Publication date */
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * News category definition with metadata for UI rendering.
 */
export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

/**
 * Paginated API response for news articles.
 */
export interface PaginatedNewsResponse {
  data: NewsArticle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
