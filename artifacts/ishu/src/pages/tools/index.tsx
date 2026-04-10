// FILE: artifacts/ishu/src/pages/tools/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { lazy, useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { LazySection } from "@/components/performance/LazySection";

const ToolsHero = lazy(() =>
  import("./sections/hero/ToolsHero").then((module) => ({ default: module.ToolsHero })),
);
const ToolsFilters = lazy(() =>
  import("./sections/filters/ToolsFilters").then((module) => ({ default: module.ToolsFilters })),
);
const ToolsGrid = lazy(() =>
  import("./sections/grid/ToolsGrid").then((module) => ({ default: module.ToolsGrid })),
);

export default function Tools() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <PageMeta
        title="100+ Free PDF & AI Tools Online | Ishu"
        description="Use 100+ free online PDF tools - merge, compress, convert, edit PDFs. AI-powered tools for students and professionals. No registration required."
        keywords="free pdf tools, pdf merger online, pdf compressor, pdf to word, pdf converter, online pdf editor, free tools india"
        canonical="https://ishu.in/tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Free PDF & AI Tools",
          description:
            "100+ free online PDF tools and AI-powered tools for students and professionals.",
          url: "https://ishu.in/tools",
        }}
      />
      <div>
        <LazySection minHeight={320} eager>
          <ToolsHero />
        </LazySection>
        <LazySection minHeight={130}>
          <ToolsFilters
            search={search}
            category={category}
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onCategory={(v) => {
              setCategory(v);
              setPage(1);
            }}
          />
        </LazySection>
        <LazySection minHeight={560}>
          <ToolsGrid
            search={search}
            category={category}
            page={page}
            onPageChange={setPage}
          />
        </LazySection>
      </div>
    </>
  );
}
