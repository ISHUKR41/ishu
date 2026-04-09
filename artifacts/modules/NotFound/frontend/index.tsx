// @ts-nocheck
// ============================================================================
// FILE: NotFound/frontend/index.tsx
// PURPOSE: Premium 404 page with Three.js particle background and
//          GSAP entrance animations. Provides a visually stunning
//          "page not found" experience instead of a boring white page.
//          Inspired by the immersive 404 pages of Lusion, Cuberto,
//          and Immersive Garden.
// TECH: React, Three.js (R3F), GSAP, Lucide React, CSS Modules
// ISOLATION: Completely independent — renders the full 404 experience.
// ============================================================================

import { useEffect, useRef, Suspense } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { createNotFoundEntranceTimeline } from "./animations";
import styles from "./styles.module.css";

// Lazy-load the 3D particle field for performance
import ParticleField from "./ParticleField";

/**
 * NotFoundPage renders a premium 404 page with:
 * - Three.js particle system background (cosmic floating particles)
 * - GSAP-animated entrance (error code scales up, text staggers in)
 * - Clear navigation back to home page
 * - SEO meta for the 404 status
 *
 * This replaces the old basic 404 page with a world-class experience.
 */
export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = createNotFoundEntranceTimeline(containerRef.current);
    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/* SEO meta — tells search engines this is a 404 */}
      <title>Page Not Found — ISHU</title>
      <meta name="robots" content="noindex, follow" />

      <div ref={containerRef} className={styles.container}>
        {/* Three.js particle background */}
        <div className={styles.particleCanvas}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </div>

        {/* Content overlay */}
        <div className={styles.content}>
          <div className={`${styles.errorCode} nf-code`}>404</div>
          <h1 className={`${styles.title} nf-title`}>Page Not Found</h1>
          <p className={`${styles.description} nf-desc`}>
            Oops! The page you're looking for doesn't exist or has been moved.
            It might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <a href="/" className={`${styles.homeLink} nf-btn`}>
            <Home size={18} />
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
