// FILE: artifacts/ishu/src/pages/blogs/categories/_shared/BlogsCategoryPage.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Search, Clock, BookOpen, Eye } from "lucide-react";
import { useListBlogs } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ProfessionalIcon } from "@/components/icons/ProfessionalIcon";

interface BlogsCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export function BlogsCategoryPage({ categorySlug, categoryName, description, icon, accentColor }: BlogsCategoryPageProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useListBlogs({ category: categorySlug, search: search || undefined, page, limit: 12 });

  const posts = (data as any)?.posts ?? [];
  const total = (data as any)?.total ?? 0;
  const totalPages = (data as any)?.totalPages ?? 1;

  return (
    <>
      <PageMeta
        title={`${categoryName} – Blog | Ishu`}
        description={`${description} Read expert articles on ${categoryName.toLowerCase()} at Ishu.`}
        keywords={`${categoryName.toLowerCase()} blog, ${categorySlug} articles, ${categoryName.toLowerCase()} tips`}
        canonical={`https://ishu.in/blog/category/${categorySlug}`}
      />

      <div style={{ background: "hsl(var(--background))", minHeight: "100vh", paddingBottom: "4rem" }}>
        <div style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))", padding: "2rem 0" }}>
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "0.75rem", background: `${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ProfessionalIcon icon={icon} size={28} style={{ color: accentColor }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>{categoryName}</h1>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>{description}</p>
                </div>
              </div>
              <span style={{ background: `${accentColor}15`, color: accentColor, padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${accentColor}30` }}>
                <BookOpen size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                {total} Articles
              </span>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6" style={{ paddingTop: "1.5rem" }}>
          <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder={`Search ${categoryName}...`} style={{ width: "100%", padding: "0.625rem 0.75rem 0.625rem 2.25rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))", fontSize: "0.875rem", outline: "none" }} />
          </div>

          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: 200, background: "hsl(var(--card))", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", opacity: 0.6 }} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>
              <BookOpen size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>No articles in this category yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", padding: "1.5rem", cursor: "pointer", transition: "all 0.2s", height: "100%" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        {post.isFeatured && <span style={{ fontSize: "0.7rem", background: `${accentColor}20`, color: accentColor, padding: "0.1rem 0.4rem", borderRadius: "9999px", fontWeight: 700 }}>⭐ FEATURED</span>}
                        {(post.tags ?? []).slice(0, 2).map((tag: string) => (
                          <span key={tag} style={{ fontSize: "0.7rem", background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", padding: "0.1rem 0.4rem", borderRadius: "9999px" }}>{tag}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: "0.5rem", lineHeight: 1.4 }}>{post.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem", lineHeight: 1.5 }}>{post.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={12} /> {post.readTime} min read</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Eye size={12} /> {post.viewCount?.toLocaleString() ?? 0}</span>
                        <span style={{ color: accentColor }}>By {post.author}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} style={{ width: 36, height: 36, borderRadius: "0.375rem", background: page === i + 1 ? accentColor : "hsl(var(--card))", color: page === i + 1 ? "#fff" : "hsl(var(--foreground))", border: `1px solid ${page === i + 1 ? accentColor : "hsl(var(--border))"}`, cursor: "pointer", fontSize: "0.875rem" }}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
