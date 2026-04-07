import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Rajasthan Exam Results - Latest Updates | Ishu",
  description: "Get the latest Rajasthan government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Rajasthan results, Rajasthan exam results, Rajasthan government jobs, Rajasthan vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/rajasthan",
  stateName: "Rajasthan",
  stateCode: "rajasthan",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
