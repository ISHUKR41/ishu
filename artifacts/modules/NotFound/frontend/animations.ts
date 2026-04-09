// @ts-nocheck
// ============================================================================
// FILE: NotFound/frontend/animations.ts
// PURPOSE: GSAP entrance animations for the 404 page content.
//          The error code scales up dramatically, then the title and
//          description stagger in, followed by the home button.
// TECH: GSAP (GreenSock)
// ISOLATION: Only used by the NotFound page.
// ============================================================================

import gsap from "gsap";

/**
 * Creates the 404 page entrance animation.
 * Orchestrates: error code → title → description → button
 */
export function createNotFoundEntranceTimeline(container: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.8 },
  });

  // Step 1: Big "404" scales up from small
  tl.fromTo(
    container.querySelector(".nf-code"),
    { scale: 0.3, opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.6)" }
  );

  // Step 2: Title slides up
  tl.fromTo(
    container.querySelector(".nf-title"),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1 },
    "-=0.4"
  );

  // Step 3: Description fades in
  tl.fromTo(
    container.querySelector(".nf-desc"),
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "-=0.3"
  );

  // Step 4: Button pops in
  tl.fromTo(
    container.querySelector(".nf-btn"),
    { y: 15, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
    "-=0.2"
  );

  return tl;
}
