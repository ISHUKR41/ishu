import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";
import { stateModule } from "../backend";

export default function assamResultsPage() {
  return (
    <>
      <PageMeta
        title={stateModule.title}
        description={stateModule.description}
        keywords={stateModule.keywords}
        canonical={stateModule.canonical}
      />
      <StateComingSoon
        stateName={stateModule.stateName}
        stateCode={stateModule.stateCode}
      />
    </>
  );
}
