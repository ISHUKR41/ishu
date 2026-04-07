import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Odisha Exam Results - Latest Updates | Ishu",
  description: "Get the latest Odisha government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Odisha results, Odisha exam results, Odisha government jobs, Odisha vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/odisha",
  stateName: "Odisha",
  stateCode: "odisha",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
