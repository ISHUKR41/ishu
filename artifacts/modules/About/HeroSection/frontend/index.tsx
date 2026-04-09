// ============================================================================
// FILE: modules/About/HeroSection/frontend/index.tsx
// PURPOSE: About page hero with mission statement and animated team overview.
// ISOLATION: Self-contained. No external dependencies.
// TECHNOLOGIES: React 19, GSAP, lucide-react
// ============================================================================

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Heart, Users, Target, Zap, Globe, Award } from "lucide-react";

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      if (titleRef.current) tl.from(titleRef.current, { y: 60, opacity: 0 });
      if (missionRef.current) tl.from(missionRef.current, { y: 40, opacity: 0 }, "-=0.5");
      if (valuesRef.current) tl.from(valuesRef.current.children, { y: 30, opacity: 0, stagger: 0.1 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const values = [
    { icon: Target, label: "Mission", desc: "Democratize access to government exam results and educational resources for every Indian student.", color: "from-blue-500 to-cyan-500" },
    { icon: Heart, label: "Passion", desc: "Built by students, for students. We understand the challenges of competitive exam preparation.", color: "from-rose-500 to-pink-500" },
    { icon: Globe, label: "Reach", desc: "Covering all 36 states and UTs, 12+ exam categories, and thousands of results across India.", color: "from-emerald-500 to-teal-500" },
    { icon: Zap, label: "Speed", desc: "Results published within minutes of official declaration. Fastest updates in the industry.", color: "from-amber-500 to-orange-500" },
    { icon: Users, label: "Community", desc: "Serving millions of students, aspirants, and job seekers across the nation.", color: "from-violet-500 to-purple-500" },
    { icon: Award, label: "Trust", desc: "100% verified data sourced directly from official government websites and press releases.", color: "from-indigo-500 to-blue-500" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28" aria-label="About us hero">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.10),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">ISHU</span>
          </h1>
          <div ref={missionRef} className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            <p>
              <strong className="text-white">ISHU — Indian Student Hub University</strong> is India's
              most comprehensive education platform, providing instant access to government exam
              results, practical student tools, educational news, and career guidance.
            </p>
            <p className="mt-4">
              Founded with one mission: to make verified, timely information accessible to every
              student and job aspirant across India, regardless of their location or background.
            </p>
          </div>
        </div>

        <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {values.map((v) => (
            <div key={v.label} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} mb-4`}>
                <v.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{v.label}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
