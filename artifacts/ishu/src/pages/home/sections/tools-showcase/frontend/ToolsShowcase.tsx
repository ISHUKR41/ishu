// FILE: artifacts/ishu/src/pages/home/sections/tools-showcase/frontend/ToolsShowcase.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, File, Scissors, Archive, FileText, Image as ImageIcon, Lock, Wrench } from "lucide-react";
import { useListTools } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./tools-showcase.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  FileStack: File,
  Scissors,
  Archive,
  FileText,
  Image: ImageIcon,
  Lock,
  File,
};

const TOOL_COLORS: Record<string, { bg: string; color: string }> = {
  "merge-pdf":         { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6" },
  "split-pdf":         { bg: "rgba(139,92,246,0.12)",  color: "#8b5cf6" },
  "compress-pdf":      { bg: "rgba(249,115,22,0.12)",  color: "#f97316" },
  "pdf-to-word":       { bg: "rgba(16,185,129,0.12)",  color: "#10b981" },
  "pdf-to-excel":      { bg: "rgba(20,184,166,0.12)",  color: "#14b8a6" },
  "word-to-pdf":       { bg: "rgba(99,102,241,0.12)",  color: "#6366f1" },
  "image-to-pdf":      { bg: "rgba(234,179,8,0.12)",   color: "#eab308" },
  "pdf-to-jpg":        { bg: "rgba(239,68,68,0.12)",   color: "#ef4444" },
  "protect-pdf":       { bg: "rgba(220,38,38,0.12)",   color: "#dc2626" },
  "ai-pdf-summarizer": { bg: "rgba(168,85,247,0.12)",  color: "#a855f7" },
};
const DEFAULT_COLOR = { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" };

const POPULAR_SLUGS = [
  "merge-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf",
  "image-to-pdf", "pdf-to-jpg", "split-pdf", "protect-pdf",
];

export function ToolsShowcase() {
  const { data, isLoading } = useListTools();
  const allTools = Array.isArray(data) ? data : [];

  const featured = POPULAR_SLUGS
    .map(slug => allTools.find(t => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => !!t)
    .slice(0, 8);

  const displayTools = featured.length >= 4 ? featured : allTools.slice(0, 8);

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>
            <Wrench size={14} />
            {allTools.length > 0 ? `${allTools.length}+ Free Tools` : "100+ Free Tools"}
          </div>
          <h2 className={styles.sectionTitle}>Every Student Tool You Need</h2>
          <p className={styles.sectionDesc}>
            Free, fast and secure tools to help you prepare documents for government job applications. No sign-up required.
          </p>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))
          ) : (
            displayTools.map((tool, index) => {
              const colorMeta = TOOL_COLORS[tool.slug] ?? DEFAULT_COLOR;
              const IconCmp = tool.icon ? (ICON_MAP[tool.icon] ?? FileText) : FileText;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={styles.toolCard}
                    style={{ "--tool-color": colorMeta.bg } as React.CSSProperties}
                  >
                    <div className={styles.toolIconWrapper} style={{ background: colorMeta.bg }}>
                      <IconCmp size={24} style={{ color: colorMeta.color }} />
                    </div>
                    <h3 className={styles.toolName}>{tool.name}</h3>
                    <p className={styles.toolDesc}>{tool.description}</p>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className={styles.cta}>
          <Link href="/tools" className={styles.ctaBtn}>
            Explore All {allTools.length > 0 ? `${allTools.length}+` : "100+"} Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
