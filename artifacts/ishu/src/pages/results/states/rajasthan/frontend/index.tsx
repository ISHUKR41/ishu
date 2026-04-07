import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function rajasthanResultsPage() {
  return (
    <>
      <PageMeta
        title="Rajasthan Exam Results - Latest Updates | Ishu"
        description="Get the latest Rajasthan government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Rajasthan results, Rajasthan exam results, Rajasthan government jobs, Rajasthan vacancies, state PSC results"
        canonical="https://ishu.in/results/states/rajasthan"
      />
      <StateComingSoon 
        stateName="Rajasthan"
        stateCode="rajasthan"
      />
    </>
  );
}
