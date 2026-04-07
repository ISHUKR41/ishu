import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function puducherryResultsPage() {
  return (
    <>
      <PageMeta
        title="Puducherry Exam Results - Latest Updates | Ishu"
        description="Get the latest Puducherry government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Puducherry results, Puducherry exam results, Puducherry government jobs, Puducherry vacancies, state PSC results"
        canonical="https://ishu.in/results/states/puducherry"
      />
      <StateComingSoon 
        stateName="Puducherry"
        stateCode="puducherry"
      />
    </>
  );
}
