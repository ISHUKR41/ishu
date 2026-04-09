// ============================================================================
// FILE: modules/Results/Categories/NEET/frontend/index.tsx
// PURPOSE: NEET (National Eligibility cum Entrance Test) results page for
//          medical admissions — MBBS, BDS, AYUSH, Veterinary, and PG courses.
//
// NEET EXAMS: NEET-UG, NEET-PG, NEET-SS (Super Specialty)
// ============================================================================

import React from "react";
import CategoryResultsTemplate from "../../_template/frontend";

export default function NEETResultsPage() {
  return <CategoryResultsTemplate categorySlug="neet" />;
}
