import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useListBlogs } from "@workspace/api-client-react";
import styles from "./blog-preview.module.css";

export function BlogPreview() {
  const { data, isLoading } = useListBlogs({ limit: 3 });
  const blogs = data?.posts || [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div>
            <div className={styles.sectionLabel}>
              <BookOpen size={14} />
              Expert Insights
            </div>
            <h2 className={styles.sectionTitle}>Latest from our Blog</h2>
            <p className={styles.sectionDesc}>
              Study tips, career advice, and expert guidance from toppers and subject matter experts.
            </p>
          </div>
          <Link href="/blog" className={styles.viewAll}>
            Read All Posts <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/blog/${blog.slug}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {blog.imageUrl ? (
                      <img src={blog.imageUrl} alt={blog.title} className={styles.image} />
                    ) : (
                      <div className={styles.imagePlaceholder}>Blog</div>
                    )}
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryBadge}>{blog.category}</span>
                    <span className={styles.metaItem}>
                      <Calendar size={11} />
                      {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <span className={styles.metaItem}>
                      <User size={11} />
                      {blog.author}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{blog.title}</h3>
                  <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                  <span className={styles.readMore}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>No blog posts yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
