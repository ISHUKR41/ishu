// FILE: artifacts/ishu/src/pages/results/states/kerala/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Kerala Exam Results - Latest Updates | Ishu",
  description: "Get the latest Kerala government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Kerala results, Kerala exam results, Kerala government jobs, Kerala vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/kerala",
  stateName: "Kerala",
  stateCode: "kerala",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
