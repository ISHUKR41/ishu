import { motion } from "framer-motion";
import styles from "./about-stats.module.css";

const STATS = [
  { value: "10M+", label: "Students Helped" },
  { value: "100+", label: "Free Tools" },
  { value: "500+", label: "Exam Results" },
  { value: "50+", label: "Expert Authors" },
];

export function AboutStats() {
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
