import { useState } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ResultsHero } from "./sections/hero/ResultsHero";
import { ResultsFilters } from "./sections/filters/ResultsFilters";
import { ResultsGrid } from "./sections/grid/ResultsGrid";

export default function Results() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setPage(1);
  };

  return (
    <>
      <PageMeta
        title="Government Exam Results 2025 - UPSC, SSC, Railway, Banking | Ishu"
        description="Get the latest government exam results for UPSC, SSC CGL, IBPS, RRB NTPC, NEET, JEE and 500+ exams. Updated daily from official sources."
        keywords="government exam results, upsc result 2025, ssc cgl result, ibps result, rrb ntpc result, neet result, jee result"
        canonical="https://ishu.in/results"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Government Exam Results",
          description:
            "Latest government exam results for UPSC, SSC, Railway, Banking, and 500+ exams.",
          url: "https://ishu.in/results",
        }}
      />
      <div>
        <ResultsHero />
        <ResultsFilters
          search={search}
          category={category}
          status={status}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          onCategory={(v) => { setCategory(v); setPage(1); }}
          onStatus={(v) => { setStatus(v); setPage(1); }}
          onReset={handleReset}
        />
        <ResultsGrid
          search={search}
          category={category}
          status={status}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
