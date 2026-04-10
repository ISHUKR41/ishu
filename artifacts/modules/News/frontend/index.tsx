// ============================================================================
// FILE: modules/News/index.tsx
// PURPOSE: Main orchestrator for the News page — assembles all News sections
//          (HeroSection, CategoryFilter, NewsFeed) into the complete layout.
//
// SEO: Includes structured data targeting "educational news india" keywords.
// ============================================================================

import { lazy } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import { LazySection } from "@/components/performance/LazySection";

const NewsHeroSection = lazy(() => import("../HeroSection/frontend"));
const NewsCategoryFilter = lazy(() => import("../CategoryFilter/frontend"));
const NewsFeed = lazy(() => import("../NewsFeed/frontend"));

/**
 * NewsPage — Complete News page assembled from isolated modules.
 *
 * SECTION ORDER:
 * 1. HeroSection — Animated hero with breaking news
 * 2. CategoryFilter — Horizontal category badges
 * 3. NewsFeed — Paginated article listing
 */
export default function NewsPage() {
  return (
    <>
      <PageMeta
        title="Educational News & Exam Updates 2024-25 | ISHU"
        description="Latest educational news, government exam notifications, admit card releases, scholarship updates, and recruitment developments across India."
        keywords="educational news, exam notification, sarkari result news, upsc news, ssc news, banking news, railway news, scholarship news, admit card, education india"
        canonical="https://ishu.in/news"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Educational News & Updates",
          description: "Comprehensive educational news covering government exams, scholarships, and career updates.",
          url: "https://ishu.in/news",
        }}
      />
      <div className="flex flex-col min-h-screen">
        <LazySection minHeight={320} eager>
          <NewsHeroSection />
        </LazySection>
        <LazySection minHeight={120}>
          <NewsCategoryFilter />
        </LazySection>
        <LazySection minHeight={560}>
          <NewsFeed />
        </LazySection>
      </div>
    </>
  );
}
