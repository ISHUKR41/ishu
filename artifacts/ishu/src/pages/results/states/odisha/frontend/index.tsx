import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function odishaResultsPage() {
  return (
    <>
      <PageMeta
        title="Odisha Exam Results - Latest Updates | Ishu"
        description="Get the latest Odisha government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Odisha results, Odisha exam results, Odisha government jobs, Odisha vacancies, state PSC results"
        canonical="https://ishu.in/results/states/odisha"
      />
      <StateComingSoon 
        stateName="Odisha"
        stateCode="odisha"
      />
    </>
  );
}
