import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Bell, Calendar, MapPin } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import styles from "./StateComingSoon.module.css";

interface StateComingSoonProps {
  stateName: string;
  stateCode: string;
  description?: string;
}

export function StateComingSoon({ stateName, stateCode, description }: StateComingSoonProps) {
  const defaultDescription = `Get the latest ${stateName} government exam results, vacancy notifications, admit cards, and answer keys. Stay updated with ${stateName} PSC, Police, Teaching, and other state-level competitive exams.`;

  return (
    <>
      <PageMeta
        title={`${stateName} Government Exam Results & Notifications - Coming Soon | Ishu`}
        description={description || defaultDescription}
        keywords={`${stateName} results, ${stateName} PSC, ${stateName} government jobs, ${stateName} exam notifications, ${stateCode} results`}
        canonical={`https://ishu.in/results/states/${stateCode.toLowerCase()}`}
      />

      <div className={styles.page}>
        <div className={styles.gridBackground} />
        <div className={styles.glowPrimary} />
        <div className={styles.glowSecondary} />

        <div className="container mx-auto px-4 md:px-6 py-12">
          <Link href="/results" className={styles.backButton}>
            <ArrowLeft size={16} />
            Back to All Results
          </Link>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className={styles.iconWrapper}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <MapPin className={styles.icon} />
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {stateName}
              <span className={styles.badge}>Coming Soon</span>
            </motion.h1>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description || defaultDescription}
            </motion.p>

            <motion.div
              className={styles.features}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className={styles.featureItem}>
                <Calendar size={20} />
                <span>Real-time Updates</span>
              </div>
              <div className={styles.featureItem}>
                <Bell size={20} />
                <span>WhatsApp Notifications</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.notificationSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className={styles.notificationTitle}>
                Get Notified When We Launch
              </h2>
              <p className={styles.notificationDesc}>
                Subscribe to receive instant WhatsApp notifications when we start covering {stateName} exam results and notifications.
              </p>

              <div className={styles.ctaGroup}>
                <Button size="lg" className={styles.ctaPrimary}>
                  <Bell size={18} />
                  Subscribe for Updates
                </Button>
                <Link href="/results">
                  <Button variant="outline" size="lg">
                    Browse Central Results
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={styles.quickLinks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className={styles.quickLinksTitle}>Explore Other Sections</h3>
              <div className={styles.links}>
                <Link href="/results" className={styles.link}>Central Results</Link>
                <Link href="/tools" className={styles.link}>PDF Tools</Link>
                <Link href="/news" className={styles.link}>Latest News</Link>
                <Link href="/blog" className={styles.link}>Study Tips</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
