// FILE: artifacts/ishu/src/pages/results/states/assam/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Assam Exam Results - Latest Updates | Ishu",
  description: "Get the latest Assam government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Assam results, Assam exam results, Assam government jobs, Assam vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/assam",
  stateName: "Assam",
  stateCode: "assam",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
