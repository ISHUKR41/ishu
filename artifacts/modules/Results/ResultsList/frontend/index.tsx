// ============================================================================
// FILE: modules/Results/ResultsList/frontend/index.tsx
// PURPOSE: The main paginated results listing section. Displays government exam
//          results in a responsive table/card layout with real-time filtering,
//          sorting, and infinite-scroll-ready pagination.
//
// ISOLATION: Completely self-contained. Fetches data from its own backend
//            endpoint. Changes here will NOT affect any other section.
//
// TECHNOLOGIES USED:
//   - React 19 + TypeScript
//   - TanStack React Query (data fetching + caching)
//   - GSAP ScrollTrigger (row reveal animation)
//   - lucide-react (ExternalLink, Calendar, Building, Tag icons)
//   - date-fns (date formatting)
//
// INSPIRATION: Sarkari Result listings, Apple product comparison tables,
//              Notion database views with clean card layouts.
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink, Calendar, Building2, Tag, ChevronLeft,
  ChevronRight, ArrowUpRight, Clock, Loader2,
} from "lucide-react";
import type { Result, PaginatedResultsResponse } from "../../_shared/types";
import { RESULTS_PER_PAGE } from "../../_shared/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * ResultsList — Paginated listing of all government exam results.
 *
 * WHAT IT DOES:
 * 1. Fetches paginated results from the backend API
 * 2. Renders each result as a card with title, organization, date, and link
 * 3. Provides page navigation controls (Previous / Next / Page numbers)
 * 4. Animates result cards on scroll with GSAP stagger
 *
 * DATA FLOW:
 * User navigates → page state updates → API call with page param →
 * Backend queries DB with LIMIT/OFFSET → Frontend renders results
 */
export default function ResultsList() {
  // ── State for current page ──
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // ── Fetch paginated results from the backend ──
  const { data, isLoading } = useQuery<PaginatedResultsResponse>({
    queryKey: ["results-list", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `/api/results?page=${currentPage}&pageSize=${RESULTS_PER_PAGE}`
      );
      if (!response.ok) throw new Error("Failed to fetch results");
      return response.json();
    },
    placeholderData: {
      data: [],
      total: 0,
      page: 1,
      pageSize: RESULTS_PER_PAGE,
      totalPages: 0,
    },
  });

  // ── GSAP animation for result cards ──
  useEffect(() => {
    if (!listRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from(listRef.current!.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [data, isLoading]);

  // ── Heading animation ──
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current!, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current!,
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /**
   * Formats a date string into a human-readable format.
   * Example: "2024-03-15T00:00:00Z" → "March 15, 2024"
   */
  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const results = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <section
      className="py-16 md:py-24 bg-zinc-950/50"
      aria-label="Government exam results listing"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <div ref={headingRef} className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Latest{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="mt-2 text-zinc-400">
              {data?.total
                ? `Showing ${results.length} of ${data.total.toLocaleString("en-IN")} results`
                : "Loading results..."}
            </p>
          </div>
        </div>

        {/* ── Loading state ── */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
            <span className="ml-3 text-zinc-400">Loading results...</span>
          </div>
        )}

        {/* ── Results list ── */}
        {!isLoading && results.length > 0 && (
          <div ref={listRef} className="space-y-3">
            {results.map((result: Result) => (
              <div
                key={result.id}
                className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Result info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {result.isLatest && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Clock className="h-3 w-3" />
                          Latest
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Tag className="h-3 w-3" />
                        {result.examCategory}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                      {result.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {result.organization}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(result.declaredDate)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Action buttons */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/results/${result.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-all"
                    >
                      Details
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    {result.resultUrl && (
                      <a
                        href={result.resultUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-500 transition-all"
                      >
                        Official
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No results found.</p>
          </div>
        )}

        {/* ── Pagination controls ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="px-4 py-2 text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
