// ============================================================================
// FILE: modules/Resources/Categories/previous-papers/frontend/index.tsx
// PURPOSE: Isolated frontend for "Previous Papers" resources category.
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { ArrowLeft, Loader2, AlertCircle, FileText, Download } from "lucide-react";
import gsap from "gsap";

interface ResourceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileUrl: string | null;
  downloadCount: number;
}

export default function PreviouspapersResourcesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery<{ resources: ResourceItem[] }>({
    queryKey: ["resources", "category", "previous-papers"],
    queryFn: async () => {
      const res = await fetch("/api/resources/category/previous-papers");
      if (!res.ok) throw new Error("Failed to fetch Previous Papers");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".resource-card", {
        y: 30, opacity: 0, duration: 0.5,
        stagger: 0.06, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <>
      <PageMeta
        title={`Previous Papers - Study Resources | Ishu`}
        description={`Download free Previous Papers for exam preparation.`}
      />
      <div ref={containerRef} className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-amber-500/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Resources
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Previous Papers</h1>
                <p className="text-muted-foreground text-sm">Free study materials</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Failed to load resources.</p>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.resources?.length > 0 ? (
                data.resources.map((resource) => (
                  <article key={resource.id} className="resource-card bg-card border border-border rounded-xl p-6 hover:border-amber-500/30 hover:shadow-lg transition-all">
                    <FileText className="h-8 w-8 text-amber-400 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{resource.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" /> {resource.downloadCount?.toLocaleString() ?? 0} downloads
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No Previous Papers available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
