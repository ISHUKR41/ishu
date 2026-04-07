import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Puducherry Exam Results - Latest Updates | Ishu",
  description: "Get the latest Puducherry government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Puducherry results, Puducherry exam results, Puducherry government jobs, Puducherry vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/puducherry",
  stateName: "Puducherry",
  stateCode: "puducherry",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
