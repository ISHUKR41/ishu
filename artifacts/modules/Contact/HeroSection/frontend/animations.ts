// ============================================================================
// FILE: Contact/HeroSection/frontend/animations.ts
// PURPOSE: GSAP animation timeline definitions for the Contact hero section.
//          Uses GSAP's powerful timeline API to orchestrate staggered
//          entrance animations for the headline, subheadline, stats,
//          and 3D globe container. Inspired by the entrance animations
//          seen on Apple.com product pages and Obys Agency portfolio.
// TECH: GSAP (GreenSock Animation Platform), ScrollTrigger
// ISOLATION: These animations are ONLY used by Contact/HeroSection.
// ============================================================================

import gsap from "gsap";

/**
 * Creates the hero entrance animation timeline.
 * This orchestrates a staggered reveal: headline slides up, then subheadline
 * fades in, then stats cards cascade in from below, then the 3D globe
 * scales up from 0. The result is a cinematic "reveal" effect.
 *
 * @param containerRef - The DOM element wrapping the entire hero section
 * @returns The GSAP timeline instance (for cleanup in useEffect)
 */
export function createHeroEntranceTimeline(containerRef: HTMLElement): gsap.core.Timeline {
  // Create a GSAP timeline with default easing
  // "power3.out" gives a smooth deceleration curve (fast start, gentle end)
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.9,
    },
  });

  // Step 1: Headline slides up from below with opacity fade
  tl.fromTo(
    containerRef.querySelector(".hero-headline"),
    { y: 60, opacity: 0 },             // FROM: 60px below, invisible
    { y: 0, opacity: 1, duration: 1 }  // TO: natural position, fully visible
  );

  // Step 2: Subheadline fades in slightly after the headline
  // The "-=0.5" means this starts 0.5s BEFORE the previous animation ends
  // This creates overlap for a smoother flow
  tl.fromTo(
    containerRef.querySelector(".hero-subheadline"),
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    "-=0.5" // Overlap with previous animation
  );

  // Step 3: Stats cards cascade in with stagger
  // Each card appears 0.15s after the previous one
  tl.fromTo(
    containerRef.querySelectorAll(".hero-stat"),
    { y: 30, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15, // 150ms delay between each stat card
    },
    "-=0.4"
  );

  // Step 4: 3D Globe container scales up from center
  tl.fromTo(
    containerRef.querySelector(".hero-globe"),
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" },
    "-=0.6"
  );

  return tl;
}

/**
 * Creates a subtle floating animation for the stats cards.
 * This runs continuously after the entrance animation completes,
 * giving the stats a gentle "breathing" motion.
 *
 * @param statElements - NodeList of stat card elements
 * @returns The GSAP timeline instance (for cleanup)
 */
export function createFloatingAnimation(statElements: NodeListOf<Element>): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true }); // Infinite loop, alternating direction

  tl.to(statElements, {
    y: -5,              // Float up 5px
    duration: 2,
    ease: "sine.inOut", // Smooth sine wave easing
    stagger: {
      each: 0.3,        // Each card starts 0.3s after the previous
      from: "start",
    },
  });

  return tl;
}
