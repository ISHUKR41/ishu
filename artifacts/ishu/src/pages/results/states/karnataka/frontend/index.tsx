import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function karnatakaResultsPage() {
  return (
    <>
      <PageMeta
        title="Karnataka Exam Results - Latest Updates | Ishu"
        description="Get the latest Karnataka government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Karnataka results, Karnataka exam results, Karnataka government jobs, Karnataka vacancies, state PSC results"
        canonical="https://ishu.in/results/states/karnataka"
      />
      <StateComingSoon 
        stateName="Karnataka"
        stateCode="karnataka"
      />
    </>
  );
}
