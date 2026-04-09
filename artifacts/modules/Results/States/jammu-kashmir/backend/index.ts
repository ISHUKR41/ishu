// ============================================================================
// FILE: modules/Results/States/jammu-kashmir/backend/index.ts
// PURPOSE: Isolated backend API for Jammu & Kashmir (JK) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Jammu & Kashmir".
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
  stateName: "Jammu & Kashmir",
  stateCode: "JK",
  slug: "jammu-kashmir",
  title: "Jammu & Kashmir Exam Results - Latest Updates | Ishu",
  description: "Get the latest Jammu & Kashmir government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Jammu & Kashmir results, Jammu & Kashmir exam results, Jammu & Kashmir government jobs, JK results",
  canonical: "https://ishu.in/results/states/jammu-kashmir",
  apiEndpoint: "/api/results?state=Jammu & Kashmir&limit=50",
} as const;

export default stateConfig;
