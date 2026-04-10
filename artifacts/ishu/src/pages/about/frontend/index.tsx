// ============================================================================
// FILE: pages/about/frontend/index.tsx
// PURPOSE: Dedicated frontend boundary wrapper for this unit.
// ============================================================================

import ExistingUnitComponent from "../index";

/**
 * Frontend boundary wrapper for strict page-level isolation.
 */
export default function AboutFrontendEntry() {
  return <ExistingUnitComponent />;
}
