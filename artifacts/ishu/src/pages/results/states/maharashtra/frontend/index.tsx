import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function maharashtraResultsPage() {
  return (
    <>
      <PageMeta
        title="Maharashtra Exam Results - Latest Updates | Ishu"
        description="Get the latest Maharashtra government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Maharashtra results, Maharashtra exam results, Maharashtra government jobs, Maharashtra vacancies, state PSC results"
        canonical="https://ishu.in/results/states/maharashtra"
      />
      <StateComingSoon 
        stateName="Maharashtra"
        stateCode="maharashtra"
      />
    </>
  );
}
