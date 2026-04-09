// ============================================================================
// FILE: modules/Results/States/tamil-nadu/backend/index.ts
// PURPOSE: Isolated backend API for Tamil Nadu (TN) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Tamil Nadu".
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
  stateName: "Tamil Nadu",
  stateCode: "TN",
  slug: "tamil-nadu",
  title: "Tamil Nadu Exam Results - Latest Updates | Ishu",
  description: "Get the latest Tamil Nadu government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Tamil Nadu results, Tamil Nadu exam results, Tamil Nadu government jobs, TN results",
  canonical: "https://ishu.in/results/states/tamil-nadu",
  apiEndpoint: "/api/results?state=Tamil Nadu&limit=50",
} as const;

export default stateConfig;
