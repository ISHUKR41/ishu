// ============================================================================
// FILE: index.tsx
// MODULE: Home
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Landmark,
  ShieldAlert,
  Train,
  Stethoscope,
  Cpu,
  Scale,
  Activity,
  Award,
  ChevronRight,
} from "lucide-react";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Strict mapping to lucide-react icons instead of fake icons
const CATEGORY_META: Record<string, { icon: React.FC<any>; color: string; bg: string }> = {
  "upsc-civil-services": { icon: Landmark, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  "ssc-cgl": { icon: Briefcase, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  "ssc-chsl": { icon: Award, color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  "banking-ibps": { icon: Landmark, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  "railway-rrb": { icon: Train, color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  "army-defence": { icon: ShieldAlert, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  "jee-mains": { icon: GraduationCap, color: "#eab308", bg: "rgba(234,179,8,0.1)" },
  "neet-ug": { icon: Stethoscope, color: "#14b8a6", bg: "rgba(20,184,166,0.1)" },
  "state-psc": { icon: Landmark, color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  "police": { icon: ShieldAlert, color: "#dc2626", bg: "rgba(220,38,38,0.1)" },
  "teaching-tet": { icon: BookOpen, color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  "engineering-jobs": { icon: Cpu, color: "#84cc16", bg: "rgba(132,204,22,0.1)" },
  "judiciary": { icon: Scale, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  "nursing": { icon: Activity, color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
};

const DEFAULT_META = { icon: BookOpen, color: "#6366f1", bg: "rgba(99,102,241,0.1)" };

/**
 * HOME EXAM CATEGORIES SECTION (Frontend Module)
 * 
 * Highly polished module utilizing GSAP ScrollTrigger for staggered reveal.
 * Fetches real results categories strictly from the paired backend API.
 */
export default function ExamCategories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from corresponding backend module
  useEffect(() => {
    fetch("/api/home/sections/exam-categories")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCategories(json.data);
        }
      })
      .catch((err) => console.error("Failed to load categories:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading || categories.length === 0) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".cat-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cat-header",
            start: "top 85%",
          },
        }
      );

      // Staggered Cards Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, categories]);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950/50 relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="cat-header flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-4 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm tracking-wide uppercase">Browse By Category</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Popular Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Categories</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Jump straight to the exam you are preparing for. Results, resources, news, and tools — all sorted to save your time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-24 w-full" />
            ))
          ) : (
            categories.map((cat, i) => {
              const meta = CATEGORY_META[cat.slug] ?? DEFAULT_META;
              const IconComp = meta.icon;

              return (
                <Link 
                  href={`/results?category=${cat.slug}`} 
                  key={cat.id} 
                >
                  <a
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="group relative flex items-center p-5 rounded-2xl bg-zinc-900/50 border border-white/5 transition-all duration-300 hover:bg-zinc-800/80 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden cursor-pointer"
                  >
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(circle at center, ${meta.color}, transparent 70%)` }}
                    />
                    
                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <div 
                        className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-white font-bold text-lg truncate group-hover:text-blue-200 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-zinc-500 text-sm mt-0.5 font-medium transition-colors group-hover:text-zinc-300">
                          {cat.resultCount > 0 ? `${cat.resultCount} listing${cat.resultCount !== 1 ? "s" : ""}` : "View Results"}
                        </p>
                      </div>
                      <ChevronRight 
                        className="w-5 h-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
                        style={{ color: meta.color }}
                      />
                    </div>
                  </a>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
