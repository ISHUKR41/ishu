import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function delhiResultsPage() {
  return (
    <>
      <PageMeta
        title="Delhi Exam Results - Latest Updates | Ishu"
        description="Get the latest Delhi government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Delhi results, Delhi exam results, Delhi government jobs, Delhi vacancies, state PSC results"
        canonical="https://ishu.in/results/states/delhi"
      />
      <StateComingSoon 
        stateName="Delhi"
        stateCode="delhi"
      />
    </>
  );
}
