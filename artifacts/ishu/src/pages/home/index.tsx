import { PageMeta } from "@/components/layout/PageMeta";
import HomeHero from "@modules/Home/HeroSection/frontend";
import HomeStats from "@modules/Home/StatsSection/frontend";
import ExamCategories from "@modules/Home/ExamCategories/frontend";
import FeaturedResults from "@modules/Home/FeaturedResults/List/frontend";
import ToolsShowcase from "@modules/Home/ToolsShowcase/frontend";
import NewsPreview from "@modules/Home/NewsPreview/frontend";
import BlogPreview from "@modules/Home/BlogPreview/frontend";
import NotificationCTA from "@modules/Home/NotificationCTA/frontend";
import FAQ from "@modules/Home/FAQ/frontend";

export default function Home() {
  return (
    <>
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
      <div className="flex flex-col min-h-screen">
        <HomeHero />
        <HomeStats />
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
