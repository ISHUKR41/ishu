// FILE: artifacts/ishu/src/pages/results/states/karnataka/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Karnataka Exam Results - Latest Updates | Ishu",
  description: "Get the latest Karnataka government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Karnataka results, Karnataka exam results, Karnataka government jobs, Karnataka vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/karnataka",
  stateName: "Karnataka",
  stateCode: "karnataka",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
