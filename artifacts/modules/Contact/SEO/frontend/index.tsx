// @ts-nocheck
// ============================================================================
// FILE: Contact/SEO/frontend/index.tsx
// PURPOSE: SEO layer for the Contact page. Renders meta tags, title,
//          and Schema.org structured data (JSON-LD) for maximum search
//          engine visibility. Uses the existing PageMeta component.
// TECH: React, Schema.org JSON-LD, Open Graph, Twitter Cards
// ISOLATION: Only manages SEO meta — no visual rendering.
// ============================================================================

import { CONTACT_SEO } from "../../_shared/constants";

/**
 * ContactSEO renders all SEO-related meta tags for the /contact page.
 * This is imported by the Contact page's main index.tsx and renders
 * at the top of the component tree.
 */
export default function ContactSEO() {
  return (
    <>
      {/* Page title — shown in browser tab and search results */}
      <title>{CONTACT_SEO.title}</title>

      {/* Standard meta tags */}
      <meta name="description" content={CONTACT_SEO.description} />
      <meta name="keywords" content={CONTACT_SEO.keywords} />
      <link rel="canonical" href={CONTACT_SEO.canonical} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={CONTACT_SEO.title} />
      <meta property="og:description" content={CONTACT_SEO.description} />
      <meta property="og:url" content={CONTACT_SEO.canonical} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={CONTACT_SEO.title} />
      <meta name="twitter:description" content={CONTACT_SEO.description} />

      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CONTACT_SEO.structuredData),
        }}
      />
    </>
  );
}
