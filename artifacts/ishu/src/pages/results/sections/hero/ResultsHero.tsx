import { motion } from "framer-motion";
import { CheckCircle, Zap, RefreshCw } from "lucide-react";
import styles from "./ResultsHero.module.css";

export function ResultsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Government Exam Results
          </div>
          <h1 className={styles.title}>
            Find Your <span className={styles.titleAccent}>Exam Result</span>
          </h1>
          <p className={styles.subtitle}>
            Latest results, admit cards, and notifications for UPSC, SSC, Railway, Banking, and 500+ government exams — updated daily.
          </p>
          <div className={styles.trustRow}>
            <span className={styles.trustItem}>
              <CheckCircle className={styles.trustIcon} size={13} />
              Official sources only
            </span>
            <span className={styles.trustItem}>
              <RefreshCw className={styles.trustIcon} size={13} />
              Updated daily
            </span>
            <span className={styles.trustItem}>
              <Zap className={styles.trustIcon} size={13} />
              500+ exams covered
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
