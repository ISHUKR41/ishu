import { PageMeta } from "@/components/layout/PageMeta";
import { HeroSection } from "./sections/hero/HeroSection";
import { StatsSection } from "./sections/stats/StatsSection";
import { FeaturedResults } from "./sections/featured-results/FeaturedResults";
import { ToolsShowcase } from "./sections/tools-showcase/ToolsShowcase";
import { NewsPreview } from "./sections/news-preview/NewsPreview";
import { BlogPreview } from "./sections/blog-preview/BlogPreview";
import { NotificationCTA } from "./sections/notification-cta/NotificationCTA";
import { Testimonials } from "./sections/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Ishu - India's #1 Education & Government Jobs Platform"
        description="Get instant exam results, 100+ free PDF tools, breaking educational news, and expert career guidance. India's premier education platform for students and job seekers."
      />
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <StatsSection />
        <FeaturedResults />
        <ToolsShowcase />
        <NewsPreview />
        <NotificationCTA />
        <BlogPreview />
        <Testimonials />
      </div>
    </>
  );
}
