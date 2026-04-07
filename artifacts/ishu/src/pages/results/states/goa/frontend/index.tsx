import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function goaResultsPage() {
  return (
    <>
      <PageMeta
        title="Goa Exam Results - Latest Updates | Ishu"
        description="Get the latest Goa government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Goa results, Goa exam results, Goa government jobs, Goa vacancies, state PSC results"
        canonical="https://ishu.in/results/states/goa"
      />
      <StateComingSoon 
        stateName="Goa"
        stateCode="goa"
      />
    </>
  );
}
