// ============================================================================
// FILE: pages/terms/sections/content/frontend/index.tsx
// PURPOSE: Dedicated frontend boundary wrapper for this unit.
// ============================================================================

import * as ExistingUnitModule from "../TermsContent";
import type { ComponentType } from "react";

/**
 * Frontend boundary wrapper for strict page-level isolation.
 */
export default function TermsSectionsContentFrontendEntry() {
  const moduleRecord = ExistingUnitModule as Record<string, unknown>;
  const ExistingUnitComponent =
    (moduleRecord.default ??
      Object.values(moduleRecord).find((candidate) => typeof candidate === "function")) as
      | ComponentType
      | undefined;

  if (!ExistingUnitComponent) {
    return null;
  }

  return <ExistingUnitComponent />;
}
