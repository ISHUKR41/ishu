import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListResults } from "@workspace/api-client-react";
import { Calendar, MapPin, Users, ChevronRight, FileText } from "lucide-react";
import styles from "./results-grid.module.css";

const STATUS_CLASS: Record<string, string> = {
  active: styles.badgeActive,
  upcoming: styles.badgeUpcoming,
  expired: styles.badgeExpired,
  coming_soon: styles.badgeSoon,
};

interface ResultsGridProps {
  search: string;
  category: string;
  status: string;
  page: number;
  onPageChange: (p: number) => void;
}

export function ResultsGrid({
  search,
  category,
  status,
  page,
  onPageChange,
}: ResultsGridProps) {
  const { data, isLoading } = useListResults({
    category: category || undefined,
    status: (status || undefined) as any,
    page,
    limit: 12,
  });

  const results = data?.results ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty}>
            <FileText size={40} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No results found</p>
            <p className={styles.emptyDesc}>Try different filters or search terms.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.meta}>
          Showing {results.length} of {total} results
        </p>
        <div className={styles.grid}>
          {results.map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/results/${result.id}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={`${styles.badge} ${STATUS_CLASS[result.status] ?? styles.badgeActive}`}>
                    {result.status.replace("_", " ")}
                  </span>
                  {result.totalPosts != null && (
                    <span className={styles.posts}>
                      <Users size={11} />
                      {result.totalPosts.toLocaleString()} Posts
                    </span>
                  )}
                </div>
                <h2 className={styles.title}>{result.title}</h2>
                {result.shortDescription && (
                  <p className={styles.desc}>{result.shortDescription}</p>
                )}
                <div className={styles.meta}>
                  {result.lastDate && (
                    <div className={styles.metaItem}>
                      <Calendar size={12} className={styles.metaIcon} style={{ color: "#fb923c" }} />
                      Last Date:&nbsp;
                      <span className={styles.metaValue}>
                        {new Date(result.lastDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                  {result.state && (
                    <div className={styles.metaItem}>
                      <MapPin size={12} className={styles.metaIcon} style={{ color: "#60a5fa" }} />
                      <span className={styles.metaValue}>{result.state}</span>
                    </div>
                  )}
                </div>
                <ChevronRight size={15} className={styles.arrow} />
              </Link>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
