// FILE: artifacts/ishu/src/pages/results/categories/state-psc/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function StatePSCResults() {
  return (
    <ResultsCategoryPage
      categorySlug="state-psc"
      categoryName="State PSC"
      description="UPPSC, MPSC, BPSC, TNPSC, KPSC and all State Public Service Commission results"
      icon="🗺️"
      accentColor="#a855f7"
    />
  );
}
