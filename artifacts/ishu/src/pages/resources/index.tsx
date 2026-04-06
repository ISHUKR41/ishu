import { useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ResourcesHero } from "./sections/hero/ResourcesHero";
import { ResourcesCategories } from "./sections/categories/ResourcesCategories";
import { FeaturedResources } from "./sections/featured/FeaturedResources";
import { ResourcesGrid } from "./sections/grid/ResourcesGrid";

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
        <ResourcesHero search={search} onSearch={setSearch} />
        <ResourcesCategories active={category} onSelect={setCategory} />
        {!search && category === "all" && <FeaturedResources />}
        <ResourcesGrid category={category} search={search} />
      </div>
    </>
  );
}
