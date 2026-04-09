// ============================================================================
// FILE: modules/Results/Categories/UPSC/frontend/index.tsx
// PURPOSE: The dedicated UPSC (Union Public Service Commission) results page.
//          This is a thin wrapper around the reusable CategoryResultsTemplate
//          that passes the "upsc" slug to render UPSC-specific results.
//
// ISOLATION: This file lives in its own UPSC/ folder to maintain the strict
//            modular directory structure. It can be independently deployed,
//            tested, and maintained by a separate developer team.
//
// UPSC EXAMS COVERED:
//   - Civil Services (IAS/IPS/IFS) Prelims, Mains, Interview
//   - CDS (Combined Defence Services)
//   - NDA (National Defence Academy)
//   - CAPF (Central Armed Police Forces)
//   - Indian Forest Service
//   - Engineering Services Examination (ESE/IES)
//   - CMSE (Combined Medical Services)
//   - EPFO (Enforcement Directorate/APFC)
// ============================================================================

import React from "react";
import CategoryResultsTemplate from "../../_template/frontend";

/**
 * UPSCResultsPage — Renders the UPSC category results page.
 * Delegates to the shared template with slug "upsc".
 */
export default function UPSCResultsPage() {
  return <CategoryResultsTemplate categorySlug="upsc" />;
}
