import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function keralaResultsPage() {
  return (
    <>
      <PageMeta
        title="Kerala Exam Results - Latest Updates | Ishu"
        description="Get the latest Kerala government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Kerala results, Kerala exam results, Kerala government jobs, Kerala vacancies, state PSC results"
        canonical="https://ishu.in/results/states/kerala"
      />
      <StateComingSoon 
        stateName="Kerala"
        stateCode="kerala"
      />
    </>
  );
}
