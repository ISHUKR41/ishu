// FILE: artifacts/ishu/src/pages/results/categories/police/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function PoliceResults() {
  return (
    <ResultsCategoryPage
      categorySlug="police"
      categoryName="Police Exams"
      description="UP Police, Delhi Police, SSC CPO, BSF, CRPF and all police recruitment results"
      icon="👮"
      accentColor="#0ea5e9"
    />
  );
}
