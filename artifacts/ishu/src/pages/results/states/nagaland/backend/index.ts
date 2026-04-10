// FILE: artifacts/ishu/src/pages/results/states/nagaland/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Nagaland Exam Results - Latest Updates | Ishu",
  description: "Get the latest Nagaland government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Nagaland results, Nagaland exam results, Nagaland government jobs, Nagaland vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/nagaland",
  stateName: "Nagaland",
  stateCode: "nagaland",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
