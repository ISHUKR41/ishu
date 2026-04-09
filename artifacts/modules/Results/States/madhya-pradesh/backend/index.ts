// ============================================================================
// FILE: modules/Results/States/madhya-pradesh/backend/index.ts
// PURPOSE: Isolated backend API for Madhya Pradesh (MP) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Madhya Pradesh".
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
  stateName: "Madhya Pradesh",
  stateCode: "MP",
  slug: "madhya-pradesh",
  title: "Madhya Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Madhya Pradesh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Madhya Pradesh results, Madhya Pradesh exam results, Madhya Pradesh government jobs, MP results",
  canonical: "https://ishu.in/results/states/madhya-pradesh",
  apiEndpoint: "/api/results?state=Madhya Pradesh&limit=50",
} as const;

export default stateConfig;
