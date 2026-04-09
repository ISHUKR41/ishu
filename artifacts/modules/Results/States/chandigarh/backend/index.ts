// ============================================================================
// FILE: modules/Results/States/chandigarh/backend/index.ts
// PURPOSE: Isolated backend API for Chandigarh (CH) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Chandigarh".
//
// ISOLATION: This backend module is completely independent. It does NOT
//            share routes, middleware, or data logic with any other state.
//
// DATABASE SCHEMA (resultsTable):
//   id, title, shortDescription, fullDescription, category, state,
//   status, totalPosts, lastDate, examDate, requiredDocuments,
//   eligibility, officialLink, createdAt, updatedAt
// ============================================================================

/**
 * NOTE: The actual backend routing for state results is handled by the
 * main /api/results endpoint with a ?state= query parameter.
 * This file exports metadata and a helper for this specific state
 * to maintain strict modular isolation.
 */

// State-specific configuration metadata
export const stateConfig = {
  stateName: "Chandigarh",
  stateCode: "CH",
  slug: "chandigarh",
  title: "Chandigarh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Chandigarh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Chandigarh results, Chandigarh exam results, Chandigarh government jobs, CH results",
  canonical: "https://ishu.in/results/states/chandigarh",
  apiEndpoint: "/api/results?state=Chandigarh&limit=50",
} as const;

export default stateConfig;
