// FILE: artifacts/ishu/src/pages/blog/sections/grid/BlogGrid.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListBlogs } from "@workspace/api-client-react";
import { Clock, User, BookOpen, ChevronRight } from "lucide-react";
import styles from "./blog-grid.module.css";

interface BlogGridProps {
  search: string;
  category: string;
  page: number;
  onPageChange: (p: number) => void;
}

export function BlogGrid({ search, category, page, onPageChange }: BlogGridProps) {
  const { data, isLoading } = useListBlogs({
    search: search || undefined,
    category: category || undefined,
    page,
    limit: 12,
  });

  const blogs = (data as any)?.blogs ?? (data as any)?.posts ?? [];
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

  if (blogs.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty}>
            <BookOpen size={40} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No articles found</p>
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
          {blogs.map((blog: any, i: number) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${blog.slug}`} className={styles.card}>
                {blog.imageUrl ? (
                  <img src={blog.imageUrl} alt={blog.title} className={styles.img} loading="lazy" />
                ) : (
                  <div className={styles.imgPlaceholder}>
                    <BookOpen size={28} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.chips}>
                    {blog.isFeatured && (
                      <span className={`${styles.chip} ${styles.chipFeatured}`}>Featured</span>
                    )}
                    {blog.category && (
                      <span className={`${styles.chip} ${styles.chipCategory}`}>
                        {blog.category.replace("-", " ")}
                      </span>
                    )}
                  </div>
                  <h2 className={styles.title}>{blog.title}</h2>
                  {blog.excerpt && <p className={styles.excerpt}>{blog.excerpt}</p>}
                  <div className={styles.footer}>
                    <div className={styles.footerLeft}>
                      {(blog.author || blog.authorName) && (
                        <span className={styles.metaItem}>
                          <User size={11} />
                          {blog.author ?? blog.authorName}
                        </span>
                      )}
                      {blog.readTime && (
                        <span className={styles.metaItem}>
                          <Clock size={11} />
                          {blog.readTime} min
                        </span>
                      )}
                    </div>
                    <ChevronRight size={14} className={styles.arrow} />
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
