import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function punjabResultsPage() {
  return (
    <>
      <PageMeta
        title="Punjab Exam Results - Latest Updates | Ishu"
        description="Get the latest Punjab government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Punjab results, Punjab exam results, Punjab government jobs, Punjab vacancies, state PSC results"
        canonical="https://ishu.in/results/states/punjab"
      />
      <StateComingSoon 
        stateName="Punjab"
        stateCode="punjab"
      />
    </>
  );
}
