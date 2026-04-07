import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function nagalandResultsPage() {
  return (
    <>
      <PageMeta
        title="Nagaland Exam Results - Latest Updates | Ishu"
        description="Get the latest Nagaland government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Nagaland results, Nagaland exam results, Nagaland government jobs, Nagaland vacancies, state PSC results"
        canonical="https://ishu.in/results/states/nagaland"
      />
      <StateComingSoon 
        stateName="Nagaland"
        stateCode="nagaland"
      />
    </>
  );
}
