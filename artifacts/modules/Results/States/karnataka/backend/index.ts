// ============================================================================
// FILE: modules/Results/States/karnataka/backend/index.ts
// PURPOSE: Isolated backend API for Karnataka (KA) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Karnataka".
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
  stateName: "Karnataka",
  stateCode: "KA",
  slug: "karnataka",
  title: "Karnataka Exam Results - Latest Updates | Ishu",
  description: "Get the latest Karnataka government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Karnataka results, Karnataka exam results, Karnataka government jobs, KA results",
  canonical: "https://ishu.in/results/states/karnataka",
  apiEndpoint: "/api/results?state=Karnataka&limit=50",
} as const;

export default stateConfig;
