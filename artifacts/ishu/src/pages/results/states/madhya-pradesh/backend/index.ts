// FILE: artifacts/ishu/src/pages/results/states/madhya-pradesh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Madhya Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Madhya Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Madhya Pradesh results, Madhya Pradesh exam results, Madhya Pradesh government jobs, Madhya Pradesh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/madhya-pradesh",
  stateName: "Madhya Pradesh",
  stateCode: "madhya-pradesh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
