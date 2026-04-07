import { motion } from "framer-motion";
import { useGetResultStats, useListTools, useListNews, useListBlogs } from "@workspace/api-client-react";
import styles from "./about-stats.module.css";

export function AboutStats() {
  const { data: resultStats } = useGetResultStats();
  const { data: toolsData } = useListTools();
  const { data: newsData } = useListNews({ limit: 1 });
  const { data: blogsData } = useListBlogs({ limit: 1 });

  const totalResults = resultStats
    ? resultStats.totalActive + resultStats.totalUpcoming + resultStats.totalExpired
    : null;
  const toolCount = Array.isArray(toolsData) ? toolsData.length : null;
  const newsTotal = (newsData as any)?.total ?? null;
  const blogsTotal = (blogsData as any)?.total ?? null;

  const STATS = [
    { value: toolCount ? `${toolCount}+` : "46+", label: "Free PDF & AI Tools" },
    { value: totalResults ? `${totalResults}+` : "20+", label: "Exam Results Tracked" },
    { value: newsTotal ? `${newsTotal}+` : "12+", label: "News Articles" },
    { value: blogsTotal ? `${blogsTotal}+` : "6+", label: "Blog Posts" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
