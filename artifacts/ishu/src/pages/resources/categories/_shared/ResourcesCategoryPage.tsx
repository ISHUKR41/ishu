import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Download, ExternalLink, BookMarked } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

interface ResourcesCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export function ResourcesCategoryPage({ categorySlug, categoryName, description, icon, accentColor }: ResourcesCategoryPageProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["resources", categorySlug, search, page],
    queryFn: async () => {
      const params = new URLSearchParams({ category: categorySlug, page: String(page), limit: "15" });
      if (search) params.set("search", search);
      const res = await fetch(`${BASE}/api/resources?${params}`);
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const resources = (data as any)?.resources ?? [];
  const total = (data as any)?.total ?? 0;
  const totalPages = (data as any)?.totalPages ?? 1;

  return (
    <>
      <PageMeta
        title={`Free ${categoryName} – Download PDF | Ishu`}
        description={`Download free ${categoryName} for all government exams. ${description}`}
        keywords={`free ${categoryName.toLowerCase()}, download ${categorySlug}, free pdf for government exams`}
        canonical={`https://ishu.in/resources/category/${categorySlug}`}
      />

      <div style={{ background: "hsl(var(--background))", minHeight: "100vh", paddingBottom: "4rem" }}>
        <div style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))", padding: "2rem 0" }}>
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={16} />
              Back to Resources
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "0.75rem", background: `${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>{icon}</div>
                <div>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>Free {categoryName}</h1>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>{description}</p>
                </div>
              </div>
              <span style={{ background: `${accentColor}15`, color: accentColor, padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${accentColor}30` }}>
                <Download size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                {total} Resources Available — 100% Free
              </span>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6" style={{ paddingTop: "1.5rem" }}>
          <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder={`Search ${categoryName}...`}
              style={{ width: "100%", padding: "0.625rem 0.75rem 0.625rem 2.25rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))", fontSize: "0.875rem", outline: "none" }}
            />
          </div>

          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: 180, background: "hsl(var(--card))", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", opacity: 0.6 }} />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>
              <BookMarked size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>No resources found.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {resources.map((resource: any, i: number) => (
                <motion.div key={resource.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                  <div
                    style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", padding: "1.25rem", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${accentColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>📄</div>
                      <div>
                        <span style={{ fontSize: "0.7rem", background: `${accentColor}15`, color: accentColor, padding: "0.1rem 0.4rem", borderRadius: "9999px", fontWeight: 600 }}>{resource.exam}</span>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "hsl(var(--foreground))", marginTop: "0.25rem", lineHeight: 1.3 }}>{resource.title}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem", lineHeight: 1.4 }}>{resource.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.72rem", color: "hsl(var(--muted-foreground))" }}>
                        <span>{resource.fileSize}</span>
                        <span>{(resource.downloads ?? 0).toLocaleString()} downloads</span>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.78rem", background: accentColor, color: "#fff", padding: "0.375rem 0.75rem", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 600 }}>
                          <Download size={12} /> Download
                        </a>
                        {resource.sourceUrl && (
                          <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.78rem", background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", padding: "0.375rem 0.75rem", borderRadius: "0.375rem", textDecoration: "none" }}>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
