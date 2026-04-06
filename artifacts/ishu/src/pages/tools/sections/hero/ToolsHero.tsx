import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import styles from "./ToolsHero.module.css";

export function ToolsHero() {
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
            <Zap size={12} />
            100+ Free Online Tools
          </div>
          <h1 className={styles.title}>
            Powerful <span className={styles.titleAccent}>PDF & AI Tools</span>
          </h1>
          <p className={styles.subtitle}>
            Merge, convert, compress, edit PDFs. AI-powered tools for students and professionals. Free forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
