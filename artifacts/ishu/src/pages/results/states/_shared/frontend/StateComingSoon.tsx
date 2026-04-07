import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Bell, Calendar, MapPin } from "lucide-react";
import styles from "./StateComingSoon.module.css";

interface StateComingSoonProps {
  stateName: string;
  stateCode: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function StateComingSoon({ stateName, stateCode }: StateComingSoonProps) {
  return (
    <div className={styles.container}>
      <div className={styles.gridBackground} />
      <div className={styles.glowEffect} />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.iconWrapper}>
          <MapPin className={styles.icon} size={48} />
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.title}>
          {stateName}
        </motion.h1>

        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.pulseDot} />
          Coming Soon
        </motion.div>

        <motion.p variants={itemVariants} className={styles.description}>
          We're working hard to bring you the latest exam results, notifications, and updates for {stateName}.
          Stay tuned for comprehensive coverage of all state-level examinations and vacancies.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.features}>
          <div className={styles.feature}>
            <Calendar className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Latest Results</h3>
              <p className={styles.featureText}>Get instant updates on all state exam results</p>
            </div>
          </div>
          <div className={styles.feature}>
            <Bell className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Notifications</h3>
              <p className={styles.featureText}>Receive alerts for new vacancies and updates</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.actions}>
          <Link href="/results" className={styles.backButton}>
            <ArrowLeft size={18} />
            Back to All Results
          </Link>
          <button className={styles.notifyButton}>
            <Bell size={18} />
            Notify Me When Available
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
