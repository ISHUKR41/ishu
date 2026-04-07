import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function chandigarhResultsPage() {
  return (
    <>
      <PageMeta
        title="Chandigarh Exam Results - Latest Updates | Ishu"
        description="Get the latest Chandigarh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Chandigarh results, Chandigarh exam results, Chandigarh government jobs, Chandigarh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/chandigarh"
      />
      <StateComingSoon 
        stateName="Chandigarh"
        stateCode="chandigarh"
      />
    </>
  );
}
