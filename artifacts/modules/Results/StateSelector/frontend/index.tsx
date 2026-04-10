// ============================================================================
// FILE: modules/Results/StateSelector/frontend/index.tsx
// PURPOSE: Displays all 36 Indian states and Union Territories as an interactive
//          grid. Users can click any state to view state-specific exam results.
//          Features GSAP stagger animations and responsive grid layout.
//
// ISOLATION: Self-contained. Imports state data from _shared/constants.ts.
//            No dependencies on other frontend sections.
//
// TECHNOLOGIES USED:
//   - React 19 + TypeScript
//   - GSAP ScrollTrigger (staggered reveal)
//   - lucide-react (MapPin, ArrowRight icons)
//   - wouter (client-side navigation)
//
// INSPIRATION: India map selectors on education portals, Apple region selectors
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight, Globe } from "lucide-react";
import { INDIAN_STATES } from "../../_shared/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * ResultsStateSelector — Interactive state/UT selector grid.
 *
 * WHAT IT DOES:
 * 1. Renders all 28 states and 8 UTs in a responsive grid
 * 2. Each state card shows name, capital, and PSC name
 * 3. Clicking navigates to the state-specific results page
 * 4. Cards animate in with GSAP stagger on scroll
 */
export default function ResultsStateSelector() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.03, ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Separate states and UTs for clear visual grouping
  const states = INDIAN_STATES.filter((s: any) => !["AN", "CH", "DN", "DL", "JK", "LA", "LD", "PY"].includes(s.code));
  const unionTerritories = INDIAN_STATES.filter((s: any) => ["AN", "CH", "DN", "DL", "JK", "LA", "LD", "PY"].includes(s.code));

  return (
    <section
      className="py-16 md:py-24 bg-zinc-950"
      aria-label="Browse results by Indian state"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Browse by{" "}
            <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
              State
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Select your state or Union Territory to view local government
            examination results, state PSC updates, and recruitment notifications.
          </p>
        </div>

        {/* ── States header ── */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-semibold text-white">States (28)</h3>
        </div>

        {/* ── States grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12"
        >
          {states.map((state: any) => (
            <Link
              key={state.id}
              href={`/results/states/${state.slug}`}
              className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.06] hover:border-orange-500/30 transition-all duration-300 cursor-pointer block text-center"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-xs text-zinc-600 font-mono mb-1">{state.code}</div>
                <div className="text-sm font-medium text-white group-hover:text-orange-300 transition-colors truncate">
                  {state.name}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{state.pscName}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Union Territories header ── */}
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-5 w-5 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Union Territories (8)</h3>
        </div>

        {/* ── UTs grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {unionTerritories.map((ut: any) => (
            <Link
              key={ut.id}
              href={`/results/states/${ut.slug}`}
              className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 cursor-pointer block text-center"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-xs text-zinc-600 font-mono mb-1">{ut.code}</div>
                <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                  {ut.name}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{ut.pscName}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
