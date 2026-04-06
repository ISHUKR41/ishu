import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, FileText, Users, Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useListResults } from "@workspace/api-client-react";
import styles from "./featured-results.module.css";

const categoryColors: Record<string, { bg: string; text: string }> = {
  "upsc-civil-services": { bg: "rgba(59,130,246,0.12)", text: "#3b82f6" },
  "ssc-cgl": { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6" },
  "ssc-chsl": { bg: "rgba(124,58,237,0.12)", text: "#7c3aed" },
  "banking-ibps": { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
  "railway-rrb": { bg: "rgba(249,115,22,0.12)", text: "#f97316" },
  "army-defence": { bg: "rgba(239,68,68,0.12)", text: "#ef4444" },
  "jee-mains": { bg: "rgba(234,179,8,0.12)", text: "#ca8a04" },
  "neet-ug": { bg: "rgba(20,184,166,0.12)", text: "#0d9488" },
  "state-psc": { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
  "police": { bg: "rgba(220,38,38,0.12)", text: "#dc2626" },
  "teaching-tet": { bg: "rgba(6,182,212,0.12)", text: "#0891b2" },
  "engineering-jobs": { bg: "rgba(132,204,22,0.12)", text: "#65a30d" },
  "judiciary": { bg: "rgba(168,85,247,0.12)", text: "#9333ea" },
  "nursing": { bg: "rgba(236,72,153,0.12)", text: "#db2777" },
  default: { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
};

function getStatusStyle(status: string) {
  const s = (status ?? "").toLowerCase();
  if (s === "active") return { bg: "rgba(16,185,129,0.15)", text: "#059669", label: "Active" };
  if (s === "upcoming") return { bg: "rgba(59,130,246,0.15)", text: "#2563eb", label: "Upcoming" };
  if (s === "result") return { bg: "rgba(139,92,246,0.15)", text: "#7c3aed", label: "Result Out" };
  if (s === "expired") return { bg: "rgba(107,114,128,0.12)", text: "#6b7280", label: "Expired" };
  return { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))", label: status };
}

export function FeaturedResults() {
  const { data, isLoading } = useListResults({ limit: 6 });
  const results = data?.results ?? [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionLabel}>
              <Trophy size={14} />
              Latest Updates
            </div>
            <h2 className={styles.sectionTitle}>Government Results & Vacancies</h2>
            <p className={styles.sectionDesc}>
              Stay updated with the most recent exam results, answer keys and new job openings across India.
            </p>
          </div>
          <Link href="/results" className={styles.viewAll}>
            View All Results <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          ) : results.length > 0 ? (
            results.map((result, index) => {
              const catKey = result.category?.toLowerCase() ?? "default";
              const cat = categoryColors[catKey] ?? categoryColors.default;
              const status = getStatusStyle(result.status ?? "active");
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link href={`/results/${result.id}`} className={styles.card}>
                    <div className={styles.badgeRow}>
                      <span className={styles.badge} style={{ background: cat.bg, color: cat.text }}>
                        {result.category?.toUpperCase() ?? "GOV"}
                      </span>
                      <span className={styles.badge} style={{ background: status.bg, color: status.text }}>
                        {status.label}
                      </span>
                      {result.state && (
                        <span className={`${styles.badge} ${styles.badgeGray}`}>{result.state}</span>
                      )}
                    </div>

                    <h3 className={styles.cardTitle}>{result.title}</h3>
                    <p className={styles.cardDesc}>{result.shortDescription}</p>

                    <div className={styles.cardMeta}>
                      {result.lastDate && (
                        <span className={styles.metaItem}>
                          <Calendar size={11} className={styles.metaIconBlue} />
                          {new Date(result.lastDate).toLocaleDateString("en-IN")}
                        </span>
                      )}
                      {result.totalPosts && (
                        <span className={styles.metaItem}>
                          <Users size={11} className={styles.metaIconOrange} />
                          {Number(result.totalPosts).toLocaleString("en-IN")} Posts
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              No results available yet. Check back soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
