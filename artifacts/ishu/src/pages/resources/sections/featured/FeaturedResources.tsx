// FILE: artifacts/ishu/src/pages/resources/sections/featured/FeaturedResources.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Star, Download, ExternalLink, Flame, Loader2 } from "lucide-react";
import { useFeaturedResources } from "./backend/useFeaturedResources";
import styles from "./featured-resources.module.css";

function formatDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${Math.round(downloads / 1000)}K`;
  }
  return String(downloads);
}

function toTypeLabel(type: string): string {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function FeaturedResources() {
  const {
    data: featuredItems = [],
    isLoading,
    isError,
  } = useFeaturedResources(6);

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.label}>
            <Flame size={14} />
            Most Popular
          </div>
          <h2 className={styles.title}>Featured Resources</h2>
          <p className={styles.desc}>
            The most downloaded and highest-rated study materials across all exams.
          </p>
        </div>
        <div className={styles.grid}>
          {isLoading && (
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", padding: "1.5rem 0" }}>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Loading featured resources...
            </div>
          )}

          {!isLoading && isError && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "hsl(var(--muted-foreground))", padding: "1.25rem 0" }}>
              Unable to load featured resources right now.
            </div>
          )}

          {!isLoading && !isError && featuredItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.downloadUrl || item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-label={`Open ${item.title}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconDot} style={{ background: item.iconBg }}>
                  <Star size={14} style={{ color: item.iconColor }} />
                </div>
                <div className={styles.info}>
                  <span className={styles.typeBadge} style={{ color: item.iconColor, background: item.iconBg }}>
                    {toTypeLabel(item.type)}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.examTag}>{item.exam}</span>
                </div>
                <div className={styles.actionArea}>
                  <span className={styles.dlCount}>
                    <Download size={11} />
                    {formatDownloads(item.downloads)}
                  </span>
                  <ExternalLink size={14} className={styles.extIcon} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
