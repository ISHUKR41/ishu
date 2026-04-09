// ============================================================================
// FILE: modules/Results/States/goa/frontend/index.tsx
// PURPOSE: Isolated frontend for Goa (GA) state results.
//          Fetches REAL data from its dedicated backend API endpoint.
//          Uses TanStack React Query for server-state management,
//          GSAP for scroll-triggered animations, and lucide-react icons.
//
// ISOLATION: This module is 100% self-contained. It does NOT import from
//            any other state's module. It can be developed, tested, and
//            deployed independently by a separate team.
//
// TECH STACK:
//   - React 18+ with TypeScript
//   - TanStack React Query (server-state caching)
//   - GSAP + ScrollTrigger (animations)
//   - Lucide React (professional icons)
//   - Wouter (lightweight client routing)
//   - Framer Motion (page transitions)
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import {
  MapPin, ArrowLeft, Calendar, Users, Award,
  Loader2, AlertCircle, TrendingUp
} from "lucide-react";
import gsap from "gsap";

/**
 * Interface defining the shape of a single result record
 * from the Drizzle ORM resultsTable schema.
 */
interface StateResult {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  status: string;
  totalPosts: number | null;
  lastDate: string | null;
  examDate: string | null;
  state: string | null;
  officialLink: string | null;
  createdAt: string;
}

/**
 * GoaResultsPage — The dedicated page for Goa exam results.
 *
 * WHAT IT DOES:
 * 1. Fetches results filtered by state="Goa" from the backend API.
 * 2. Displays them in an animated grid with GSAP entrance effects.
 * 3. Shows loading/error states using professional UI patterns.
 * 4. Provides SEO meta tags for search engine optimization.
 */
export default function GoaResultsPage() {
  // Reference for the main container (used by GSAP for scoped animations)
  const containerRef = useRef<HTMLDivElement>(null);

  // TanStack React Query — fetches real data from our isolated backend
  const { data, isLoading, error } = useQuery<{ results: StateResult[]; total: number }>({
    queryKey: ["results", "state", "goa"],
    queryFn: async () => {
      const res = await fetch("/api/results?state=Goa&limit=50");
      if (!res.ok) throw new Error("Failed to fetch Goa results");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes to reduce API calls
  });

  // GSAP Animation — staggered card entrance effect
  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".state-result-card", {
        y: 40, opacity: 0, duration: 0.6,
        stagger: 0.08, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert(); // Cleanup on unmount
  }, [data]);

  // Status color mapping for result badges
  const statusColor: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    coming_soon: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    expired: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <>
      {/* SEO Meta Tags — unique per state for search engine indexing */}
      <PageMeta
        title={`Goa Exam Results - Latest Updates | Ishu`}
        description={`Get the latest Goa government exam results, notifications, and updates. Stay informed about all state-level examinations.`}
        keywords="Goa results, Goa exam results, Goa government jobs, GA results"
      />

      <div ref={containerRef} className="min-h-screen bg-background">
        {/* Hero Header with gradient background */}
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            {/* Back navigation link */}
            <Link href="/results" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to All Results
            </Link>

            {/* State header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Goa Results
                </h1>
                <p className="text-muted-foreground text-sm">
                  State Code: GA • All government exam results
                </p>
              </div>
            </div>

            {/* Quick stats bar */}
            {data && (
              <div className="flex gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4 text-blue-400" />
                  <span>{data.total} Total Results</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>{data.results.filter(r => r.status === "active").length} Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 md:px-6 py-10">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-3 text-muted-foreground">Loading Goa results...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Failed to load results. Please try again later.</p>
            </div>
          )}

          {/* Results Grid */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.results.length > 0 ? (
                data.results.map((result) => (
                  <Link key={result.id} href={`/results/${result.id}`}>
                    <article className="state-result-card group bg-card border border-border rounded-xl p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor[result.status] ?? ""}`}>
                          {result.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">{result.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                        {result.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {result.shortDescription}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {result.totalPosts && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {result.totalPosts} posts
                          </span>
                        )}
                        {result.lastDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(result.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No results found for Goa yet.</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Check back soon for updates.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
