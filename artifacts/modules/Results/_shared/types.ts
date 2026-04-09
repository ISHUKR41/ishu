// ============================================================================
// FILE: modules/Results/_shared/types.ts
// PURPOSE: This file contains ALL TypeScript type definitions used across the
//          entire Results module — every section, subsection, category, and state
//          page imports types from here. This is the single source of truth for
//          the Results data model, ensuring strict type-safety across 100+ devs.
//
// ARCHITECTURE: This file is placed in `_shared/` to be accessible by BOTH
//               frontend and backend code within the Results module. No other
//               module should import from this file — that would break isolation.
//
// USAGE: import { Result, ResultCategory, IndianState } from "../_shared/types";
// ============================================================================

/**
 * Represents a single government exam result entry.
 * This maps directly to the `results` table in the PostgreSQL database
 * via the Drizzle ORM schema defined in `lib/db/src/schema/results.ts`.
 */
export interface Result {
  /** Auto-incremented primary key from the database */
  id: number;
  /** Human-readable title of the result (e.g. "UPSC CSE 2024 Final Result") */
  title: string;
  /** URL-safe slug for SEO-friendly routing (e.g. "upsc-cse-2024-final") */
  slug: string;
  /** The official name of the examination */
  examName: string;
  /** Which category this exam belongs to (e.g. "UPSC", "SSC", "Banking") */
  examCategory: string;
  /** The organization that conducted the exam (e.g. "UPSC", "SSC", "IBPS") */
  organization: string;
  /** Direct URL to the official result page on the government website */
  resultUrl: string;
  /** The date when the result was officially declared */
  declaredDate: string;
  /** JSON string containing cutoff marks details */
  cutoffDetails: string | null;
  /** JSON string containing statistics about the result */
  stats: string | null;
  /** Whether this is the most recent result for this exam */
  isLatest: boolean;
  /** Timestamp of when this record was created in our database */
  createdAt: string;
  /** Timestamp of the last update to this record */
  updatedAt: string;
}

/**
 * Represents a result category (e.g. UPSC, SSC, Banking).
 * Each category has its own dedicated page with filtered results.
 */
export interface ResultCategory {
  /** Unique identifier for this category */
  id: string;
  /** Display name shown in the UI (e.g. "UPSC") */
  name: string;
  /** Full expanded name (e.g. "Union Public Service Commission") */
  fullName: string;
  /** URL-safe slug for routing (e.g. "upsc") */
  slug: string;
  /** Brief description of what exams this category covers */
  description: string;
  /** Lucide icon name to display for this category */
  icon: string;
  /** CSS gradient or color for the category card */
  color: string;
  /** Number of results currently available in this category */
  count: number;
}

/**
 * Represents an Indian state or Union Territory.
 * Each state has its own dedicated results page showing state-level exams.
 */
export interface IndianState {
  /** Unique identifier */
  id: string;
  /** Official state name (e.g. "Bihar") */
  name: string;
  /** URL-safe slug (e.g. "bihar") */
  slug: string;
  /** State abbreviation code (e.g. "BR") */
  code: string;
  /** Capital city of the state */
  capital: string;
  /** Name of the state public service commission */
  pscName: string;
  /** Whether this state/UT is currently active in our system */
  isActive: boolean;
}

/**
 * API response wrapper for paginated results.
 * Used by the ResultsList section to handle large datasets efficiently.
 */
export interface PaginatedResultsResponse {
  /** Array of result entries for the current page */
  data: Result[];
  /** Total number of results matching the current filters */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Number of results per page */
  pageSize: number;
  /** Total number of pages available */
  totalPages: number;
}

/**
 * Filters that can be applied to the results listing.
 * These map to query parameters on the API endpoint.
 */
export interface ResultsFilters {
  /** Filter by exam category slug */
  category?: string;
  /** Filter by Indian state slug */
  state?: string;
  /** Free-text search query */
  search?: string;
  /** Sort order: "latest" | "oldest" | "name" */
  sortBy?: "latest" | "oldest" | "name";
  /** Only show results marked as latest */
  latestOnly?: boolean;
  /** Current page number */
  page?: number;
  /** Results per page */
  pageSize?: number;
}

/**
 * Stats displayed in the Results HeroSection.
 * These numbers give users a quick overview of the platform's coverage.
 */
export interface ResultsStats {
  /** Total number of results in the database */
  totalResults: number;
  /** Number of active exam categories */
  totalCategories: number;
  /** Number of Indian states/UTs covered */
  totalStates: number;
  /** Number of results added in the last 7 days */
  recentResults: number;
}
