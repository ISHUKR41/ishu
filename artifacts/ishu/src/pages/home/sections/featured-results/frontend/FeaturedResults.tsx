// FILE: artifacts/ishu/src/pages/home/sections/featured-results/frontend/FeaturedResults.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useListResults, categoryColors, getStatusStyle } from "../backend/api";
import styles from "./featured-results.module.css";




export function FeaturedResults() {
  const { data, isLoading } = useListResults({ limit: 6 });
  const results = data?.results ?? [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionLabel}>
              <Icons.Trophy className="w-[14px] h-[14px]" />
              Latest Updates
            </div>
            <h2 className={styles.sectionTitle}>Government Results & Vacancies</h2>
            <p className={styles.sectionDesc}>
              Stay updated with the most recent exam results, answer keys and new job openings across India.
            </p>
          </div>
          <Link href="/results" className={styles.viewAll}>
            View All Results <Icons.ArrowRight className="w-[14px] h-[14px]" />
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
                          <Icons.Calendar className={`w-[11px] h-[11px] ${styles.metaIconBlue}`} />
                          {new Date(result.lastDate).toLocaleDateString("en-IN")}
                        </span>
                      )}
                      {result.totalPosts && (
                        <span className={styles.metaItem}>
                          <Icons.Users className={`w-[11px] h-[11px] ${styles.metaIconOrange}`} />
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
