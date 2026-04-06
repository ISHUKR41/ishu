import { useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ResourcesHero } from "./sections/hero/ResourcesHero";
import { ResourcesCategories } from "./sections/categories/ResourcesCategories";
import { ResourcesGrid } from "./sections/grid/ResourcesGrid";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <>
      <PageMeta
        title="Free Study Resources - UPSC, SSC, Banking, RRB | Ishu"
        description="Download free study materials, previous year question papers, mock tests, syllabus, and notes for UPSC, SSC CGL, IBPS, SBI, RRB NTPC, NEET, JEE and all government exams."
      />
      <div>
        <ResourcesHero search={search} onSearch={setSearch} />
        <ResourcesCategories active={category} onSelect={setCategory} />
        <ResourcesGrid category={category} search={search} />
      </div>
    </>
  );
}
