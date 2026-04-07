import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function tamil_naduResultsPage() {
  return (
    <>
      <PageMeta
        title="Tamil Nadu Exam Results - Latest Updates | Ishu"
        description="Get the latest Tamil Nadu government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Tamil Nadu results, Tamil Nadu exam results, Tamil Nadu government jobs, Tamil Nadu vacancies, state PSC results"
        canonical="https://ishu.in/results/states/tamil-nadu"
      />
      <StateComingSoon 
        stateName="Tamil Nadu"
        stateCode="tamil-nadu"
      />
    </>
  );
}
