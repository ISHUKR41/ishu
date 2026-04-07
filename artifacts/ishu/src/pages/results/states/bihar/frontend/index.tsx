import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function biharResultsPage() {
  return (
    <>
      <PageMeta
        title="Bihar Exam Results - Latest Updates | Ishu"
        description="Get the latest Bihar government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Bihar results, Bihar exam results, Bihar government jobs, Bihar vacancies, state PSC results"
        canonical="https://ishu.in/results/states/bihar"
      />
      <StateComingSoon 
        stateName="Bihar"
        stateCode="bihar"
      />
    </>
  );
}
