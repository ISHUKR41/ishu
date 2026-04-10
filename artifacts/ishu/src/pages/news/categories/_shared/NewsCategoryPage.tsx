// FILE: artifacts/ishu/src/pages/news/categories/_shared/NewsCategoryPage.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Search, Clock, TrendingUp, Newspaper } from "lucide-react";
import { useListNews } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ProfessionalIcon } from "@/components/icons/ProfessionalIcon";

interface NewsCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export function NewsCategoryPage({ categorySlug, categoryName, description, icon, accentColor }: NewsCategoryPageProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useListNews({ category: categorySlug, search: search || undefined, page, limit: 15 });

  const articles = (data as any)?.articles ?? [];
  const total = (data as any)?.total ?? 0;
  const totalPages = (data as any)?.totalPages ?? 1;

  return (
    <>
      <PageMeta
        title={`${categoryName} News & Updates 2025 | Ishu`}
        description={`Latest ${categoryName} news, notifications and updates. ${description}`}
        keywords={`${categoryName.toLowerCase()} news, ${categorySlug} updates, latest ${categoryName.toLowerCase()} notifications`}
        canonical={`https://ishu.in/news/category/${categorySlug}`}
      />

      <div style={{ background: "hsl(var(--background))", minHeight: "100vh", paddingBottom: "4rem" }}>
        <div style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))", padding: "2rem 0" }}>
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={16} />
              Back to All News
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "0.75rem", background: `${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ProfessionalIcon icon={icon} size={28} style={{ color: accentColor }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>{categoryName} News</h1>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>{description}</p>
                </div>
              </div>
              <span style={{ background: `${accentColor}15`, color: accentColor, padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${accentColor}30` }}>
                <TrendingUp size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                {total} Articles
              </span>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6" style={{ paddingTop: "1.5rem" }}>
          <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder={`Search ${categoryName} news...`} style={{ width: "100%", padding: "0.625rem 0.75rem 0.625rem 2.25rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))", fontSize: "0.875rem", outline: "none" }} />
          </div>

          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ height: 100, background: "hsl(var(--card))", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", opacity: 0.6 }} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>
              <Newspaper size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>No news found for this category yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {articles.map((article: any, i: number) => (
                <motion.div key={article.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Link href={`/news/${article.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", padding: "1.25rem", cursor: "pointer", transition: "all 0.2s", display: "flex", gap: "1rem", alignItems: "flex-start" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                          {article.isTrending && (
                            <span style={{ fontSize: "0.7rem", background: "#ef444420", color: "#ef4444", padding: "0.1rem 0.4rem", borderRadius: "9999px", fontWeight: 700 }}>🔥 TRENDING</span>
                          )}
                          <span style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Clock size={11} />
                            {new Date(article.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: "0.4rem", lineHeight: 1.4 }}>{article.title}</h3>
                        <p style={{ fontSize: "0.82rem", color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.5 }}>{article.shortDescription}</p>
                        {article.author && <p style={{ fontSize: "0.72rem", color: accentColor, marginTop: "0.5rem" }}>By {article.author}</p>}
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
                <button key={i} onClick={() => setPage(i + 1)} style={{ width: 36, height: 36, borderRadius: "0.375rem", background: page === i + 1 ? accentColor : "hsl(var(--card))", color: page === i + 1 ? "#fff" : "hsl(var(--foreground))", border: `1px solid ${page === i + 1 ? accentColor : "hsl(var(--border))"}`, cursor: "pointer", fontWeight: page === i + 1 ? 600 : 400, fontSize: "0.875rem" }}>
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
