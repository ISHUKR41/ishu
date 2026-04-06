import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListTools } from "@workspace/api-client-react";
import { Star, Search } from "lucide-react";
import styles from "./tools-grid.module.css";

const ICON_MAP: Record<string, string> = {
  "PDF Tools": "📄",
  "PDF Convert": "🔄",
  "PDF Edit": "✏️",
  "PDF Security": "🔒",
  "Image Convert": "🖼️",
  "PDF AI": "🤖",
};

interface ToolsGridProps {
  search: string;
  category: string;
  page: number;
  onPageChange: (p: number) => void;
}

export function ToolsGrid({ search, category, page, onPageChange }: ToolsGridProps) {
  const { data, isLoading } = useListTools({
    category: category || undefined,
  });

  // API returns a plain array of tools
  const tools: any[] = Array.isArray(data)
    ? data
    : ((data as any)?.tools ?? []);

  // Client-side search filtering (API doesn't support search param)
  const filtered = search
    ? tools.filter(
        (t) =>
          t.name?.toLowerCase().includes(search.toLowerCase()) ||
          t.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : tools;

  const pageSize = 24;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (filtered.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty}>
            <Search size={40} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No tools found</p>
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
          {paginated.map((tool: any, i: number) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/tools/${tool.slug}`} className={styles.card}>
                <div className={styles.icon}>{ICON_MAP[tool.category] ?? "🔧"}</div>
                <h2 className={styles.title}>{tool.name}</h2>
                <p className={styles.desc}>{tool.description}</p>
                <div className={styles.footer}>
                  <span className={styles.categoryBadge}>{tool.category}</span>
                  <span className={styles.usage}>
                    <Star size={11} />
                    {tool.usageCount > 0 ? `${(tool.usageCount / 1000).toFixed(1)}k` : "New"}
                  </span>
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
