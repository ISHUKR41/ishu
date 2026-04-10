// FILE: artifacts/ishu/src/pages/blog/sections/hero/BlogHero.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import styles from "./BlogHero.module.css";

export function BlogHero() {
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
            <BookOpen size={12} />
            Expert Articles
          </div>
          <h1 className={styles.title}>
            Knowledge That <span className={styles.titleAccent}>Empowers</span>
          </h1>
          <p className={styles.subtitle}>
            Expert career guidance, exam tips, study strategies, and inspiring success stories from India's top educators.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
