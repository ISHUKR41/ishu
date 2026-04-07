import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Lakshadweep Exam Results - Latest Updates | Ishu",
  description: "Get the latest Lakshadweep government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Lakshadweep results, Lakshadweep exam results, Lakshadweep government jobs, Lakshadweep vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/lakshadweep",
  stateName: "Lakshadweep",
  stateCode: "lakshadweep",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
