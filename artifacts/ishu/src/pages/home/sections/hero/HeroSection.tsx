import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Wrench, FileText, Zap } from "lucide-react";
import { useGetResultStats, useListTools } from "@workspace/api-client-react";
import styles from "./hero.module.css";

const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing },
  },
};

export function HeroSection() {
  const { data: resultStats } = useGetResultStats();
  const { data: toolsData } = useListTools();

  const totalResults = resultStats
    ? resultStats.totalActive + resultStats.totalUpcoming + resultStats.totalExpired
    : null;
  const totalTools = Array.isArray(toolsData) ? toolsData.length : null;
  const toolsLine = totalTools ? `${totalTools}+ free PDF & AI tools` : "free PDF & AI tools";

  return (
    <section className={styles.heroSection}>
      <div className={styles.gridBackground} />
      <div className={styles.glowPrimary} />
      <div className={styles.glowSecondary} />
      <div className={styles.glowAccent} />

      <div className={styles.content}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.pulseDot} />
            Education & Government Jobs Platform
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.headline}>
            Your Gateway to a{" "}
            <span className={styles.gradientText}>Brighter Future</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.subheadline}>
            Government exam results, {toolsLine},
            breaking education news, and expert career guidance -
            all in one place for students across India.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <Link href="/results" className={styles.ctaPrimary}>
              Browse Latest Results
              <ArrowRight size={18} />
            </Link>
            <Link href="/tools" className={styles.ctaSecondary}>
              Explore PDF Tools
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.trustBadges}>
            <span className={styles.trustItem}>
              <CheckCircle className={styles.trustIcon} />
              100% Free
            </span>
            {totalResults && (
              <span className={styles.trustItem}>
                <FileText className={styles.trustIcon} />
                {totalResults}+ Exams Tracked
              </span>
            )}
            {totalTools && (
              <span className={styles.trustItem}>
                <Wrench className={styles.trustIcon} />
                {totalTools}+ PDF & AI Tools
              </span>
            )}
            <span className={styles.trustItem}>
              <Zap className={styles.trustIcon} />
              Updated Daily
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
