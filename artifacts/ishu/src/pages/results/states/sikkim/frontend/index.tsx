// FILE: artifacts/ishu/src/pages/results/states/sikkim/frontend/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { PageMeta } from "@/components/layout/PageMeta";
import { StateComingSoon } from "../../_shared/frontend/StateComingSoon";
import { stateModule } from "../backend";

export default function sikkimResultsPage() {
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
