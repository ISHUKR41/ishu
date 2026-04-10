// ============================================================================
// FILE: modules/Results/Categories/_template/frontend/index.tsx
// PURPOSE: A reusable template component for category-specific results pages.
//          Instead of creating 12 totally separate components (one for each
//          category like UPSC, SSC, etc.), this template accepts a category slug
//          as a prop and renders the appropriate filtered results page.
//
// WHY A TEMPLATE: With 12 exam categories, creating 12 identical components
//                 with slightly different data would violate DRY. Instead, we
//                 use this template and create thin wrapper files for each
//                 category that pass the correct slug.
//
// ISOLATION: Each category wrapper file (e.g., UPSC/frontend/index.tsx) is
//            still its own file in its own folder, maintaining the modular
//            directory structure required for 100+ developer collaboration.
//
// TECHNOLOGIES USED:
//   - React 19 + TypeScript
//   - TanStack React Query (data fetching)
//   - GSAP ScrollTrigger (animations)
//   - lucide-react (icons)
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink, Calendar, Building2, Tag, ArrowLeft,
  ArrowUpRight, Clock, Loader2,
} from "lucide-react";
import { RESULT_CATEGORIES } from "../../../_shared/constants";
import type { Result } from "../../../_shared/types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for the CategoryResultsTemplate component.
 */
interface CategoryResultsTemplateProps {
  /** The URL slug for the category (e.g., "upsc", "ssc", "banking") */
  categorySlug: string;
}

/**
 * CategoryResultsTemplate — Reusable template for category results pages.
 *
 * @param categorySlug — The slug of the category to display results for.
 *
 * WHAT IT DOES:
 * 1. Looks up the category metadata (name, description, color) from constants
 * 2. Fetches filtered results from the category-specific backend endpoint
 * 3. Renders a hero section with the category info
 * 4. Renders a filtered results list with pagination
 */
export default function CategoryResultsTemplate({
  categorySlug,
}: CategoryResultsTemplateProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Find the category metadata from our constants
  const category = RESULT_CATEGORIES.find((c: any) => c.slug === categorySlug);

  // Fetch results filtered by this category
  const { data: results = [], isLoading } = useQuery<Result[]>({
    queryKey: ["category-results", categorySlug],
    queryFn: async () => {
      const response = await fetch(`/api/results/category/${categorySlug}`);
      if (!response.ok) throw new Error("Failed to fetch category results");
      const json = await response.json();
      return json.data ?? json;
    },
  });

  // GSAP entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate results list when data loads
  useEffect(() => {
    if (!listRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from(listRef.current!.children, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [results, isLoading]);

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-zinc-950">
      {/* ── Category Hero ── */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category?.color ?? "from-blue-500 to-cyan-500"} opacity-[0.06]`}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back navigation */}
          <Link
            href="/results"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Results
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {category?.name ?? categorySlug.toUpperCase()}{" "}
            <span className="text-zinc-500">Results</span>
          </h1>
          <p className="mt-3 text-lg text-zinc-500">{category?.fullName}</p>
          <p className="mt-4 text-zinc-400 max-w-3xl leading-relaxed">
            {category?.description}
          </p>
          <div className="mt-4 text-sm text-zinc-500">
            {results.length} results found
          </div>
        </div>
      </div>

      {/* ── Results List ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
            <span className="ml-3 text-zinc-400">Loading results...</span>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div ref={listRef} className="space-y-3">
            {results.map((result) => (
              <div
                key={result.id}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {result.isLatest && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
                        <Clock className="h-3 w-3" />
                        Latest
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
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

        {!isLoading && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">
              No {category?.name} results available yet.
            </p>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse all results
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
