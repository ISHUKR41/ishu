import { motion } from "framer-motion";
import styles from "./about-hero.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.orb} />
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.logo}>
            <span className={styles.logoLetter}>I</span>
          </div>
          <h1 className={styles.title}>
            About <span className={styles.titleAccent}>Ishu</span>
          </h1>
          <p className={styles.subtitle}>
            Education, government results, tools, and news in one platform for students and aspirants across India.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
