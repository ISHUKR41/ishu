import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Gujarat Exam Results - Latest Updates | Ishu",
  description: "Get the latest Gujarat government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Gujarat results, Gujarat exam results, Gujarat government jobs, Gujarat vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/gujarat",
  stateName: "Gujarat",
  stateCode: "gujarat",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
