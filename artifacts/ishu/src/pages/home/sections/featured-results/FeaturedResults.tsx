import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, FileText, Users, Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useListResults } from "@workspace/api-client-react";
import styles from "./featured-results.module.css";

const categoryColors: Record<string, { bg: string; text: string }> = {
  upsc: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa" },
  ssc: { bg: "rgba(139,92,246,0.12)", text: "#a78bfa" },
  banking: { bg: "rgba(16,185,129,0.12)", text: "#34d399" },
  railway: { bg: "rgba(249,115,22,0.12)", text: "#fb923c" },
  defence: { bg: "rgba(239,68,68,0.12)", text: "#f87171" },
  state: { bg: "rgba(234,179,8,0.12)", text: "#fbbf24" },
  education: { bg: "rgba(20,184,166,0.12)", text: "#2dd4bf" },
  default: { bg: "rgba(99,102,241,0.12)", text: "#818cf8" },
};

function getStatusStyle(status: string) {
  const s = (status ?? "").toLowerCase();
  if (s === "active") return { bg: "rgba(16,185,129,0.15)", text: "#34d399", label: "Active" };
  if (s === "upcoming") return { bg: "rgba(59,130,246,0.15)", text: "#60a5fa", label: "Upcoming" };
  if (s === "result") return { bg: "rgba(139,92,246,0.15)", text: "#a78bfa", label: "Result Out" };
  return { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.4)", label: status };
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
