import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function andhra_pradeshResultsPage() {
  return (
    <>
      <PageMeta
        title="Andhra Pradesh Exam Results - Latest Updates | Ishu"
        description="Get the latest Andhra Pradesh government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Andhra Pradesh results, Andhra Pradesh exam results, Andhra Pradesh government jobs, Andhra Pradesh vacancies, state PSC results"
        canonical="https://ishu.in/results/states/andhra-pradesh"
      />
      <StateComingSoon 
        stateName="Andhra Pradesh"
        stateCode="andhra-pradesh"
      />
    </>
  );
}
