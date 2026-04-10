// FILE: artifacts/ishu/src/pages/results/categories/railway/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { ResultsCategoryPage } from "../_shared/ResultsCategoryPage";

export default function RailwayResults() {
  return (
    <ResultsCategoryPage
      categorySlug="railway-rrb"
      categoryName="Railway / RRB"
      description="RRB NTPC, Group D, JE, ALP, RPF and all Indian Railways exam results"
      icon="🚂"
      accentColor="#f97316"
    />
  );
}
