import { motion } from "framer-motion";
import { Shield, Clock } from "lucide-react";
import styles from "./privacy-hero.module.css";

export function PrivacyHero() {
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
            <Shield size={12} />
            Legal
          </div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.desc}>
            We are committed to protecting your personal data. This policy explains what we collect,
            why we collect it, and how we use it.
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
