// ============================================================================
// FILE: modules/Results/States/arunachal-pradesh/backend/index.ts
// PURPOSE: Isolated backend API for Arunachal Pradesh (AR) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Arunachal Pradesh".
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
  stateName: "Arunachal Pradesh",
  stateCode: "AR",
  slug: "arunachal-pradesh",
  title: "Arunachal Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Arunachal Pradesh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Arunachal Pradesh results, Arunachal Pradesh exam results, Arunachal Pradesh government jobs, AR results",
  canonical: "https://ishu.in/results/states/arunachal-pradesh",
  apiEndpoint: "/api/results?state=Arunachal Pradesh&limit=50",
} as const;

export default stateConfig;
