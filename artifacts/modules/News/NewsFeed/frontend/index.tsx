// ============================================================================
// FILE: modules/News/NewsFeed/frontend/index.tsx
// PURPOSE: The main news article listing with pagination, category filtering,
//          and GSAP animated card reveals. This is the core section of the
//          News page that users spend the most time interacting with.
//
// ISOLATION: Self-contained with its own data fetching and state management.
//
// TECHNOLOGIES: React 19, TanStack React Query, GSAP, lucide-react
// INSPIRATION: Medium article cards, Dev.to feed, The Verge layout
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar, User, Tag, ArrowUpRight, ChevronLeft,
  ChevronRight, Loader2, ExternalLink, Clock,
} from "lucide-react";
import type { NewsArticle, PaginatedNewsResponse } from "../../_shared/types";
import { NEWS_PER_PAGE } from "../../_shared/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * NewsFeed — Paginated listing of all news articles.
 */
export default function NewsFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery<PaginatedNewsResponse>({
    queryKey: ["news-feed", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/news?page=${currentPage}&pageSize=${NEWS_PER_PAGE}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    placeholderData: { data: [], total: 0, page: 1, pageSize: NEWS_PER_PAGE, totalPages: 0 },
  });

  // Animate articles on data load
  useEffect(() => {
    if (!listRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from(listRef.current!.children, {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [data, isLoading]);

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current!, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current!, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric", month: "short", day: "numeric",
      });
    } catch { return dateStr; }
  };

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <section className="py-16 md:py-24 bg-zinc-950/50" aria-label="News feed">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="mt-2 text-zinc-400">
            {data?.total ? `${data.total.toLocaleString("en-IN")} articles available` : "Loading..."}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
            <span className="ml-3 text-zinc-400">Loading news...</span>
          </div>
        )}

        {!isLoading && articles.length > 0 && (
          <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article: NewsArticle) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer block"
              >
                {/* Article image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tag className="h-10 w-10 text-purple-500/30" />
                  </div>
                  {article.isBreaking && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                      Breaking
                    </span>
                  )}
                  {article.isFeatured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {/* Category badge */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-3">
                    {article.category}
                  </span>

                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No news articles found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="px-4 py-2 text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
