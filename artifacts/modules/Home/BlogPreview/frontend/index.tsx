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
import { BookOpen, ArrowRight, User, Clock, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * BLOG PREVIEW SECTION (Frontend Module)
 * 
 * Elegant typography-driven blog showcase using GSAP.
 */
export default function BlogPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modular Data Fetching
  useEffect(() => {
    fetch("/api/home/sections/blog-preview")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setBlogs(json.data);
        }
      })
      .catch((err) => console.error("Failed to load blog preview:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading || blogs.length === 0) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".blog-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-header",
            start: "top 85%",
          },
        }
      );

      // Staggered Blog List
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".blog-list",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, blogs]);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Header Column */}
          <div className="lg:w-1/3 blog-header">
            <div className="inline-flex items-center gap-2 text-fuchsia-400 font-semibold mb-4 px-4 py-2 bg-fuchsia-500/10 rounded-full border border-fuchsia-500/20">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm tracking-wide uppercase">Guidance & Tips</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">Insights</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Read our latest articles on exam strategies, interview preparation, and career guidance written by selected candidates.
            </p>
            <Link href="/blogs">
              <a className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-full font-bold transition-all duration-300">
                Explore Blog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Link>
          </div>

          {/* List Column */}
          <div className="lg:w-2/3 blog-list flex flex-col gap-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-32 w-full" />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <div
                  ref={(el) => (itemsRef.current[i] = el)}
                  key={blog.id} 
                  className="group relative bg-zinc-900 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3 text-sm text-zinc-500">
                        <span className="text-fuchsia-400 font-semibold tracking-wider uppercase text-xs">
                          {blog.category || "General"}
                        </span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Link href={`/blogs/${blog.slug || blog.id}`}>
                        <a className="block group-hover:text-fuchsia-300 transition-colors">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                            {blog.title}
                          </h3>
                        </a>
                      </Link>
                      <p className="text-zinc-500 line-clamp-2 md:line-clamp-1">
                        {blog.excerpt || blog.content?.substring(0, 150) + "..."}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 border-t border-white/5 md:border-t-0 pt-4 md:pt-0 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                          <User className="w-4 h-4 text-zinc-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-400">Admin</span>
                      </div>
                      <Link href={`/blogs/${blog.slug || blog.id}`}>
                        <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-zinc-500 py-12 border border-white/5 rounded-2xl border-dashed">
                No blog posts available currently.
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
