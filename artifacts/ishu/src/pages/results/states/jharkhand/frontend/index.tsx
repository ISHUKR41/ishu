import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function jharkhandResultsPage() {
  return (
    <>
      <PageMeta
        title="Jharkhand Exam Results - Latest Updates | Ishu"
        description="Get the latest Jharkhand government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Jharkhand results, Jharkhand exam results, Jharkhand government jobs, Jharkhand vacancies, state PSC results"
        canonical="https://ishu.in/results/states/jharkhand"
      />
      <StateComingSoon 
        stateName="Jharkhand"
        stateCode="jharkhand"
      />
    </>
  );
}
