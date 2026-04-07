import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Meghalaya Exam Results - Latest Updates | Ishu",
  description: "Get the latest Meghalaya government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Meghalaya results, Meghalaya exam results, Meghalaya government jobs, Meghalaya vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/meghalaya",
  stateName: "Meghalaya",
  stateCode: "meghalaya",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
