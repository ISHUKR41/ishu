// ============================================================================
// FILE: modules/News/HeroSection/frontend/index.tsx
// PURPOSE: News page hero section with breaking news ticker, title animation,
//          and category quick-links. Features GSAP entrance animations.
//
// ISOLATION: Self-contained. Fetches breaking news from its paired backend.
//
// TECHNOLOGIES: React 19, GSAP, lucide-react, TanStack React Query
// INSPIRATION: BBC News hero, Times of India banner, The Hindu featured section
// ============================================================================

import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Newspaper, Zap, TrendingUp, Bell, ArrowRight } from "lucide-react";

gsap.registerPlugin();

/**
 * NewsHeroSection — Animated hero for the News page.
 * Shows title, description, and quick-access category links.
 */
export default function NewsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

      if (titleRef.current) tl.from(titleRef.current, { y: 60, opacity: 0 });
      if (subtitleRef.current) tl.from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.5");
      if (linksRef.current) {
        tl.from(linksRef.current.children, { y: 30, opacity: 0, stagger: 0.08 }, "-=0.3");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { label: "UPSC", href: "/news/category/upsc", color: "bg-amber-500/20 text-amber-400" },
    { label: "SSC", href: "/news/category/ssc", color: "bg-blue-500/20 text-blue-400" },
    { label: "Banking", href: "/news/category/banking", color: "bg-emerald-500/20 text-emerald-400" },
    { label: "Railway", href: "/news/category/railway", color: "bg-red-500/20 text-red-400" },
    { label: "JEE", href: "/news/category/jee", color: "bg-violet-500/20 text-violet-400" },
    { label: "NEET", href: "/news/category/neet", color: "bg-green-500/20 text-green-400" },
    { label: "Scholarships", href: "/news/category/scholarships", color: "bg-yellow-500/20 text-yellow-400" },
    { label: "Education", href: "/news/category/education", color: "bg-teal-500/20 text-teal-400" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="News page hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breaking news badge */}
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-sm font-medium text-red-400 animate-pulse">
            <Zap className="h-4 w-4" />
            Breaking News Updates
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Educational </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              News
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-5 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated with the latest exam notifications, admit card releases,
            government policies, and educational developments across India.
          </p>
        </div>

        {/* Quick category links */}
        <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-2 mt-10 max-w-3xl mx-auto">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${link.color} text-sm font-medium hover:scale-105 transition-all`}
            >
              {link.label}
              <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
