// FILE: artifacts/ishu/src/pages/results/states/tamil-nadu/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Tamil Nadu Exam Results - Latest Updates | Ishu",
  description: "Get the latest Tamil Nadu government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Tamil Nadu results, Tamil Nadu exam results, Tamil Nadu government jobs, Tamil Nadu vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/tamil-nadu",
  stateName: "Tamil Nadu",
  stateCode: "tamil-nadu",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
