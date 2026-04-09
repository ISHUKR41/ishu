// ============================================================================
// FILE: modules/Blog/index.tsx
// PURPOSE: Blog page orchestrator — assembles HeroSection and ArticleGrid.
// ============================================================================

import React from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import BlogHeroSection from "./HeroSection/frontend";
import ArticleGrid from "./ArticleGrid/frontend";

export default function BlogPage() {
  return (
    <>
      <PageMeta
        title="Study Blog — Exam Tips, Career Guidance & Success Stories | ISHU"
        description="Read expert exam preparation tips, career guidance articles, success stories of toppers, and science-backed study strategies for UPSC, SSC, Banking, and other competitive exams."
        keywords="exam tips, career guidance, success stories, study strategies, upsc preparation, ssc tips, competitive exam blog, study motivation"
        canonical="https://ishu.in/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ISHU Study Blog",
          description: "Expert exam preparation guidance and career advice for Indian students.",
          url: "https://ishu.in/blog",
        }}
      />
      <div className="flex flex-col min-h-screen">
        <BlogHeroSection />
        <ArticleGrid />
      </div>
    </>
  );
}
