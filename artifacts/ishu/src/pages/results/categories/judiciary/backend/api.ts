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
 * Results JUDICIARY Category - Backend API Layer
 * Isolated API hooks for the judiciary results category.
 * Changes here do NOT affect any other category.
 */
export { useListResults } from "@workspace/api-client-react";
