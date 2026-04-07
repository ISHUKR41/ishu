import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "West Bengal Exam Results - Latest Updates | Ishu",
  description: "Get the latest West Bengal government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "West Bengal results, West Bengal exam results, West Bengal government jobs, West Bengal vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/west-bengal",
  stateName: "West Bengal",
  stateCode: "west-bengal",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
