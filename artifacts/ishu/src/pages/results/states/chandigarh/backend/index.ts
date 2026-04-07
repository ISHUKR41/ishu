import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Chandigarh Exam Results - Latest Updates | Ishu",
  description: "Get the latest Chandigarh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Chandigarh results, Chandigarh exam results, Chandigarh government jobs, Chandigarh vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/chandigarh",
  stateName: "Chandigarh",
  stateCode: "chandigarh",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
