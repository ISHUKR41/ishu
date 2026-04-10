// FILE: artifacts/ishu/src/pages/results/states/manipur/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Manipur Exam Results - Latest Updates | Ishu",
  description: "Get the latest Manipur government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Manipur results, Manipur exam results, Manipur government jobs, Manipur vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/manipur",
  stateName: "Manipur",
  stateCode: "manipur",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
