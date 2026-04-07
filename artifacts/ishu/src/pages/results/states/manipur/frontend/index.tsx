import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function manipurResultsPage() {
  return (
    <>
      <PageMeta
        title="Manipur Exam Results - Latest Updates | Ishu"
        description="Get the latest Manipur government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Manipur results, Manipur exam results, Manipur government jobs, Manipur vacancies, state PSC results"
        canonical="https://ishu.in/results/states/manipur"
      />
      <StateComingSoon 
        stateName="Manipur"
        stateCode="manipur"
      />
    </>
  );
}
