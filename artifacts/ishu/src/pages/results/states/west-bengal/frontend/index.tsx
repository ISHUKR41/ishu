import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function west_bengalResultsPage() {
  return (
    <>
      <PageMeta
        title="West Bengal Exam Results - Latest Updates | Ishu"
        description="Get the latest West Bengal government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="West Bengal results, West Bengal exam results, West Bengal government jobs, West Bengal vacancies, state PSC results"
        canonical="https://ishu.in/results/states/west-bengal"
      />
      <StateComingSoon 
        stateName="West Bengal"
        stateCode="west-bengal"
      />
    </>
  );
}
