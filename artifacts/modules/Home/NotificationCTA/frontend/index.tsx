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
import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BellRing, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * NOTIFICATION CTA SECTION (Frontend Module)
 * 
 * High energy call to action component with GSAP animations.
 */
export default function NotificationCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    activeSubscribers: 0,
    activeGlobalNotifications: 0,
  });

  useEffect(() => {
    fetch("/api/home/sections/notification-cta")
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && json?.data) {
          setMetrics({
            activeSubscribers: json.data.activeSubscribers ?? 0,
            activeGlobalNotifications: json.data.activeGlobalNotifications ?? 0,
          });
        }
      })
      .catch((err) => console.error("Failed to load CTA metrics:", err));
  }, []);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.to(".icon-pulse", {
        scale: 1.1,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-zinc-950 to-purple-900/20" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
        <div className="cta-content relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
           
           {/* Decorative elements behind content */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -translate-x-10 translate-y-10 pointer-events-none" />

           <div className="flex-1 text-center md:text-left relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 mb-6 mx-auto md:mx-0">
                 <BellRing className="w-8 h-8 icon-pulse" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Never Miss An <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Important Update</span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto md:mx-0">
                Subscribe to our notification channels to get instant alerts on new exam schedules, result declarations, and study materials.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {metrics.activeSubscribers.toLocaleString()} subscribers
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {metrics.activeGlobalNotifications.toLocaleString()} active alerts
                </span>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
              <button className="group w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                Subscribe Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <Link href="/notifications">
                <a className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white hover:bg-white/10 hover:text-white border border-white/10 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center">
                  View History
                </a>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
