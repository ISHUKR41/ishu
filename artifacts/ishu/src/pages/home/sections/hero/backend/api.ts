// ============================================================================
// FILE: api.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for api.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

/**
 * Home Hero Section - Backend API Layer
 * Isolated API hooks and data fetching for the hero section.
 * Changes here do NOT affect any other section.
 */
export { useGetResultStats, useListTools } from "@workspace/api-client-react";

// Re-export types used by the hero section
export type { ResultStats } from "@workspace/api-client-react";
