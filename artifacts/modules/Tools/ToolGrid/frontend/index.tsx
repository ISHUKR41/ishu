// ============================================================================
// FILE: modules/Tools/ToolGrid/frontend/index.tsx
// PURPOSE: Grid listing of all available tools with usage stats and actions.
// ISOLATION: Self-contained with own data fetching.
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, ArrowUpRight, Loader2, Users } from "lucide-react";
import type { Tool } from "../../_shared/types";

gsap.registerPlugin(ScrollTrigger);

export default function ToolGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["tools-grid"],
    queryFn: async () => {
      const res = await fetch("/api/tools");
      if (!res.ok) throw new Error("Failed to fetch tools");
      const json = await res.json();
      return json.data ?? json;
    },
  });

  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current!.children, {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current!, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [tools, isLoading]);

  return (
    <section className="py-16 md:py-24 bg-zinc-950/50" aria-label="All tools">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
          All <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Tools</span>
        </h2>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
          </div>
        )}

        {!isLoading && tools.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors mb-1">
                  {tool.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{tool.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Users className="h-3.5 w-3.5" />
                  {tool.usageCount.toLocaleString("en-IN")} uses
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && tools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No tools available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
