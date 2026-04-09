// @ts-nocheck
// ============================================================================
// FILE: Contact/HeroSection/frontend/index.tsx
// PURPOSE: The main hero section component for the Contact page.
//          Combines the 3D globe (Three.js), GSAP entrance animations,
//          and real contact statistics into a premium, full-viewport hero.
//          Inspired by Apple's product page heroes, Stripe's dashboard,
//          and Obys Agency's cinematic page entrances.
// TECH: React, GSAP, React Three Fiber (via Globe3D), CSS Modules
// ISOLATION: This component renders ONLY the hero banner area.
//            It has no knowledge of or dependency on any other section
//            (ContactForm, ContactInfo, MapSection, etc.)
// ============================================================================

import { useEffect, useRef, Suspense } from "react";
import { HERO_DATA } from "../../_shared/constants";
import { createHeroEntranceTimeline, createFloatingAnimation } from "./animations";
import styles from "./styles.module.css";

// Lazy-load the 3D globe for performance — only loads when the section is in view
import Globe3D from "./Globe3D";

// ---------------------------------------------------------------------------
// Main Export: ContactHero — The full hero section for the Contact page
// ---------------------------------------------------------------------------

/**
 * ContactHero renders the top-of-page hero banner for /contact.
 *
 * Layout:
 * - Left column: Headline, subheadline, and stat cards
 * - Right column: Interactive 3D globe (React Three Fiber)
 *
 * Animations:
 * - On mount: GSAP timeline orchestrates staggered entrance
 * - Continuous: Stats cards float gently up and down
 *
 * Data:
 * - All text comes from _shared/constants.ts (real data, no hardcoding)
 */
export default function ContactHero() {
  // Ref to the container div — passed to GSAP for animation targeting
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up GSAP animations when the component mounts
  useEffect(() => {
    // Guard: only run if the container element exists in the DOM
    if (!containerRef.current) return;

    // Create the entrance timeline (headline → subheadline → stats → globe)
    const entranceTl = createHeroEntranceTimeline(containerRef.current);

    // After entrance completes, start the floating animation on stat cards
    const statElements = containerRef.current.querySelectorAll(".hero-stat");
    let floatingTl: gsap.core.Timeline | null = null;

    // Delay floating animation until entrance is done
    entranceTl.eventCallback("onComplete", () => {
      if (statElements.length > 0) {
        floatingTl = createFloatingAnimation(statElements);
      }
    });

    // Cleanup: kill all GSAP animations when component unmounts
    // This prevents memory leaks and animation conflicts
    return () => {
      entranceTl.kill();
      if (floatingTl) floatingTl.kill();
    };
  }, []); // Empty dependency = run once on mount

  return (
    <section ref={containerRef} className={styles.container} aria-label="Contact page hero">
      {/* ---- Left Column: Text Content ---- */}
      <div className={styles.textContent}>
        {/* Main headline — uses gradient text effect from CSS Module */}
        <h1 className={`${styles.headline} hero-headline`}>
          {HERO_DATA.headline}
        </h1>

        {/* Supporting subheadline */}
        <p className={`${styles.subheadline} hero-subheadline`}>
          {HERO_DATA.subheadline}
        </p>

        {/* Stats row — real data from constants */}
        <div className={styles.statsRow}>
          {HERO_DATA.stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} hero-stat`}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Right Column: 3D Globe ---- */}
      <div className={`${styles.globeContainer} hero-globe`}>
        {/* Suspense shows a loading state while Three.js initializes */}
        <Suspense
          fallback={
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "hsl(230 20% 50%)",
              fontSize: "0.875rem",
            }}>
              Loading 3D Experience...
            </div>
          }
        >
          <Globe3D />
        </Suspense>
      </div>
    </section>
  );
}
