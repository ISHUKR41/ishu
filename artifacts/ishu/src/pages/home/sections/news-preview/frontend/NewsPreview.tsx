// FILE: artifacts/ishu/src/pages/home/sections/news-preview/frontend/NewsPreview.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Eye, Newspaper } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useListNews } from "@workspace/api-client-react";
import styles from "./news-preview.module.css";

export function NewsPreview() {
  const { data, isLoading } = useListNews({ limit: 3 });
  const news = data?.articles || [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div>
            <div className={styles.sectionLabel}>
              <Newspaper size={14} />
              Breaking News
            </div>
            <h2 className={styles.sectionTitle}>Latest Educational News</h2>
            <p className={styles.sectionDesc}>
              Real-time updates on exams, education policies, and career opportunities across India.
            </p>
          </div>
          <Link href="/news" className={styles.viewAll}>
            All News <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/news/${article.id}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.title} className={styles.image} />
                    ) : (
                      <div className={styles.imagePlaceholder}>Ishu News</div>
                    )}
                    <span className={styles.categoryBadge}>{article.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardDesc}>{article.shortDescription}</p>
                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <Clock size={11} />
                        {new Date(article.createdAt).toLocaleDateString("en-IN")}
                      </span>
                      <span className={styles.metaItem}>
                        <Eye size={11} />
                        {article.viewCount} views
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>No news articles yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
