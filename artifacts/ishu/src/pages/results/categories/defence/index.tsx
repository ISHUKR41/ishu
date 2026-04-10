// FILE: artifacts/ishu/src/pages/results/categories/defence/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function DefenceResults() {
  return (
    <ResultsCategoryPage
      categorySlug="army-defence"
      categoryName="Army & Defence"
      description="NDA, CDS, AFCAT, Army GD, Navy, Airforce and all defence exam results"
      icon="⚔️"
      accentColor="#ef4444"
    />
  );
}
