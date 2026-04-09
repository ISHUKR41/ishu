// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, ArrowRight, Calendar, Users, Briefcase } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Utility for fetching status colors
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return { bg: "rgba(16,185,129,0.15)", text: "#10b981", label: "Active" };
    case "upcoming":
      return { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", label: "Upcoming" };
    case "closed":
      return { bg: "rgba(239,68,68,0.15)", text: "#ef4444", label: "Closed" };
    case "results":
      return { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", label: "Results Out" };
    default:
      return { bg: "rgba(107,114,128,0.15)", text: "#9ca3af", label: "Unknown" };
  }
};

/**
 * FEATURED RESULTS SECTION (Frontend Module)
 * 
 * High-end representation of newest results using staggered GSAP animations, 
 * glassmorphism cards, and Lucide icons.
 */
export default function FeaturedResults() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/home/sections/featured-results")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setResults(json.data);
        }
      })
      .catch((err) => console.error("Failed to load featured results:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || results.length === 0) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".feat-header",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feat-header",
            start: "top 85%",
          },
        }
      );

      // Staggered Cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, results]);

  return (
    <section ref={containerRef} className="py-24 bg-black relative">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="feat-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-zinc-400 font-medium tracking-widest uppercase text-sm mb-3">
              <Trophy className="w-4 h-4 text-emerald-400" />
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Government Results{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                & Vacancies
              </span>
            </h2>
            <p className="text-zinc-400 mt-4 text-lg">
              Stay updated with the most recent exam results, answer keys, and new job openings across India.
            </p>
          </div>
          <Link href="/results">
            <a className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-md">
              View All Results
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-48 w-full" />
             ))
          ) : results.length > 0 ? (
            results.map((result, i) => {
              const status = getStatusStyle(result.status ?? "active");
              
              return (
                <Link href={`/results/${result.id}`} key={result.id}>
                  <a
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden"
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-white/10 text-white border border-white/5">
                        {result.category?.toUpperCase() ?? "GOV"}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-current/20"
                        style={{ backgroundColor: status.bg, color: status.text }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <h3 className="relative z-10 text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {result.title}
                    </h3>
                    <p className="relative z-10 text-zinc-400 text-sm mb-6 line-clamp-2">
                      {result.shortDescription || "Click to view full details and official notifications."}
                    </p>

                    <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-sm font-medium text-zinc-500">
                      {result.lastDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-emerald-400" />
                          <span>{new Date(result.lastDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      )}
                      {result.totalPosts && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>{Number(result.totalPosts).toLocaleString("en-IN")} Posts</span>
                        </div>
                      )}
                    </div>
                  </a>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No recent results found. Check back soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
