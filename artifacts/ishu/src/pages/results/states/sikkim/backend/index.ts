// FILE: artifacts/ishu/src/pages/results/states/sikkim/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Sikkim Exam Results - Latest Updates | Ishu",
  description: "Get the latest Sikkim government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Sikkim results, Sikkim exam results, Sikkim government jobs, Sikkim vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/sikkim",
  stateName: "Sikkim",
  stateCode: "sikkim",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
