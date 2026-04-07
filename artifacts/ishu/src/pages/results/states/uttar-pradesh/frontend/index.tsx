import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function uttar_pradeshResultsPage() {
  return (
    <>
      <PageMeta
        title="Uttar Pradesh Exam Results - Latest Updates | Ishu"
        description="Get the latest Uttar Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Uttar Pradesh results, Uttar Pradesh exam results, Uttar Pradesh government jobs, Uttar Pradesh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/uttar-pradesh"
      />
      <StateComingSoon 
        stateName="Uttar Pradesh"
        stateCode="uttar-pradesh"
      />
    </>
  );
}
