import { useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { NewsHero } from "./sections/hero/NewsHero";
import { NewsFilters } from "./sections/filters/NewsFilters";
import { NewsGrid } from "./sections/grid/NewsGrid";

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
        <NewsHero />
        <NewsFilters
          search={search}
          category={category}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          onCategory={(v) => { setCategory(v); setPage(1); }}
        />
        <NewsGrid
          search={search}
          category={category}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
