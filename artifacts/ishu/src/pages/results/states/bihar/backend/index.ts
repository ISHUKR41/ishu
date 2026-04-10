// FILE: artifacts/ishu/src/pages/results/states/bihar/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Bihar Exam Results - Latest Updates | Ishu",
  description: "Get the latest Bihar government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Bihar results, Bihar exam results, Bihar government jobs, Bihar vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/bihar",
  stateName: "Bihar",
  stateCode: "bihar",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
