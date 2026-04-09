// ============================================================================
// FILE: modules/Blog/ArticleGrid/frontend/index.tsx
// PURPOSE: Paginated blog article grid listing with GSAP animations.
//          Displays blog posts as cards with read time, author, and category.
//
// ISOLATION: Self-contained. Fetches data from its own backend endpoint.
// TECHNOLOGIES: React 19, TanStack React Query, GSAP, lucide-react
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock, User, ChevronLeft, ChevronRight, Loader2, ArrowUpRight, BookOpen,
} from "lucide-react";
import type { BlogPost, PaginatedBlogResponse } from "../../_shared/types";
import { BLOG_PER_PAGE } from "../../_shared/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ArticleGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery<PaginatedBlogResponse>({
    queryKey: ["blog-articles", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/blogs?page=${currentPage}&pageSize=${BLOG_PER_PAGE}`);
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
    placeholderData: { data: [], total: 0, page: 1, pageSize: BLOG_PER_PAGE, totalPages: 0 },
  });

  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current!.children, {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [data, isLoading]);

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

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <section className="py-16 md:py-24 bg-zinc-950/50" aria-label="Blog articles">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            All{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="mt-2 text-zinc-400">
            {data?.total ? `${data.total} posts available` : "Loading..."}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
          </div>
        )}

        {!isLoading && articles.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer block"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-cyan-500/30" />
                </div>
                <div className="p-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />{post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />{post.readTime} min read
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 transition-all">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="px-4 py-2 text-sm text-zinc-400">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 disabled:opacity-30 transition-all">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
