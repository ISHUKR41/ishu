import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Users, Star, Zap } from "lucide-react";
import styles from "./hero.module.css";

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
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function HeroSection() {
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
            India's #1 Education & Government Jobs Platform
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.headline}>
            Your Gateway to a{" "}
            <span className={styles.gradientText}>Brighter Future</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.subheadline}>
            Everything you need in one place — government exam results, 100+ PDF
            tools, breaking educational news, and expert career guidance for
            millions of students across India.
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
              Free to use
            </span>
            <span className={styles.trustItem}>
              <Users className={styles.trustIcon} />
              500K+ students
            </span>
            <span className={styles.trustItem}>
              <Star className={styles.trustIcon} />
              4.9 rated
            </span>
            <span className={styles.trustItem}>
              <Zap className={styles.trustIcon} />
              Daily updates
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
