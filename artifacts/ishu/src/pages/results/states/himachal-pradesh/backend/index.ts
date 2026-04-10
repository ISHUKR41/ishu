// FILE: artifacts/ishu/src/pages/results/states/himachal-pradesh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Himachal Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Himachal Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Himachal Pradesh results, Himachal Pradesh exam results, Himachal Pradesh government jobs, Himachal Pradesh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/himachal-pradesh",
  stateName: "Himachal Pradesh",
  stateCode: "himachal-pradesh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
