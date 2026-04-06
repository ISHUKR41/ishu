import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import styles from "./NewsHero.module.css";

export function NewsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.orb} />
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.badge}>
            <Newspaper size={12} />
            Education News
          </div>
          <h1 className={styles.title}>
            Stay <span className={styles.titleAccent}>Ahead</span> of the Curve
          </h1>
          <p className={styles.subtitle}>
            Latest news on education, government jobs, entrance exams, scholarships, and results — curated for Indian students.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
