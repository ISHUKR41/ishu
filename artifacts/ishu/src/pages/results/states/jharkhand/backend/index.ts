import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Jharkhand Exam Results - Latest Updates | Ishu",
  description: "Get the latest Jharkhand government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Jharkhand results, Jharkhand exam results, Jharkhand government jobs, Jharkhand vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/jharkhand",
  stateName: "Jharkhand",
  stateCode: "jharkhand",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
