// ============================================================================
// FILE: modules/Results/index.tsx
// PURPOSE: The main orchestrator for the Results page. This file assembles all
//          modular sections (HeroSection, CategoryGrid, ResultsList, StateSelector)
//          into the complete Results page layout.
//
// ARCHITECTURE: This is a composition root — it imports each isolated section
//               and arranges them in the correct visual order. Adding or removing
//               a section from this file will NOT affect any other page.
//
// HOW TO ADD A NEW SECTION:
//   1. Create your section in modules/Results/YourSection/frontend/index.tsx
//   2. Create its paired backend in modules/Results/YourSection/backend/index.ts
//   3. Import the frontend component here and add it to the JSX below
//   4. Register the backend route in api-server/src/routes/index.ts
//
// SEO: This page includes structured data (JSON-LD) for search engine
//      optimization, targeting "sarkari result" and related keywords.
// ============================================================================

import React from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import ResultsHeroSection from "./HeroSection/frontend";
import ResultsCategoryGrid from "./CategoryGrid/frontend";
import ResultsList from "./ResultsList/frontend";
import ResultsStateSelector from "./StateSelector/frontend";

/**
 * ResultsPage — The complete Results page assembled from isolated modules.
 *
 * SECTION ORDER:
 * 1. HeroSection — Animated hero with search bar and stat counters
 * 2. CategoryGrid — 12 exam category cards (UPSC, SSC, Banking, etc.)
 * 3. ResultsList — Paginated listing of all latest results
 * 4. StateSelector — Grid of all 36 Indian states and UTs
 *
 * Each section fetches its own data from its own backend endpoint.
 * No section depends on data from another section.
 */
export default function ResultsPage() {
  return (
    <>
      {/* ── SEO Meta Tags & Structured Data ── */}
      <PageMeta
        title="Government Exam Results 2024-25 | UPSC, SSC, Banking, Railway | ISHU"
        description="Get latest government exam results for UPSC, SSC CGL, IBPS PO, RRB NTPC, JEE, NEET, State PSC and all central & state level examinations. Check results, cutoff marks, and merit lists."
        keywords="sarkari result, government exam results, upsc result, ssc result, ibps result, rrb result, jee result, neet result, state psc result, banking result, railway result, exam results 2024"
        canonical="https://ishu.in/results"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Government Exam Results",
          description:
            "Comprehensive listing of all government examination results across India including UPSC, SSC, Banking, Railway, JEE, NEET, and State PSC exams.",
          url: "https://ishu.in/results",
          isPartOf: {
            "@type": "WebSite",
            name: "ISHU - Indian Student Hub University",
            url: "https://ishu.in",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ishu.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Results",
                item: "https://ishu.in/results",
              },
            ],
          },
        }}
      />

      {/* ── Page sections in order ── */}
      <div className="flex flex-col min-h-screen">
        <ResultsHeroSection />
        <ResultsCategoryGrid />
        <ResultsList />
        <ResultsStateSelector />
      </div>
    </>
  );
}
