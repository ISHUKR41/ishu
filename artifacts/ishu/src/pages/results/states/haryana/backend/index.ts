import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Haryana Exam Results - Latest Updates | Ishu",
  description: "Get the latest Haryana government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Haryana results, Haryana exam results, Haryana government jobs, Haryana vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/haryana",
  stateName: "Haryana",
  stateCode: "haryana",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
