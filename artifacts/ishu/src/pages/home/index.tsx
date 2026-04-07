import { PageMeta } from "@/components/layout/PageMeta";
import { HeroSection } from "./sections/hero/HeroSection";
import { StatsSection } from "./sections/stats/StatsSection";
import { ExamCategories } from "./sections/exam-categories/ExamCategories";
import { FeaturedResults } from "./sections/featured-results/FeaturedResults";
import { ToolsShowcase } from "./sections/tools-showcase/ToolsShowcase";
import { NewsPreview } from "./sections/news-preview/NewsPreview";
import { BlogPreview } from "./sections/blog-preview/BlogPreview";
import { NotificationCTA } from "./sections/notification-cta/NotificationCTA";
import { FAQ } from "./sections/faq/FAQ";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Ishu - India's #1 Education & Government Jobs Platform"
        description="Get instant exam results, 100+ free PDF tools, breaking educational news, and expert career guidance. India's premier education platform for students and job seekers."
        keywords="government exam results, upsc results, ssc results, ibps results, rrb results, neet results, jee results, pdf tools, study resources, india education, sarkari result"
        canonical="https://ishu.in/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ishu",
          url: "https://ishu.in",
          description: "India's #1 Education & Government Jobs Platform — exam results, 100+ PDF tools, educational news, and career guidance.",
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
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <StatsSection />
        <ExamCategories />
        <FeaturedResults />
        <ToolsShowcase />
        <NewsPreview />
        <NotificationCTA />
        <BlogPreview />
        <FAQ />
      </div>
    </>
  );
}
