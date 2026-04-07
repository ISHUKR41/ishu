import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function meghalayaResultsPage() {
  return (
    <>
      <PageMeta
        title="Meghalaya Exam Results - Latest Updates | Ishu"
        description="Get the latest Meghalaya government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Meghalaya results, Meghalaya exam results, Meghalaya government jobs, Meghalaya vacancies, state PSC results"
        canonical="https://ishu.in/results/states/meghalaya"
      />
      <StateComingSoon 
        stateName="Meghalaya"
        stateCode="meghalaya"
      />
    </>
  );
}
