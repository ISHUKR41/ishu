// FILE: artifacts/ishu/src/pages/resources/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { lazy, useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { LazySection } from "@/components/performance/LazySection";

const ResourcesHero = lazy(() =>
  import("./sections/hero/ResourcesHero").then((module) => ({ default: module.ResourcesHero })),
);
const ResourcesCategories = lazy(() =>
  import("./sections/categories/ResourcesCategories").then((module) => ({ default: module.ResourcesCategories })),
);
const FeaturedResources = lazy(() =>
  import("./sections/featured/FeaturedResources").then((module) => ({ default: module.FeaturedResources })),
);
const ResourcesGrid = lazy(() =>
  import("./sections/grid/ResourcesGrid").then((module) => ({ default: module.ResourcesGrid })),
);

export default function Resources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <>
      <PageMeta
        title="Free Study Resources - UPSC, SSC, Banking, RRB | Ishu"
        description="Download free study materials, previous year question papers, mock tests, syllabus, and notes for UPSC, SSC CGL, IBPS, SBI, RRB NTPC, NEET, JEE and all government exams."
        keywords="free study materials, upsc previous papers, ssc syllabus, ibps mock tests, neet study notes, jee formula sheets, rrb previous papers, free pdf download, government exam resources"
        canonical="https://ishu.in/resources"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Study Resources for Indian Government Exams",
          description: "Download free study materials, previous year question papers, mock tests, syllabus, and notes for all government exams in India.",
          url: "https://ishu.in/resources",
          isPartOf: {
            "@type": "WebSite",
            name: "Ishu",
            url: "https://ishu.in",
          },
        }}
      />
      <div>
        <LazySection minHeight={330} eager>
          <ResourcesHero search={search} onSearch={setSearch} />
        </LazySection>
        <LazySection minHeight={130}>
          <ResourcesCategories active={category} onSelect={setCategory} />
        </LazySection>
        {!search && category === "all" && (
          <LazySection minHeight={300}>
            <FeaturedResources />
          </LazySection>
        )}
        <LazySection minHeight={560}>
          <ResourcesGrid category={category} search={search} />
        </LazySection>
      </div>
    </>
  );
}
