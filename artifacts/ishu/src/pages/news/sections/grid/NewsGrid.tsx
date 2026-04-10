// FILE: artifacts/ishu/src/pages/news/sections/grid/NewsGrid.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListNews } from "@workspace/api-client-react";
import { Clock, TrendingUp, ChevronRight, Newspaper } from "lucide-react";
import styles from "./news-grid.module.css";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return h <= 0 ? "Just now" : `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "1 day ago" : `${d} days ago`;
}

interface NewsGridProps {
  search: string;
  category: string;
  page: number;
  onPageChange: (p: number) => void;
}

export function NewsGrid({ search, category, page, onPageChange }: NewsGridProps) {
  const { data, isLoading } = useListNews({
    search: search || undefined,
    category: category || undefined,
    page,
    limit: 12,
  });

  const articles = (data as any)?.articles ?? (data as any)?.news ?? [];
  const totalPages = (data as any)?.totalPages ?? 1;

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

  if (articles.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty}>
            <Newspaper size={40} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No news found</p>
            <p className={styles.emptyDesc}>Try a different search or category.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {articles.map((article: any, i: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/news/${article.id}`} className={styles.card}>
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} className={styles.img} loading="lazy" />
                ) : (
                  <div className={styles.imgPlaceholder}>
                    <Newspaper size={32} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    {article.category && (
                      <span className={styles.category}>{article.category.replace("-", " ")}</span>
                    )}
                    {article.createdAt && (
                      <span className={styles.time}>
                        <Clock size={11} />
                        {timeAgo(article.createdAt)}
                      </span>
                    )}
                  </div>
                  <h2 className={styles.title}>{article.title}</h2>
                  {article.shortDescription && (
                    <p className={styles.excerpt}>{article.shortDescription}</p>
                  )}
                  <div className={styles.footer}>
                    {article.isTrending && (
                      <span className={styles.trending}>
                        <TrendingUp size={12} />
                        Trending
                      </span>
                    )}
                    <span className={styles.readMore}>
                      Read more <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
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
            <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
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
