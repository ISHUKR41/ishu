// FILE: artifacts/ishu/src/pages/results/states/maharashtra/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Maharashtra Exam Results - Latest Updates | Ishu",
  description: "Get the latest Maharashtra government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Maharashtra results, Maharashtra exam results, Maharashtra government jobs, Maharashtra vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/maharashtra",
  stateName: "Maharashtra",
  stateCode: "maharashtra",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
