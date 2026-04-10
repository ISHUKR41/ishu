// FILE: artifacts/ishu/src/pages/results/states/uttar-pradesh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Uttar Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Uttar Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Uttar Pradesh results, Uttar Pradesh exam results, Uttar Pradesh government jobs, Uttar Pradesh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/uttar-pradesh",
  stateName: "Uttar Pradesh",
  stateCode: "uttar-pradesh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
