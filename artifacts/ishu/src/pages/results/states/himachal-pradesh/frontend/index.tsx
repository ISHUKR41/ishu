import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function himachal_pradeshResultsPage() {
  return (
    <>
      <PageMeta
        title="Himachal Pradesh Exam Results - Latest Updates | Ishu"
        description="Get the latest Himachal Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Himachal Pradesh results, Himachal Pradesh exam results, Himachal Pradesh government jobs, Himachal Pradesh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/himachal-pradesh"
      />
      <StateComingSoon 
        stateName="Himachal Pradesh"
        stateCode="himachal-pradesh"
      />
    </>
  );
}
