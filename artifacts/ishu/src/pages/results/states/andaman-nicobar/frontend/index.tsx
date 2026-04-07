import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";

export default function andaman_nicobarResultsPage() {
  return (
    <>
      <PageMeta
        title="Andaman and Nicobar Islands Exam Results - Latest Updates | Ishu"
        description="Get the latest Andaman and Nicobar Islands government exam results, notifications, and updates. Stay informed about all state-level examinations and vacancies."
        keywords="Andaman and Nicobar Islands results, Andaman and Nicobar Islands exam results, Andaman and Nicobar Islands government jobs, Andaman and Nicobar Islands vacancies, state PSC results"
        canonical="https://ishu.in/results/states/andaman-nicobar"
      />
      <StateComingSoon 
        stateName="Andaman and Nicobar Islands"
        stateCode="andaman-nicobar"
      />
    </>
  );
}
