// FILE: artifacts/ishu/src/pages/results/states/arunachal-pradesh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Arunachal Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Arunachal Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Arunachal Pradesh results, Arunachal Pradesh exam results, Arunachal Pradesh government jobs, Arunachal Pradesh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/arunachal-pradesh",
  stateName: "Arunachal Pradesh",
  stateCode: "arunachal-pradesh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
