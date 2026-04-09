// ============================================================================
// FILE: modules/Results/Categories/Railway/frontend/index.tsx
// PURPOSE: Railway Recruitment Board (RRB) examination results page.
//
// RAILWAY EXAMS COVERED:
//   - RRB NTPC (Non-Technical Popular Categories)
//   - RRB Group D (Level 1)
//   - RRB ALP (Assistant Loco Pilot) & Technician
//   - RRB JE (Junior Engineer) — Civil, Electrical, Mechanical, IT
//   - RRB Paramedical
//   - RRB Ministerial & Isolated Categories
//   - RPF/RPSF Constable & SI
// ============================================================================

import React from "react";
import CategoryResultsTemplate from "../../_template/frontend";

export default function RailwayResultsPage() {
  return <CategoryResultsTemplate categorySlug="railway" />;
}
