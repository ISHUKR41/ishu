// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  label: string;
  value: number | string;
  suffix: string;
}

/**
 * HOME STATS SECTION (Frontend Module)
 * 
 * Fetches REAL dynamic count data from the corresponding backend module.
 * Uses GSAP ScrollTrigger and React CountUp for smooth entry animations.
 */
export default function HomeStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    fetch("/api/home/sections/stats")
      .then((res) => res.json())
      .then((json) => setStats(json))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  useEffect(() => {
    if (stats.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  if (stats.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.id} className="stat-card flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {typeof stat.value === "number" ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  stat.value
                )}
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
