import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function telanganaResultsPage() {
  return (
    <>
      <PageMeta
        title="Telangana Exam Results - Latest Updates | Ishu"
        description="Get the latest Telangana government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Telangana results, Telangana exam results, Telangana government jobs, Telangana vacancies, state PSC results"
        canonical="https://ishu.in/results/states/telangana"
      />
      <StateComingSoon 
        stateName="Telangana"
        stateCode="telangana"
      />
    </>
  );
}
