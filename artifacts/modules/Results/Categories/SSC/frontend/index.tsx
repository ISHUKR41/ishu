// ============================================================================
// FILE: modules/Results/Categories/SSC/frontend/index.tsx
// PURPOSE: The dedicated SSC (Staff Selection Commission) results page.
//          SSC conducts exams for Group B & C posts under the central government.
//
// SSC EXAMS COVERED:
//   - CGL (Combined Graduate Level) — for Inspectors, Sub-Inspectors, Auditors
//   - CHSL (Combined Higher Secondary Level) — for DEO, LDC, PA
//   - MTS (Multi Tasking Staff)
//   - GD Constable (for BSF, CRPF, CISF, ITBP, SSB)
//   - Stenographer Grade C & D
//   - Junior Engineer (JE) — Civil, Electrical, Mechanical
//   - CPO (Central Police Officer) — SI in Delhi Police, CAPF
// ============================================================================

import React from "react";
import CategoryResultsTemplate from "../../_template/frontend";

export default function SSCResultsPage() {
  return <CategoryResultsTemplate categorySlug="ssc" />;
}
