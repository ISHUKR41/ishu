import { useStateResults } from "../../_shared/backend/useStateResults";

export const stateModule = {
  title: "Dadra and Nagar Haveli and Daman and Diu Exam Results - Latest Updates | Ishu",
  description: "Get the latest Dadra and Nagar Haveli and Daman and Diu government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies.",
  keywords: "Dadra and Nagar Haveli and Daman and Diu results, Dadra and Nagar Haveli and Daman and Diu exam results, Dadra and Nagar Haveli and Daman and Diu government jobs, Dadra and Nagar Haveli and Daman and Diu vacancies, state PSC results",
  canonical: "https://ishu.in/results/states/dadra-nagar-haveli-daman-diu",
  stateName: "Dadra and Nagar Haveli and Daman and Diu",
  stateCode: "dadra-nagar-haveli-daman-diu",
} as const;

export function useStateModuleResults() {
  return useStateResults(stateModule.stateName);
}
