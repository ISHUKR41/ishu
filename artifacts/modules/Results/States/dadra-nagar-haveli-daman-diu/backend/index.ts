// ============================================================================
// FILE: modules/Results/States/dadra-nagar-haveli-daman-diu/backend/index.ts
// PURPOSE: Isolated backend API for Dadra Nagar Haveli & Daman Diu (DN) state results.
//          Queries the REAL SQLite database using Drizzle ORM.
//          Filters results where state = "Dadra Nagar Haveli & Daman Diu".
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
  stateName: "Dadra Nagar Haveli & Daman Diu",
  stateCode: "DN",
  slug: "dadra-nagar-haveli-daman-diu",
  title: "Dadra Nagar Haveli & Daman Diu Exam Results - Latest Updates | Ishu",
  description: "Get the latest Dadra Nagar Haveli & Daman Diu government exam results, notifications, and updates for all state-level examinations.",
  keywords: "Dadra Nagar Haveli & Daman Diu results, Dadra Nagar Haveli & Daman Diu exam results, Dadra Nagar Haveli & Daman Diu government jobs, DN results",
  canonical: "https://ishu.in/results/states/dadra-nagar-haveli-daman-diu",
  apiEndpoint: "/api/results?state=Dadra Nagar Haveli & Daman Diu&limit=50",
} as const;

export default stateConfig;
