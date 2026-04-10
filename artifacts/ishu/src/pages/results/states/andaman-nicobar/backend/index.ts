// FILE: artifacts/ishu/src/pages/results/states/andaman-nicobar/backend/index.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Andaman and Nicobar Islands Exam Results - Latest Updates | Ishu",
  description: "Get the latest Andaman and Nicobar Islands government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Andaman and Nicobar Islands results, Andaman and Nicobar Islands exam results, Andaman and Nicobar Islands government jobs, Andaman and Nicobar Islands vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/andaman-nicobar",
  stateName: "Andaman and Nicobar Islands",
  stateCode: "andaman-nicobar",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
