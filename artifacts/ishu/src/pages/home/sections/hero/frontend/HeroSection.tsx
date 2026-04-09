// ============================================================================
// FILE: pages/home/sections/hero/frontend/HeroSection.tsx
// PURPOSE: The main landing hero section for the Home page. This is the first
//          thing users see when they visit the platform. It features animated
//          gradient glows, a pulsing "live" dot, trust badges with real stats,
//          and smooth entrance animations powered by Framer Motion.
//
// TECH STACK:
//   - React 18 (hooks, memo, functional components)
//   - Framer Motion (staggered entrance animations with spring physics)
//   - Wouter (lightweight SPA routing for CTA links)
//   - React Query via @workspace/api-client-react (real data from API)
//   - Lucide React (professional SVG icons — NOT AI-generated)
//   - CSS Modules (hero.module.css for scoped, maintainable styles)
//
// ANIMATIONS:
//   - containerVariants: Orchestrates child animations with staggerChildren
//   - itemVariants: Each child fades in + slides up with custom easing
//   - Glow orbs in CSS use infinite keyframe animations for floating effect
//   - Scroll indicator at bottom has a CSS translate animation
//
// DATA FLOW:
//   - Fetches result stats from GET /api/results/stats via useGetResultStats()
//   - Fetches tools list from GET /api/tools via useListTools()
//   - All numbers shown are REAL — pulled from the database, not hardcoded
//
// ISOLATION: This component imports ONLY from its own module directory
//            and shared UI components. It has ZERO knowledge of other sections.
// ============================================================================

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Icons } from "@/components/icons";
import { useGetResultStats, useListTools } from "@workspace/api-client-react";
import styles from "./hero.module.css";

/**
 * Framer Motion easing curve — matches Apple's recommended easing for UI
 * [x1, y1, x2, y2] = cubic-bezier control points
 */
const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Parent container animation config.
 * Uses staggerChildren to create a cascading reveal effect where each
 * child element appears 120ms after the previous one.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/**
 * Individual item animation config.
 * Each child slides up 24px while fading in over 0.7 seconds.
 */
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing },
  },
};

/**
 * HeroSection — The primary landing hero for the Home page.
 *
 * WHAT IT SHOWS:
 * 1. A pulsing badge indicating the platform is live
 * 2. A large gradient headline ("Your Gateway to a Brighter Future")
 * 3. A subheadline with real tool/exam counts from the API
 * 4. Two CTA buttons (Browse Results, Explore Tools)
 * 5. Trust badges showing real stats (100% Free, X+ Exams, Y+ Tools)
 * 6. A scroll indicator at the bottom
 *
 * BACKGROUND EFFECTS:
 * - Grid pattern (CSS) with radial mask for a subtle depth effect
 * - Three floating glow orbs (blue, orange, indigo) with CSS animations
 * - Dark mode support via :global(.dark) selectors in CSS module
 */
export function HeroSection() {
  // Fetch real statistics from the API — no hardcoded numbers
  const { data: resultStats } = useGetResultStats();
  const { data: toolsData } = useListTools();

  // Calculate total results across all statuses (active + upcoming + expired)
  const totalResults = resultStats
    ? resultStats.totalActive + resultStats.totalUpcoming + resultStats.totalExpired
    : null;

  // Count total tools available on the platform
  const totalTools = Array.isArray(toolsData) ? toolsData.length : null;

  // Build dynamic text for the subheadline
  const toolsLine = totalTools ? `${totalTools}+ free PDF & AI tools` : "free PDF & AI tools";

  return (
    <section className={styles.heroSection}>
      {/* Background visual effects — purely decorative */}
      <div className={styles.gridBackground} />
      <div className={styles.glowPrimary} />
      <div className={styles.glowSecondary} />
      <div className={styles.glowAccent} />

      {/* Main content container */}
      <div className={styles.content}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Live platform badge with pulsing green dot */}
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.pulseDot} />
            Education & Government Jobs Platform
          </motion.div>

          {/* Main headline with gradient text effect */}
          <motion.h1 variants={itemVariants} className={styles.headline}>
            Your Gateway to a{" "}
            <span className={styles.gradientText}>Brighter Future</span>
          </motion.h1>

          {/* Subheadline with real dynamic data from the API */}
          <motion.p variants={itemVariants} className={styles.subheadline}>
            Government exam results, {toolsLine},
            breaking education news, and expert career guidance -
            all in one place for students across India.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <Link href="/results" className={styles.ctaPrimary}>
              Browse Latest Results
              <Icons.ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/tools" className={styles.ctaSecondary}>
              Explore PDF Tools
            </Link>
          </motion.div>

          {/* Trust badges — all numbers come from real API data */}
          <motion.div variants={itemVariants} className={styles.trustBadges}>
            <span className={styles.trustItem}>
              <Icons.Success className={styles.trustIcon} />
              100% Free
            </span>
            {totalResults && (
              <span className={styles.trustItem}>
                <Icons.Document className={styles.trustIcon} />
                {totalResults}+ Exams Tracked
              </span>
            )}
            {totalTools && (
              <span className={styles.trustItem}>
                <Icons.Tools className={styles.trustIcon} />
                {totalTools}+ PDF & AI Tools
              </span>
            )}
            <span className={styles.trustItem}>
              <Icons.Bolt className={styles.trustIcon} />
              Updated Daily
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator at the bottom — animated CSS translate */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
