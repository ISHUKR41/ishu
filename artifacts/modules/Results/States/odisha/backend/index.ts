// ============================================================================
// FILE: modules/Results/States/odisha/backend/index.ts
// PURPOSE: Isolated backend API for Odisha (OD) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Odisha".
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
  stateName: "Odisha",
  stateCode: "OD",
  slug: "odisha",
  title: "Odisha Exam Results - Latest Updates | Ishu",
  description: "Get the latest Odisha government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Odisha results, Odisha exam results, Odisha government jobs, OD results",
  canonical: "https://ishu.in/results/states/odisha",
  apiEndpoint: "/api/results?state=Odisha&limit=50",
} as const;

export default stateConfig;
