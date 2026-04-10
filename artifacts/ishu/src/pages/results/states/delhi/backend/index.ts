// FILE: artifacts/ishu/src/pages/results/states/delhi/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Delhi Exam Results - Latest Updates | Ishu",
  description: "Get the latest Delhi government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Delhi results, Delhi exam results, Delhi government jobs, Delhi vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/delhi",
  stateName: "Delhi",
  stateCode: "delhi",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
