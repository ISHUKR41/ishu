// ============================================================================
// FILE: providers/SmoothScrollProvider.tsx — Global Smooth Scroll Provider
// PURPOSE: Wraps the entire application with Lenis smooth scrolling.
//          Lenis is a lightweight, high-performance smooth scroll library
//          used by top agencies like Locomotive, Cuberto, and Awwwards winners.
//
// HOW IT WORKS:
//   1. Creates a Lenis instance with custom easing (exponential decay)
//   2. Hooks into requestAnimationFrame for 60fps scroll interpolation
//   3. Automatically destroyed on unmount to prevent memory leaks
//
// TECH STACK:
//   - Lenis (https://lenis.darkroom.engineering/) — smooth scroll library
//   - React 18 (useEffect, useRef hooks)
//
// CONFIGURATION:
//   - duration: 1.2s (scroll animation duration)
//   - easing: Exponential ease-out for natural deceleration feel
//   - orientation: vertical (standard page scroll)
//   - smoothWheel: true (interpolates mouse wheel events)
//
// ISOLATION: This provider wraps all pages. It has no knowledge of any
//            specific page content. Removing it disables smooth scroll
//            globally without affecting any component logic.
// ============================================================================

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider — Wraps children with Lenis smooth scrolling.
 *
 * USAGE: Wrap the entire app (or a subtree) in <SmoothScrollProvider>
 * to enable butter-smooth scroll behavior on all pages.
 *
 * INSPIRED BY: Apple.com, Locomotive.ca, Bruno Simon's portfolio,
 * and other Awwwards-winning websites that use Lenis for scroll.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Ref to hold the Lenis instance across renders
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with custom configuration
    const lenis = new Lenis({
      // Duration of the smooth scroll interpolation (seconds)
      duration: 1.2,
      // Custom easing function: exponential ease-out
      // This gives a natural "momentum" feel like native iOS scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Scroll direction (vertical is standard page scroll)
      orientation: "vertical",
      // Enable smooth interpolation for mouse wheel events
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // requestAnimationFrame loop — drives the smooth scroll at 60fps
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup: destroy Lenis instance when component unmounts
    // This prevents memory leaks and removes all event listeners
    return () => {
      lenis.destroy();
    };
  }, []);

  // Render children as-is — Lenis operates at the window level
  return <>{children}</>;
}
