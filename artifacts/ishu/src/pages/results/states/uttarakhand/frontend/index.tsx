import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function uttarakhandResultsPage() {
  return (
    <>
      <PageMeta
        title="Uttarakhand Exam Results - Latest Updates | Ishu"
        description="Get the latest Uttarakhand government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Uttarakhand results, Uttarakhand exam results, Uttarakhand government jobs, Uttarakhand vacancies, state PSC results"
        canonical="https://ishu.in/results/states/uttarakhand"
      />
      <StateComingSoon 
        stateName="Uttarakhand"
        stateCode="uttarakhand"
      />
    </>
  );
}
