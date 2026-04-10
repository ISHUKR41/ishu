// ============================================================================
// FILE: modules/Blog/HeroSection/frontend/index.tsx
// PURPOSE: Blog page hero with animated title, featured article spotlight,
//          and category quick-nav pills.
//
// ISOLATION: Self-contained. No dependencies on other Blog sections.
// TECHNOLOGIES: React 19, GSAP, lucide-react
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { BookOpen, PenLine, ArrowRight, Sparkles } from "lucide-react";
import { BLOG_CATEGORIES } from "../../_shared/constants";

export default function BlogHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      if (titleRef.current) tl.from(titleRef.current, { y: 60, opacity: 0 });
      if (subtitleRef.current) tl.from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.5");
      if (catsRef.current) tl.from(catsRef.current.children, { y: 30, opacity: 0, stagger: 0.1 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Blog page hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.10),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-sm font-medium text-cyan-400">
            <PenLine className="h-4 w-4" />
            Knowledge Hub
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Study </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-5 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Expert exam tips, career guidance, success stories, and study strategies
            to help you crack any competitive exam.
          </p>
        </div>

        {/* Category cards */}
        <div ref={catsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          {BLOG_CATEGORIES.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.06] hover:border-white/10 transition-all text-center cursor-pointer block"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} mb-3`}>
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                {cat.name}
              </div>
              <div className="text-xs text-zinc-500 mt-1 line-clamp-1">{cat.description.split('.')[0]}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
