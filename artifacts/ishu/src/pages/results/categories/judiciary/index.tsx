// FILE: artifacts/ishu/src/pages/results/categories/judiciary/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function JudiciaryResults() {
  return (
    <ResultsCategoryPage
      categorySlug="judiciary"
      categoryName="High Court & Judiciary"
      description="District Court, High Court, Supreme Court Clerk and all judicial service exam results"
      icon="⚖️"
      accentColor="#6366f1"
    />
  );
}
