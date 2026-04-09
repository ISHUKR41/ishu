// @ts-nocheck
// ============================================================================
// FILE: Contact/index.tsx — The Contact Page Orchestrator
// PURPOSE: This is the TOP-LEVEL page component for /contact.
//          It composes all isolated sections (HeroSection, ContactForm,
//          ContactInfo, MapSection, FAQSection, SocialLinks, SEO) into
//          a single page layout. Each section is lazy-loaded for performance.
//          This file is the ONLY place where Contact sections are combined.
// TECH: React (Suspense, lazy), Lenis (smooth scroll)
// ISOLATION: This orchestrator ONLY imports from Contact sub-modules.
//            It has ZERO knowledge of Home, Results, News, or any other page.
// ============================================================================

import { Suspense, lazy, useEffect } from "react";

// ---------------------------------------------------------------------------
// Lazy-load each section for code-splitting & performance
// React.lazy ensures each section's JavaScript is loaded ONLY when needed,
// reducing the initial bundle size significantly.
// ---------------------------------------------------------------------------

const ContactSEO = lazy(() => import("./SEO/frontend/index"));
const ContactHero = lazy(() => import("./HeroSection/frontend/index"));
const ContactInfoSection = lazy(() => import("./ContactInfo/frontend/index"));
const ContactFormSection = lazy(() => import("./ContactForm/frontend/index"));
const MapSection = lazy(() => import("./MapSection/frontend/index"));
const FAQSection = lazy(() => import("./FAQSection/frontend/index"));
const SocialLinksSection = lazy(() => import("./SocialLinks/frontend/index"));

// ---------------------------------------------------------------------------
// Loading Fallback — Shown while a section's JS is still loading
// ---------------------------------------------------------------------------

function SectionLoader() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      color: "hsl(230 20% 50%)",
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: "0.875rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{
          width: "16px",
          height: "16px",
          border: "2px solid hsl(230 20% 30%)",
          borderTop: "2px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        Loading section...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Export: ContactPage — The complete /contact page
// ---------------------------------------------------------------------------

/**
 * ContactPage is the root component for the /contact route.
 *
 * Section Order:
 * 1. SEO (invisible meta tags)
 * 2. HeroSection (3D globe + headline)
 * 3. ContactInfoSection (contact method cards)
 * 4. ContactFormSection (multi-step form wizard)
 * 5. MapSection (Leaflet interactive map)
 * 6. FAQSection (accordion FAQ)
 * 7. SocialLinksSection (social media links)
 *
 * Each section is independently lazy-loaded and wrapped in Suspense.
 * If any section fails to load, it does NOT crash the entire page.
 */
export default function ContactPage() {
  // Scroll to top when page mounts (important for SPA navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main>
      {/* SEO meta tags — invisible, at the top for crawlers */}
      <Suspense fallback={null}>
        <ContactSEO />
      </Suspense>

      {/* Section 1: Hero with 3D Globe */}
      <Suspense fallback={<SectionLoader />}>
        <ContactHero />
      </Suspense>

      {/* Section 2: Contact Info Cards */}
      <Suspense fallback={<SectionLoader />}>
        <ContactInfoSection />
      </Suspense>

      {/* Section 3: Multi-Step Contact Form */}
      <Suspense fallback={<SectionLoader />}>
        <ContactFormSection />
      </Suspense>

      {/* Section 4: Interactive Map */}
      <Suspense fallback={<SectionLoader />}>
        <MapSection />
      </Suspense>

      {/* Section 5: FAQ Accordion */}
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>

      {/* Section 6: Social Media Links */}
      <Suspense fallback={<SectionLoader />}>
        <SocialLinksSection />
      </Suspense>
    </main>
  );
}
