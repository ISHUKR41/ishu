// ============================================================================
// FILE: modules/News/Categories/scholarships/frontend/index.tsx
// PURPOSE: Isolated frontend for the "Scholarships" news category.
//          Fetches REAL news articles filtered by category="scholarships"
//          from the dedicated backend API endpoint.
//
// TECH STACK: React, TanStack Query, GSAP, Lucide Icons, Wouter
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import {
  ArrowLeft, Loader2, AlertCircle, Clock,
  TrendingUp, Eye, Newspaper
} from "lucide-react";
import gsap from "gsap";

/**
 * Shape of a news article from the database (newsTable schema).
 */
interface NewsArticle {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  imageUrl: string | null;
  author: string | null;
  isTrending: boolean;
  viewCount: number;
  createdAt: string;
}

/**
 * ScholarshipsNewsPage — Dedicated page for "Scholarships" news articles.
 */
export default function ScholarshipsNewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch real news data for this specific category
  const { data, isLoading, error } = useQuery<{ articles: NewsArticle[]; total: number }>({
    queryKey: ["news", "category", "scholarships"],
    queryFn: async () => {
      const res = await fetch("/api/news/category/scholarships");
      if (!res.ok) throw new Error("Failed to fetch Scholarships news");
      return res.json();
    },
    staleTime: 1000 * 60 * 3, // Cache for 3 minutes
  });

  // GSAP staggered entrance animation
  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".news-card", {
        y: 30, opacity: 0, duration: 0.5,
        stagger: 0.06, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <>
      <PageMeta
        title={`Scholarships News - Latest Updates | Ishu`}
        description={`Stay updated with the latest Scholarships news, notifications, and important announcements.`}
      />

      <div ref={containerRef} className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-b from-purple-500/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to All News
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Newspaper className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Scholarships News</h1>
                <p className="text-muted-foreground text-sm">Latest updates and articles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-10">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              <span className="ml-3 text-muted-foreground">Loading Scholarships news...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Failed to load news articles. Please try again.</p>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles?.length > 0 ? (
                data.articles.map((article) => (
                  <Link key={article.id} href={`/news/${article.id}`}>
                    <article className="news-card group bg-card border border-border rounded-xl overflow-hidden hover:border-purple-500/30 hover:shadow-lg transition-all cursor-pointer">
                      {article.imageUrl && (
                        <div className="h-48 overflow-hidden">
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {article.isTrending && (
                            <span className="flex items-center gap-1 text-xs text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5 bg-orange-500/10">
                              <TrendingUp className="h-3 w-3" /> Trending
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.shortDescription}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(article.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {article.viewCount}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl">
                  <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No Scholarships news articles yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
