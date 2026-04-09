// ============================================================================
// FILE: modules/Results/States/andhra-pradesh/backend/index.ts
// PURPOSE: Isolated backend API for Andhra Pradesh (AP) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Andhra Pradesh".
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
  stateName: "Andhra Pradesh",
  stateCode: "AP",
  slug: "andhra-pradesh",
  title: "Andhra Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Andhra Pradesh government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Andhra Pradesh results, Andhra Pradesh exam results, Andhra Pradesh government jobs, AP results",
  canonical: "https://ishu.in/results/states/andhra-pradesh",
  apiEndpoint: "/api/results?state=Andhra Pradesh&limit=50",
} as const;

export default stateConfig;
