// ============================================================================
// FILE: modules/Tools/index.tsx
// PURPOSE: Tools page orchestrator.
// ============================================================================

import React from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import ToolsHeroSection from "./HeroSection/frontend";
import ToolGrid from "./ToolGrid/frontend";

export default function ToolsPage() {
  return (
    <>
      <PageMeta
        title="Free Online Tools — PDF, AI, Image & Text Tools | ISHU"
        description="Free online PDF tools, AI study assistants, image editors, and file converters for students. Merge PDFs, compress images, convert file formats, and more."
        keywords="pdf tools, merge pdf, compress pdf, ai tools, image editor, passport photo, text tools, file converter, student tools"
        canonical="https://ishu.in/tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Online Student Tools",
          description: "Practical tools for exam preparation and student productivity.",
          url: "https://ishu.in/tools",
        }}
      />
      <div className="flex flex-col min-h-screen">
        <ToolsHeroSection />
        <ToolGrid />
      </div>
    </>
  );
}
