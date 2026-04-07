import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Tripura Exam Results - Latest Updates | Ishu",
  description: "Get the latest Tripura government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Tripura results, Tripura exam results, Tripura government jobs, Tripura vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/tripura",
  stateName: "Tripura",
  stateCode: "tripura",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
