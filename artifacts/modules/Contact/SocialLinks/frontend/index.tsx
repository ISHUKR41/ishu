// @ts-nocheck
// ============================================================================
// FILE: Contact/SocialLinks/frontend/index.tsx
// PURPOSE: Social media links grid with animated cards.
//          Uses real ISHU social links from _shared/constants.ts.
// TECH: React, Framer Motion, Lucide React icons, CSS Modules
// ISOLATION: Only renders the social links grid.
// ============================================================================

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SOCIAL_LINKS } from "../../_shared/constants";
import styles from "./styles.module.css";

export default function SocialLinksSection() {
  return (
    <section className={styles.section} aria-label="Social media links">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>Follow Us</h2>
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = (Icons as any)[link.iconName] || Icons.Globe;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={{
                  "--brand-color": link.brandColor,
                  "--brand-bg": `${link.brandColor}15`,
                } as React.CSSProperties}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.iconCircle}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className={styles.platformName}>{link.platform}</span>
                <span className={styles.followers}>{link.followers}</span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
