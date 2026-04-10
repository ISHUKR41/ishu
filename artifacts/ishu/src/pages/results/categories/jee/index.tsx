// FILE: artifacts/ishu/src/pages/results/categories/jee/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function JEEResults() {
  return (
    <ResultsCategoryPage
      categorySlug="jee-mains"
      categoryName="JEE – Engineering"
      description="JEE Main, JEE Advanced, BITSAT and all engineering entrance exam results"
      icon="⚙️"
      accentColor="#06b6d4"
    />
  );
}
