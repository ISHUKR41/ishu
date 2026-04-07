import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function gujaratResultsPage() {
  return (
    <>
      <PageMeta
        title="Gujarat Exam Results - Latest Updates | Ishu"
        description="Get the latest Gujarat government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Gujarat results, Gujarat exam results, Gujarat government jobs, Gujarat vacancies, state PSC results"
        canonical="https://ishu.in/results/states/gujarat"
      />
      <StateComingSoon 
        stateName="Gujarat"
        stateCode="gujarat"
      />
    </>
  );
}
