// FILE: artifacts/ishu/src/pages/about/sections/team/AboutTeam.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, Phone, Mail } from "lucide-react";
import { useTeamProfile } from "./backend/useTeamProfile";
import styles from "./about-team.module.css";

export function AboutTeam() {
  const { team: TEAM, isLoading, isError } = useTeamProfile();

  const showStatusState = isLoading || isError || TEAM.length === 0;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.sectionLabel}>The People</p>
          <h2 className={styles.title}>Meet the Team</h2>
          <div className={styles.divider} />
        </motion.div>

        <div className={styles.grid}>
          {showStatusState ? (
            <motion.div
              className={styles.statusCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {isLoading
                ? "Loading real team data..."
                : isError
                ? "Team data is temporarily unavailable. Please try again shortly."
                : "No team members are available yet."}
            </motion.div>
          ) : (
            TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.avatar}>{member.name.charAt(0)}</div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Heart size={36} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Made with ❤️ in India</h2>
          <p className={styles.ctaDesc}>
            Have questions or want to partner with us? We'd love to hear from you.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.btnPrimary}>
              Contact Us
            </Link>
            <a href="tel:+918986985813" className={styles.btnOutline}>
              <Phone size={14} />
              +91 8986985813
            </a>
            <a href="mailto:ishukryk@gmail.com" className={styles.btnOutline}>
              <Mail size={14} />
              ishukryk@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
