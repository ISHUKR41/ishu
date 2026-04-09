// ============================================================================
// FILE: modules/Blog/Categories/exam-tips/frontend/index.tsx
// PURPOSE: Isolated frontend for the "Exam Tips" blog category.
//          Fetches REAL blog articles from the backend API.
//
// TECH STACK: React, TanStack Query, GSAP, Lucide Icons, Wouter
// ============================================================================

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import {
  ArrowLeft, Loader2, AlertCircle, Clock,
  User, BookOpen, Eye
} from "lucide-react";
import gsap from "gsap";

interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: number;
  isFeatured: boolean;
  viewCount: number;
  imageUrl: string | null;
  createdAt: string;
}

export default function ExamtipsBlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery<{ articles: BlogArticle[]; total: number }>({
    queryKey: ["blogs", "category", "exam-tips"],
    queryFn: async () => {
      const res = await fetch("/api/blogs/category/exam-tips");
      if (!res.ok) throw new Error("Failed to fetch Exam Tips blogs");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 30, opacity: 0, duration: 0.5,
        stagger: 0.06, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <>
      <PageMeta
        title={`Exam Tips - Blog | Ishu`}
        description={`Read the best Exam Tips articles, guides, and insights for exam preparation and career growth.`}
      />

      <div ref={containerRef} className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-green-500/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-green-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Exam Tips</h1>
                <p className="text-muted-foreground text-sm">In-depth articles and guides</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>Failed to load blog articles.</p>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles?.length > 0 ? (
                data.articles.map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`}>
                    <article className="blog-card group bg-card border border-border rounded-xl overflow-hidden hover:border-green-500/30 hover:shadow-lg transition-all cursor-pointer">
                      {blog.imageUrl && (
                        <div className="h-48 overflow-hidden">
                          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        {blog.isFeatured && (
                          <span className="text-xs text-yellow-400 border border-yellow-500/30 rounded-full px-2 py-0.5 bg-yellow-500/10 mb-3 inline-block">Featured</span>
                        )}
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-green-400 transition-colors mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime} min</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {blog.viewCount}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No Exam Tips articles yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
