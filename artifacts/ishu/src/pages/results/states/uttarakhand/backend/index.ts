// FILE: artifacts/ishu/src/pages/results/states/uttarakhand/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Uttarakhand Exam Results - Latest Updates | Ishu",
  description: "Get the latest Uttarakhand government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Uttarakhand results, Uttarakhand exam results, Uttarakhand government jobs, Uttarakhand vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/uttarakhand",
  stateName: "Uttarakhand",
  stateCode: "uttarakhand",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
