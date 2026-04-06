import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import styles from "./terms-hero.module.css";

export function TermsHero() {
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
            <FileText size={12} />
            Legal
          </div>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.desc}>
            By using Ishu, you agree to these terms. Please read them carefully before using our platform.
          </p>
          <div className={styles.meta}>
            <Clock size={13} />
            Last updated: April 6, 2025
          </div>
        </motion.div>
      </div>
    </section>
  );
}
