// FILE: artifacts/ishu/src/pages/blog/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { lazy, useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { LazySection } from "@/components/performance/LazySection";

const BlogHero = lazy(() =>
  import("./sections/hero/BlogHero").then((module) => ({ default: module.BlogHero })),
);
const BlogFilters = lazy(() =>
  import("./sections/filters/BlogFilters").then((module) => ({ default: module.BlogFilters })),
);
const BlogGrid = lazy(() =>
  import("./sections/grid/BlogGrid").then((module) => ({ default: module.BlogGrid })),
);

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <PageMeta
        title="Expert Career Guidance & Exam Tips Blog | Ishu"
        description="Read expert career guidance, exam tips, study strategies, success stories and news analysis for UPSC, SSC, Banking and all government exams."
        keywords="upsc blog, ssc exam tips, government exam preparation, career guidance india, exam tips blog, study strategies"
        canonical="https://ishu.in/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Ishu Blog",
          description:
            "Expert career guidance, exam tips, and success stories for government exam aspirants.",
          url: "https://ishu.in/blog",
        }}
      />
      <div>
        <LazySection minHeight={320} eager>
          <BlogHero />
        </LazySection>
        <LazySection minHeight={130}>
          <BlogFilters
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
          <BlogGrid
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
