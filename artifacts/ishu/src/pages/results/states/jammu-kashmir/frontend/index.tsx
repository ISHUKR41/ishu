import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function jammu_kashmirResultsPage() {
  return (
    <>
      <PageMeta
        title="Jammu and Kashmir Exam Results - Latest Updates | Ishu"
        description="Get the latest Jammu and Kashmir government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Jammu and Kashmir results, Jammu and Kashmir exam results, Jammu and Kashmir government jobs, Jammu and Kashmir vacancies, state PSC results"
        canonical="https://ishu.in/results/states/jammu-kashmir"
      />
      <StateComingSoon 
        stateName="Jammu and Kashmir"
        stateCode="jammu-kashmir"
      />
    </>
  );
}
