import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function assamResultsPage() {
  return (
    <>
      <PageMeta
        title="Assam Exam Results - Latest Updates | Ishu"
        description="Get the latest Assam government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Assam results, Assam exam results, Assam government jobs, Assam vacancies, state PSC results"
        canonical="https://ishu.in/results/states/assam"
      />
      <StateComingSoon 
        stateName="Assam"
        stateCode="assam"
      />
    </>
  );
}
