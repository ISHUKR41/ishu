// FILE: artifacts/ishu/src/pages/results/states/telangana/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Telangana Exam Results - Latest Updates | Ishu",
  description: "Get the latest Telangana government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Telangana results, Telangana exam results, Telangana government jobs, Telangana vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/telangana",
  stateName: "Telangana",
  stateCode: "telangana",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
