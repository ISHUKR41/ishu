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
 * Resources Grid Section - Backend API Layer
 * Re-exports the custom useListResources hook from the resources page backend.
 * Changes here do NOT affect any other section.
 */
export { useListResources } from "../../../backend/api";
