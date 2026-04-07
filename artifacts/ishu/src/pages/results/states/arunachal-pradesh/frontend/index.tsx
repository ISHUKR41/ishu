import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function arunachal_pradeshResultsPage() {
  return (
    <>
      <PageMeta
        title="Arunachal Pradesh Exam Results - Latest Updates | Ishu"
        description="Get the latest Arunachal Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Arunachal Pradesh results, Arunachal Pradesh exam results, Arunachal Pradesh government jobs, Arunachal Pradesh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/arunachal-pradesh"
      />
      <StateComingSoon 
        stateName="Arunachal Pradesh"
        stateCode="arunachal-pradesh"
      />
    </>
  );
}
