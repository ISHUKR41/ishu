// FILE: artifacts/ishu/src/pages/results/states/punjab/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Punjab Exam Results - Latest Updates | Ishu",
  description: "Get the latest Punjab government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Punjab results, Punjab exam results, Punjab government jobs, Punjab vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/punjab",
  stateName: "Punjab",
  stateCode: "punjab",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
