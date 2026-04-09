// ============================================================================
// FILE: modules/Results/States/uttar-pradesh/backend/index.ts
// PURPOSE: Isolated backend API for Uttar Pradesh (UP) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Uttar Pradesh".
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
  stateName: "Uttar Pradesh",
  stateCode: "UP",
  slug: "uttar-pradesh",
  title: "Uttar Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Uttar Pradesh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Uttar Pradesh results, Uttar Pradesh exam results, Uttar Pradesh government jobs, UP results",
  canonical: "https://ishu.in/results/states/uttar-pradesh",
  apiEndpoint: "/api/results?state=Uttar Pradesh&limit=50",
} as const;

export default stateConfig;
