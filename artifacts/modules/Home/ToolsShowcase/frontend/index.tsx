// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, ArrowRight, FileText, Image as ImageIcon, Calculator, Cpu, Link as LinkIcon, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Metadata for styling tool categories
const TOOL_META: Record<string, { icon: React.FC<any>; color: string; bg: string }> = {
  "pdf": { icon: FileText, color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  "image": { icon: ImageIcon, color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  "calculator": { icon: Calculator, color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  "ai": { icon: Cpu, color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
  "converter": { icon: LinkIcon, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
};

const DEFAULT_META = { icon: Settings, color: "#6366f1", bg: "rgba(99,102,241,0.15)" };

/**
 * TOOLS SHOWCASE SECTION (Frontend Module)
 * 
 * Interactive 3D tilt-effect cards showcasing the latest free tools.
 * Data driven strictly by its isolated backend API module.
 */
export default function ToolsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data
  useEffect(() => {
    fetch("/api/home/sections/tools-showcase")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setTools(json.data);
        }
      })
      .catch((err) => console.error("Failed to load tools preview:", err))
      .finally(() => setLoading(false));
  }, []);

  // Complex staggered GSAP animations
  useEffect(() => {
    if (loading || tools.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".tools-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".tools-header",
            start: "top 85%",
          },
        }
      );

      // Staggered interactive cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".tools-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, tools]);

  // Card Mouse Move Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
    
    // Glow effect
    const glow = card.querySelector('.glow-effect') as HTMLElement;
    if (glow && window.innerWidth > 768) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 50%)`;
      gsap.to(glow, { opacity: 1, duration: 0.2 });
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
    
    const glow = card.querySelector('.glow-effect') as HTMLElement;
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.5 });
  };

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950 relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="tools-header text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold mb-4 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <Wrench className="w-4 h-4" />
            <span className="text-sm tracking-wide uppercase">Student Utility Box</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Free Practical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tools</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Convert formats, compress files, generate documents, and calculate parameters securely right from your browser.
          </p>
        </div>

        <div className="tools-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-56 w-full" />
             ))
          ) : tools.length > 0 ? (
            tools.map((tool, i) => {
              const meta = TOOL_META[tool.category?.toLowerCase() || ""] || DEFAULT_META;
              const IconComp = meta.icon;
              
              return (
                <Link href={`/tools/${tool.id}`} key={tool.id}>
                  <a
                    ref={(el) => (cardsRef.current[i] = el)}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    className="group relative flex flex-col p-8 rounded-3xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="glow-effect absolute inset-0 rounded-3xl pointer-events-none opacity-0 mix-blend-overlay" />
                    
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div 
                        className="w-14 h-14 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        <IconComp className="w-7 h-7" />
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-zinc-500 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white" />
                    </div>

                    <h3 className="relative z-10 text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="relative z-10 text-zinc-400 text-sm leading-relaxed">
                      {tool.shortDescription || "Use this free online tool instantly."}
                    </p>
                  </a>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No tools available yet. Check back soon.
            </div>
          )}
        </div>
        
        {!loading && tools.length > 0 && (
          <div className="mt-16 text-center">
            <Link href="/tools">
              <a className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105">
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
