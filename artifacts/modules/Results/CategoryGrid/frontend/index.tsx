// ============================================================================
// FILE: modules/Results/CategoryGrid/frontend/index.tsx
// PURPOSE: Displays a responsive grid of all 12 exam categories (UPSC, SSC,
//          Banking, Railway, etc.) as interactive cards with GSAP stagger
//          animations. Each card links to its own category-specific page.
//
// ISOLATION: This component is completely self-contained. It imports category
//            data from the shared constants file and fetches live counts from
//            its paired backend endpoint. Modifying this file will NOT affect
//            any other section on the Results page or any other page.
//
// TECHNOLOGIES USED:
//   - React 19 + TypeScript
//   - GSAP ScrollTrigger (staggered card reveal animation)
//   - lucide-react (dynamic icon rendering — Landmark, FileText, etc.)
//   - wouter (client-side navigation to category pages)
//
// INSPIRATION: Stripe product cards, Apple feature grids, Notion category tiles
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Landmark, FileText, Building2, Train, Shield, GraduationCap,
  Stethoscope, Map, BookOpen, BadgeCheck, Cog, Scale, ArrowRight,
} from "lucide-react";
import { RESULT_CATEGORIES } from "../../_shared/constants";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Maps icon name strings from constants to actual lucide-react components.
 * This allows us to define icons as strings in constants.ts and render them
 * dynamically here without circular dependencies.
 */
const ICON_MAP: Record<string, React.ElementType> = {
  Landmark, FileText, Building2, Train, Shield, GraduationCap,
  Stethoscope, Map, BookOpen, BadgeCheck, Cog, Scale,
};

/**
 * ResultsCategoryGrid — Displays all 12 exam categories as animated cards.
 *
 * WHAT IT DOES:
 * 1. Renders a responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
 * 2. Each card shows the category icon, name, full name, and description
 * 3. Cards animate in with GSAP stagger effect on scroll
 * 4. Clicking a card navigates to the category-specific results page
 */
export default function ResultsCategoryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // ── GSAP stagger animation for category cards ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animate each card with stagger
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-16 md:py-24 bg-zinc-950"
      aria-label="Browse results by exam category"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Browse by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Select your exam category to view the latest results, cutoff marks,
            and detailed analysis for each examination.
          </p>
        </div>

        {/* ── Category cards grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {RESULT_CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || FileText;

            return (
              <Link
                key={category.id}
                href={`/results/category/${category.slug}`}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer block"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Category icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} mb-4`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  {/* Category name + full name */}
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-3">
                    {category.fullName}
                  </p>

                  {/* Short description */}
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>

                  {/* View link with arrow */}
                  <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    View Results
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
