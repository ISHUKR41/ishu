// FILE: artifacts/ishu/src/pages/results/states/ladakh/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Ladakh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Ladakh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Ladakh results, Ladakh exam results, Ladakh government jobs, Ladakh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/ladakh",
  stateName: "Ladakh",
  stateCode: "ladakh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
