import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function chhattisgarhResultsPage() {
  return (
    <>
      <PageMeta
        title="Chhattisgarh Exam Results - Latest Updates | Ishu"
        description="Get the latest Chhattisgarh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Chhattisgarh results, Chhattisgarh exam results, Chhattisgarh government jobs, Chhattisgarh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/chhattisgarh"
      />
      <StateComingSoon 
        stateName="Chhattisgarh"
        stateCode="chhattisgarh"
      />
    </>
  );
}
