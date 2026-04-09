// ============================================================================
// FILE: modules/Results/Categories/Banking/frontend/index.tsx
// PURPOSE: Banking & Insurance sector examination results page.
//          Covers all banking recruitment exams under IBPS, SBI, RBI, etc.
//
// BANKING EXAMS COVERED:
//   - IBPS PO/MT, Clerk, SO, RRB PO/Clerk
//   - SBI PO, Clerk, SO (Specialist Officer)
//   - RBI Grade B, RBI Assistant
//   - NABARD Grade A & B
//   - SIDBI, SEBI Grade A
//   - LIC AAO/ADO, NIACL AO
// ============================================================================

import React from "react";
import CategoryResultsTemplate from "../../_template/frontend";

export default function BankingResultsPage() {
  return <CategoryResultsTemplate categorySlug="banking" />;
}
