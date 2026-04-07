import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function ladakhResultsPage() {
  return (
    <>
      <PageMeta
        title="Ladakh Exam Results - Latest Updates | Ishu"
        description="Get the latest Ladakh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Ladakh results, Ladakh exam results, Ladakh government jobs, Ladakh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/ladakh"
      />
      <StateComingSoon 
        stateName="Ladakh"
        stateCode="ladakh"
      />
    </>
  );
}
