// ============================================================================
// FILE: modules/Results/States/chhattisgarh/backend/index.ts
// PURPOSE: Isolated backend API for Chhattisgarh (CG) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Chhattisgarh".
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
  stateName: "Chhattisgarh",
  stateCode: "CG",
  slug: "chhattisgarh",
  title: "Chhattisgarh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Chhattisgarh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Chhattisgarh results, Chhattisgarh exam results, Chhattisgarh government jobs, CG results",
  canonical: "https://ishu.in/results/states/chhattisgarh",
  apiEndpoint: "/api/results?state=Chhattisgarh&limit=50",
} as const;

export default stateConfig;
