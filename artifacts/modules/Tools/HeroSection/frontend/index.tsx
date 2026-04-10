// ============================================================================
// FILE: modules/Tools/HeroSection/frontend/index.tsx
// PURPOSE: Tools page hero with animated title, search functionality,
//          and tool category quick-access cards.
//
// TECHNOLOGIES: React 19, GSAP, lucide-react
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Wrench, FileText, Brain, ImageIcon, Type, RefreshCcw, ArrowRight } from "lucide-react";
import { TOOL_CATEGORIES } from "../../_shared/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText, Brain, Image: ImageIcon, Type, RefreshCcw,
};

export default function ToolsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      if (titleRef.current) tl.from(titleRef.current, { y: 60, opacity: 0 });
      if (subtitleRef.current) tl.from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.5");
      if (gridRef.current) tl.from(gridRef.current.children, { y: 30, opacity: 0, stagger: 0.1 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Tools page hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.10),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-sm font-medium text-amber-400">
            <Wrench className="h-4 w-4" />
            Free Online Tools
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">Student </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Tools</span>
          </h1>
          <p ref={subtitleRef} className="mt-5 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Free PDF tools, AI assistants, image editors, and file converters
            built specifically for exam preparation and student productivity.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12 max-w-5xl mx-auto">
          {TOOL_CATEGORIES.map((cat: any) => {
            const Icon = ICON_MAP[cat.icon] || Wrench;
            return (
              <Link
                key={cat.id}
                href={`/tools/category/${cat.slug}`}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-center cursor-pointer block"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">{cat.name}</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
