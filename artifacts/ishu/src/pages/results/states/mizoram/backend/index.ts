import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Mizoram Exam Results - Latest Updates | Ishu",
  description: "Get the latest Mizoram government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Mizoram results, Mizoram exam results, Mizoram government jobs, Mizoram vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/mizoram",
  stateName: "Mizoram",
  stateCode: "mizoram",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
