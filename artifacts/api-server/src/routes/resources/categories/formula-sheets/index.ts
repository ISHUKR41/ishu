// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { createResourcesCategoryRouter } from "../_shared";
const router = createResourcesCategoryRouter("formula-sheets");
export default router;
