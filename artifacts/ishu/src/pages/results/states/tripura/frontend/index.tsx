import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function tripuraResultsPage() {
  return (
    <>
      <PageMeta
        title="Tripura Exam Results - Latest Updates | Ishu"
        description="Get the latest Tripura government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Tripura results, Tripura exam results, Tripura government jobs, Tripura vacancies, state PSC results"
        canonical="https://ishu.in/results/states/tripura"
      />
      <StateComingSoon 
        stateName="Tripura"
        stateCode="tripura"
      />
    </>
  );
}
