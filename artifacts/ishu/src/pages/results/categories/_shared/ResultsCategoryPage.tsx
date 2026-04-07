import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Search, Filter, Calendar, FileText, ExternalLink, TrendingUp } from "lucide-react";
import { useListResults } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";

interface ResultsCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  description: string;
  icon: string;
  accentColor: string;
}

const statusColors: Record<string, string> = {
  active: "#22c55e",
  upcoming: "#f59e0b",
  expired: "#6b7280",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  upcoming: "Upcoming",
  expired: "Expired",
};

export function ResultsCategoryPage({
  categorySlug,
  categoryName,
  description,
  icon,
  accentColor,
}: ResultsCategoryPageProps) {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useListResults({
    category: categorySlug,
    status: status || undefined,
    search: search || undefined,
    page,
    limit: 12,
  });

  const results = (data as any)?.results ?? [];
  const total = (data as any)?.total ?? 0;
  const totalPages = (data as any)?.totalPages ?? 1;

  return (
    <>
      <PageMeta
        title={`${categoryName} Results 2025 – Latest Notifications | Ishu`}
        description={`Get latest ${categoryName} exam results, vacancy notifications, admit cards and important dates. ${description}`}
        keywords={`${categoryName.toLowerCase()} results, ${categorySlug} results, ${categoryName.toLowerCase()} vacancy 2025`}
        canonical={`https://ishu.in/results/category/${categorySlug}`}
      />

      <div style={{ background: "hsl(var(--background))", minHeight: "100vh", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{
          background: "hsl(var(--card))",
          borderBottom: "1px solid hsl(var(--border))",
          padding: "2rem 0",
        }}>
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/results" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={16} />
              Back to All Results
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "0.75rem",
                  background: `${accentColor}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                }}>
                  {icon}
                </div>
                <div>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>
                    {categoryName}
                  </h1>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>
                    {description}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{
                  background: `${accentColor}15`,
                  color: accentColor,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: `1px solid ${accentColor}30`,
                }}>
                  <TrendingUp size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                  {total} Results Found
                </span>
                <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.8rem" }}>Updated daily from official sources</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 md:px-6" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={`Search ${categoryName} exams...`}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem 0.625rem 2.25rem",
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--foreground))",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Filter size={14} style={{ color: "hsl(var(--muted-foreground))" }} />
              {["", "active", "upcoming", "expired"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setPage(1); }}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    fontWeight: status === s ? 600 : 400,
                    background: status === s ? accentColor : "hsl(var(--card))",
                    color: status === s ? "#fff" : "hsl(var(--muted-foreground))",
                    border: `1px solid ${status === s ? accentColor : "hsl(var(--border))"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s === "" ? "All" : statusLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: 220, background: "hsl(var(--card))", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", opacity: 0.6 }} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>
              <FileText size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>No results found for the selected filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {results.map((result: any, i: number) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div
                    onClick={() => navigate(`/results/${result.id}`)}
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                      padding: "1.25rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = accentColor;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "9999px",
                          background: `${statusColors[result.status] ?? "#6b7280"}20`,
                          color: statusColors[result.status] ?? "#6b7280",
                          border: `1px solid ${statusColors[result.status] ?? "#6b7280"}30`,
                        }}>
                          ● {statusLabels[result.status] ?? result.status}
                        </span>
                        {result.totalPosts && (
                          <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                            {result.totalPosts.toLocaleString()} Posts
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                        {result.title}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem", lineHeight: 1.5 }}>
                        {result.shortDescription}
                      </p>

                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        {result.lastDate && (
                          <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={12} />
                            Last Date: {new Date(result.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                        {result.officialLink && (
                          <a
                            href={result.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ fontSize: "0.75rem", color: accentColor, display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none" }}
                          >
                            <ExternalLink size={12} />
                            Official Site
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "0.375rem",
                    background: page === i + 1 ? accentColor : "hsl(var(--card))",
                    color: page === i + 1 ? "#fff" : "hsl(var(--foreground))",
                    border: `1px solid ${page === i + 1 ? accentColor : "hsl(var(--border))"}`,
                    cursor: "pointer",
                    fontWeight: page === i + 1 ? 600 : 400,
                    fontSize: "0.875rem",
                  }}
                >
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
