// ============================================================================
// FILE: modules/News/CategoryFilter/frontend/index.tsx
// PURPOSE: A horizontal scrollable category filter bar for the News page.
//          Displays all 30 news categories as clickable badges that users
//          can use to filter the news feed.
//
// ISOLATION: Self-contained UI component. Does not fetch data — it uses
//            the shared constants and fires navigation events.
//
// TECHNOLOGIES: React 19, GSAP, lucide-react, wouter
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Filter, ArrowRight } from "lucide-react";
import { NEWS_CATEGORIES } from "../../_shared/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * NewsCategoryFilter — Horizontal scrollable category filter bar.
 */
export default function NewsCategoryFilter() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current!, start: "top 90%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-zinc-950 border-b border-white/5"
      aria-label="News category filter"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-zinc-500" />
          <h3 className="text-lg font-semibold text-white">Browse by Category</h3>
          <span className="text-sm text-zinc-500">({NEWS_CATEGORIES.length} categories)</span>
        </div>

        {/* Scrollable category badges */}
        <div
          ref={scrollRef}
          className="flex flex-wrap gap-2"
        >
          {NEWS_CATEGORIES.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/news/category/${cat.slug}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${cat.color} bg-clip-padding border border-white/5 text-white/80 hover:text-white hover:border-white/20 hover:scale-105 transition-all duration-200`}
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
