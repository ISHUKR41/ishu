import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useGetAdminStats, useGetResultStats } from "@workspace/api-client-react";
import styles from "./stats.module.css";

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data: adminStats } = useGetAdminStats();
  const { data: resultStats } = useGetResultStats();

  const totalVacancies = resultStats
    ? (resultStats.totalActive + resultStats.totalUpcoming) * 850
    : 50000;

  const stats = [
    {
      label: "Active Vacancies",
      value: Math.max(totalVacancies, 50000),
      suffix: "+",
    },
    {
      label: "Free PDF Tools",
      value: 100,
      suffix: "+",
    },
    {
      label: "News Published",
      value: adminStats ? Math.max(adminStats.totalNews, 1000) : 1000,
      suffix: "+",
    },
    {
      label: "Students Helped",
      value: adminStats ? Math.max(adminStats.totalUsers * 50, 500) : 500,
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
