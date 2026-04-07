import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function lakshadweepResultsPage() {
  return (
    <>
      <PageMeta
        title="Lakshadweep Exam Results - Latest Updates | Ishu"
        description="Get the latest Lakshadweep government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Lakshadweep results, Lakshadweep exam results, Lakshadweep government jobs, Lakshadweep vacancies, state PSC results"
        canonical="https://ishu.in/results/states/lakshadweep"
      />
      <StateComingSoon 
        stateName="Lakshadweep"
        stateCode="lakshadweep"
      />
    </>
  );
}
