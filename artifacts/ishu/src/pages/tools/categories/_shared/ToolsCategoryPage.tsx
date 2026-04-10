// FILE: artifacts/ishu/src/pages/tools/categories/_shared/ToolsCategoryPage.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Search, Wrench, Sparkles, Star } from "lucide-react";
import { useListTools } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { ProfessionalIcon } from "@/components/icons/ProfessionalIcon";

interface ToolsCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export function ToolsCategoryPage({ categorySlug, categoryName, description, icon, accentColor }: ToolsCategoryPageProps) {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useListTools({ category: categorySlug });

  const tools = (Array.isArray(data) ? data : (data as any)?.tools ?? []).filter((t: any) =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageMeta
        title={`${categoryName} Tools – Free Online | Ishu`}
        description={`Free ${categoryName} tools for students. ${description}`}
        keywords={`${categoryName.toLowerCase()} tools, free ${categorySlug} tools, online tools for students`}
        canonical={`https://ishu.in/tools/category/${categorySlug}`}
      />

      <div style={{ background: "hsl(var(--background))", minHeight: "100vh", paddingBottom: "4rem" }}>
        <div style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))", padding: "2rem 0" }}>
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={16} />
              Back to All Tools
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "0.75rem", background: `${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
                  <ProfessionalIcon icon={icon} size={28} style={{ color: accentColor }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>{categoryName}</h1>
                  <p style={{ color: "hsl(var(--muted-foreground))", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>{description}</p>
                </div>
              </div>
              <span style={{ background: `${accentColor}15`, color: accentColor, padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${accentColor}30` }}>
                <Wrench size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                {tools.length} Tools Available — 100% Free
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${categoryName} tools...`}
              style={{ width: "100%", padding: "0.625rem 0.75rem 0.625rem 2.25rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", color: "hsl(var(--foreground))", fontSize: "0.875rem", outline: "none" }}
            />
          </div>

          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: 140, background: "hsl(var(--card))", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", opacity: 0.6 }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {tools.map((tool: any, i: number) => (
                <motion.div key={tool.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                  <Link href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", padding: "1.25rem", cursor: "pointer", transition: "all 0.2s", height: "100%" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "0.625rem", background: `${accentColor}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <ProfessionalIcon icon={tool.icon ?? "Wrench"} size={20} style={{ color: accentColor }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "hsl(var(--foreground))", margin: 0 }}>{tool.name}</h3>
                            {tool.isNew && <span style={{ fontSize: "0.65rem", background: "#22c55e20", color: "#22c55e", padding: "0.1rem 0.4rem", borderRadius: "9999px", fontWeight: 700 }}>NEW</span>}
                          </div>
                          <p style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.4 }}>{tool.description}</p>
                        </div>
                      </div>
                      {tool.usageCount > 0 && (
                        <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Star size={11} style={{ color: accentColor }} />
                          <span style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))" }}>{tool.usageCount.toLocaleString()} uses</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
