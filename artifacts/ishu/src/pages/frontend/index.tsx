// ============================================================================
// FILE: pages//frontend/index.tsx
// PURPOSE: Dedicated frontend boundary wrapper for this unit.
// ============================================================================

import ExistingUnitComponent from "../not-found";

/**
 * Frontend boundary wrapper for strict page-level isolation.
 */
export default function RootFrontendEntry() {
  return <ExistingUnitComponent />;
}
