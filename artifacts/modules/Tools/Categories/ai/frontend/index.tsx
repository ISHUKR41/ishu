// ============================================================================
// FILE: modules/Tools/Categories/ai/frontend/index.tsx
// PURPOSE: Isolated frontend for "AI Tools" tools category.
//          Shows all tools within this category with usage stats.
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { ArrowLeft, Loader2, AlertCircle, Wrench, Zap, BarChart2 } from "lucide-react";
import gsap from "gsap";

interface ToolItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string | null;
  isNew: boolean;
  usageCount: number;
}

export default function AiToolsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery<{ tools: ToolItem[]; total: number }>({
    queryKey: ["tools", "category", "ai"],
    queryFn: async () => {
      const res = await fetch("/api/tools/category/ai");
      if (!res.ok) throw new Error("Failed to fetch AI Tools");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tool-card", {
        y: 30, opacity: 0, duration: 0.5,
        stagger: 0.08, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <>
      <PageMeta
        title={`AI Tools - Free Online Tools | Ishu`}
        description={`Use free online AI Tools — fast, secure, and no registration required.`}
      />
      <div ref={containerRef} className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-cyan-500/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">AI Tools</h1>
                <p className="text-muted-foreground text-sm">Free online utilities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Failed to load tools.</p>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.tools?.length > 0 ? (
                data.tools.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.slug}`}>
                    <article className="tool-card group bg-card border border-border rounded-xl p-6 hover:border-cyan-500/30 hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex gap-2">
                          {tool.isNew && <span className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-2 py-0.5 bg-blue-500/10">New</span>}
                          <span className="text-xs text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 bg-green-500/10 flex items-center gap-1"><Zap className="h-3 w-3" />Free</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tool.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BarChart2 className="h-3 w-3" /> {tool.usageCount.toLocaleString()} uses
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl">
                  <Wrench className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No AI Tools available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
