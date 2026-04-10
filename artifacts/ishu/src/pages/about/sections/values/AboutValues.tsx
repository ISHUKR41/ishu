// FILE: artifacts/ishu/src/pages/about/sections/values/AboutValues.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Target, Users, Zap, Shield } from "lucide-react";
import styles from "./about-values.module.css";

const VALUES = [
  {
    icon: Target,
    title: "Mission",
    description:
      "Democratize access to education resources and government exam information for every Indian student.",
    iconColor: "#60a5fa",
    iconBg: "rgba(59,130,246,0.15)",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a strong community of 10 million+ students, job seekers, and educators.",
    iconColor: "#4ade80",
    iconBg: "rgba(34,197,94,0.15)",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Continuously building new tools and features to help students excel in their goals.",
    iconColor: "#fbbf24",
    iconBg: "rgba(234,179,8,0.15)",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "Committed to providing accurate, verified information from official government sources.",
    iconColor: "#c084fc",
    iconBg: "rgba(139,92,246,0.15)",
  },
];

export function AboutValues() {
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
          <p className={styles.sectionLabel}>Who We Are</p>
          <h2 className={styles.title}>Our Story</h2>
          <div className={styles.divider} />
        </motion.div>

        <motion.div
          className={styles.storyBox}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className={styles.storyText}>
            Ishu was founded with a simple yet powerful vision: to make quality education resources and government job information accessible to every student in India, regardless of their background or location.
          </p>
          <p className={styles.storyText}>
            We noticed that millions of students across India were struggling to find reliable information about government exams, results, and admit cards. They were spending hours browsing multiple websites, often encountering outdated or incorrect information. Ishu was built to solve this problem.
          </p>
          <p className={styles.storyText}>
            Today, Ishu serves over 10 million students with up-to-date exam results, 100+ free tools, expert career guidance, and breaking education news — all in one platform.
          </p>
        </motion.div>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.sectionLabel}>What Drives Us</p>
          <h2 className={styles.title}>Our Values</h2>
          <div className={styles.divider} />
        </motion.div>

        <div className={styles.valuesGrid}>
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={styles.iconBox}
                style={{ background: value.iconBg }}
              >
                <value.icon size={22} style={{ color: value.iconColor }} />
              </div>
              <div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
