// FILE: artifacts/ishu/src/pages/results/states/chhattisgarh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Chhattisgarh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Chhattisgarh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Chhattisgarh results, Chhattisgarh exam results, Chhattisgarh government jobs, Chhattisgarh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/chhattisgarh",
  stateName: "Chhattisgarh",
  stateCode: "chhattisgarh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
