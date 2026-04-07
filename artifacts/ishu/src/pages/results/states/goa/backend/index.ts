import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Goa Exam Results - Latest Updates | Ishu",
  description: "Get the latest Goa government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Goa results, Goa exam results, Goa government jobs, Goa vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/goa",
  stateName: "Goa",
  stateCode: "goa",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
