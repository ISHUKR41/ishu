import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function sikkimResultsPage() {
  return (
    <>
      <PageMeta
        title="Sikkim Exam Results - Latest Updates | Ishu"
        description="Get the latest Sikkim government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Sikkim results, Sikkim exam results, Sikkim government jobs, Sikkim vacancies, state PSC results"
        canonical="https://ishu.in/results/states/sikkim"
      />
      <StateComingSoon 
        stateName="Sikkim"
        stateCode="sikkim"
      />
    </>
  );
}
