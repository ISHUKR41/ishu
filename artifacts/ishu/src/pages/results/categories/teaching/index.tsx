// FILE: artifacts/ishu/src/pages/results/categories/teaching/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function TeachingResults() {
  return (
    <ResultsCategoryPage
      categorySlug="teaching-tet"
      categoryName="Teaching & TET"
      description="CTET, UPTET, DSSSB, KVS, NVS and all teaching job and TET exam results"
      icon="📚"
      accentColor="#f59e0b"
    />
  );
}
