// FILE: artifacts/ishu/src/pages/results/states/andhra-pradesh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Andhra Pradesh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Andhra Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Andhra Pradesh results, Andhra Pradesh exam results, Andhra Pradesh government jobs, Andhra Pradesh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/andhra-pradesh",
  stateName: "Andhra Pradesh",
  stateCode: "andhra-pradesh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
