// FILE: artifacts/ishu/src/pages/news/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { lazy, useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { LazySection } from "@/components/performance/LazySection";

const NewsHero = lazy(() =>
  import("./sections/hero/NewsHero").then((module) => ({ default: module.NewsHero })),
);
const NewsFilters = lazy(() =>
  import("./sections/filters/NewsFilters").then((module) => ({ default: module.NewsFilters })),
);
const NewsGrid = lazy(() =>
  import("./sections/grid/NewsGrid").then((module) => ({ default: module.NewsGrid })),
);

export default function News() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <PageMeta
        title="Education & Government Jobs News 2025 | Ishu"
        description="Latest news on education, government jobs, entrance exams, scholarships and results. Stay updated with Ishu - India's premier education news platform."
        keywords="education news india, government jobs news, ssc news, upsc news, entrance exam news, scholarship news, results news"
        canonical="https://ishu.in/news"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Education & Government Jobs News",
          description:
            "Latest education and government jobs news for students across India.",
          url: "https://ishu.in/news",
        }}
      />
      <div>
        <LazySection minHeight={320} eager>
          <NewsHero />
        </LazySection>
        <LazySection minHeight={130}>
          <NewsFilters
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
          <NewsGrid
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
