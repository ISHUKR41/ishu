import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function haryanaResultsPage() {
  return (
    <>
      <PageMeta
        title="Haryana Exam Results - Latest Updates | Ishu"
        description="Get the latest Haryana government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Haryana results, Haryana exam results, Haryana government jobs, Haryana vacancies, state PSC results"
        canonical="https://ishu.in/results/states/haryana"
      />
      <StateComingSoon 
        stateName="Haryana"
        stateCode="haryana"
      />
    </>
  );
}
