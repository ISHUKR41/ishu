// ============================================================================
// FILE: pages/home/index.tsx — Home Page Orchestrator
// PURPOSE: Composes all home page sections into a single page layout.
//          Each section is imported from its own isolated frontend module
//          within @/pages/home/sections/. These use React Query for proper
//          server-state management instead of raw fetch() calls.
//
// ROOT CAUSE FIX: Previously imported from @modules/Home/* which used raw
//                 fetch() and @ts-nocheck. Now uses the proper implementations
//                 in @/pages/home/sections/ with React Query hooks.
//
// SECTION ORDER:
//   1. HeroSection — Animated hero with gradient glows and trust badges
//   2. StatsSection — Real-time stats from the database via React Query
//   3. ExamCategories — Grid of 12 exam category cards
//   4. FeaturedResults — Latest featured exam results
//   5. ToolsShowcase — Preview of popular PDF/AI tools
//   6. NewsPreview — Latest 3 news articles
//   7. NotificationCTA — WhatsApp/email notification signup
//   8. Testimonials — Real student reviews from the API
//   9. BlogPreview — Recent blog articles
//  10. FAQ — Frequently asked questions accordion
//
// TECH STACK: React 18, Framer Motion, React Query, Tailwind CSS
// ============================================================================

import { PageMeta } from "@/components/layout/PageMeta";
import { HeroSection } from "./sections/hero/frontend";
import { StatsSection } from "./sections/stats/frontend";
import { ExamCategories } from "./sections/exam-categories/frontend";
import { FeaturedResults } from "./sections/featured-results/frontend";
import { ToolsShowcase } from "./sections/tools-showcase/frontend";
import { NewsPreview } from "./sections/news-preview/frontend";
import { NotificationCTA } from "./sections/notification-cta/frontend";
import { Testimonials } from "./sections/testimonials/frontend";
import { BlogPreview } from "./sections/blog-preview/frontend";
import { FAQ } from "./sections/faq/frontend";

/**
 * Home — The landing page assembled from isolated section modules.
 *
 * Each section fetches its own data independently using React Query hooks.
 * No section depends on data from any other section.
 * This architecture allows 100+ developers to work simultaneously without conflicts.
 */
export default function Home() {
  return (
    <>
      {/* SEO Meta Tags & Structured Data for search engine optimization */}
      <PageMeta
        title="Ishu - Education, Results, Tools & News Platform"
        description="Get government exam results, practical PDF tools, educational news, and career guidance in one platform for students and job seekers across India."
        keywords="government exam results, upsc results, ssc results, ibps results, rrb results, neet results, jee results, pdf tools, study resources, india education, sarkari result"
        canonical="https://ishu.in/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ishu",
          url: "https://ishu.in",
          description: "Education and government jobs platform with exam results, tools, educational news, and career guidance.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://ishu.in/results?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          publisher: {
            "@type": "Organization",
            name: "Ishu",
            url: "https://ishu.in",
            logo: "https://ishu.in/favicon.svg",
          },
        }}
      />

      {/* All sections rendered in order — each is self-contained */}
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <StatsSection />
        <ExamCategories />
        <FeaturedResults />
        <ToolsShowcase />
        <NewsPreview />
        <NotificationCTA />
        <Testimonials />
        <BlogPreview />
        <FAQ />
      </div>
    </>
  );
}
