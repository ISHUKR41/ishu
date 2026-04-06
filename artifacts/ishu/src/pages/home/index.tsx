import { PageMeta } from "@/components/layout/PageMeta";
import { HeroSection } from "./sections/HeroSection";
import { StatsSection } from "./sections/StatsSection";
import { FeaturedResults } from "./sections/FeaturedResults";
import { ToolsShowcase } from "./sections/ToolsShowcase";
import { NewsPreview } from "./sections/NewsPreview";
import { BlogPreview } from "./sections/BlogPreview";
import { NotificationCTA } from "./sections/NotificationCTA";
import { Testimonials } from "./sections/Testimonials";

export default function Home() {
  return (
    <>
      <PageMeta 
        title="Home" 
        description="India's #1 Education & Government Jobs Platform" 
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
