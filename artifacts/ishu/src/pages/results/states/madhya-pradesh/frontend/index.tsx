import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function madhya_pradeshResultsPage() {
  return (
    <>
      <PageMeta
        title="Madhya Pradesh Exam Results - Latest Updates | Ishu"
        description="Get the latest Madhya Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Madhya Pradesh results, Madhya Pradesh exam results, Madhya Pradesh government jobs, Madhya Pradesh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/madhya-pradesh"
      />
      <StateComingSoon 
        stateName="Madhya Pradesh"
        stateCode="madhya-pradesh"
      />
    </>
  );
}
