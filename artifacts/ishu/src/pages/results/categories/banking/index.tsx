// FILE: artifacts/ishu/src/pages/results/categories/banking/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function BankingResults() {
  return (
    <ResultsCategoryPage
      categorySlug="banking-ibps"
      categoryName="Banking & IBPS"
      description="IBPS PO, Clerk, SO, RRB, SBI PO, Clerk and all banking exam results"
      icon="🏦"
      accentColor="#10b981"
    />
  );
}
