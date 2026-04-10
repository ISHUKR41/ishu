// FILE: artifacts/ishu/src/pages/results/categories/upsc/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function UPSCResults() {
  return (
    <ResultsCategoryPage
      categorySlug="upsc-civil-services"
      categoryName="UPSC Civil Services"
      description="IAS, IPS, IFS and all UPSC examination results, notifications and vacancies"
      icon="🏛️"
      accentColor="#3b82f6"
    />
  );
}
