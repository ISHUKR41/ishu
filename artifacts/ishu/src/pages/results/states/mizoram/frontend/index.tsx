import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function mizoramResultsPage() {
  return (
    <>
      <PageMeta
        title="Mizoram Exam Results - Latest Updates | Ishu"
        description="Get the latest Mizoram government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Mizoram results, Mizoram exam results, Mizoram government jobs, Mizoram vacancies, state PSC results"
        canonical="https://ishu.in/results/states/mizoram"
      />
      <StateComingSoon 
        stateName="Mizoram"
        stateCode="mizoram"
      />
    </>
  );
}
