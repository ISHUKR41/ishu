import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useGetResultStats, useListTools, useListNews } from "@workspace/api-client-react";
import styles from "./stats.module.css";

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data: resultStats } = useGetResultStats();
  const { data: toolsData } = useListTools();
  const { data: newsData } = useListNews({ limit: 1 });

  const totalResults = resultStats
    ? resultStats.totalActive + resultStats.totalUpcoming + resultStats.totalExpired
    : 0;

  const toolCount = Array.isArray(toolsData) ? toolsData.length : (toolsData as any)?.total ?? 0;
  const newsTotal = (newsData as any)?.total ?? 0;

  const stats = [
    {
      label: "Exam Results Covered",
      value: totalResults > 0 ? totalResults : 20,
      suffix: "+",
    },
    {
      label: "Free PDF & AI Tools",
      value: toolCount > 0 ? toolCount : 46,
      suffix: "+",
    },
    {
      label: "News Articles",
      value: newsTotal > 0 ? newsTotal : 12,
      suffix: "+",
    },
    {
      label: "Students Served",
      value: 500,
      suffix: "K+",
    },
  ];

  return (
    <section ref={ref} className={styles.statsSection}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.statItem}
            >
              <div className={styles.statValue}>
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
