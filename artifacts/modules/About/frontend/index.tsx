// ============================================================================
// FILE: modules/About/index.tsx
// PURPOSE: About page orchestrator with SEO.
// ============================================================================

import React from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import AboutHeroSection from "../HeroSection/frontend";

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About ISHU — India's Leading Education Platform"
        description="ISHU (Indian Student Hub University) provides government exam results, student tools, educational news, and career guidance to millions of students across India."
        keywords="about ishu, indian student hub, education platform india, sarkari result platform, ishu.in about"
        canonical="https://ishu.in/about"
      />
      <div className="flex flex-col min-h-screen">
        <AboutHeroSection />
      </div>
    </>
  );
}
