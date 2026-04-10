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
import { Newspaper, ArrowRight, Calendar, User, Eye, ImageIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * NEWS PREVIEW SECTION (Frontend Module)
 * 
 * GSAP animated news showcase with strictly modular data fetching.
 */
export default function NewsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modular Data Fetching
  useEffect(() => {
    fetch("/api/home/sections/news-preview")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setNews(json.data);
        }
      })
      .catch((err) => console.error("Failed to load news preview:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading || news.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-header",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, rotationY: 5 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".news-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, news]);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950/80 relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold mb-4 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm tracking-wide uppercase">Educational Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">News</span>
            </h2>
          </div>
          <Link href="/news">
            <a className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-zinc-800 border border-white/10 rounded-full text-white font-medium transition-all duration-300">
              Read All News
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-400" />
            </a>
          </Link>
        </div>

        <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
             Array(4).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-80 w-full" />
             ))
          ) : news.length > 0 ? (
            news.map((item, i) => (
              <Link href={`/news/${item.slug || item.id}`} key={item.id}>
                <a
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="group flex flex-col h-full rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative h-48 w-full bg-zinc-800 overflow-hidden flex-shrink-0">
                    {/* Safe visual fallback when an article image URL is not provided. */}
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 transition-transform duration-700 group-hover:scale-110 bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-sm font-medium">News Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-md">
                        {item.category || "Education"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-3 group-hover:text-cyan-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                       {item.excerpt || item.content?.substring(0, 100) + "..."}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-xs font-medium text-zinc-500 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{item.viewCount ?? 0} views</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No news articles available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
