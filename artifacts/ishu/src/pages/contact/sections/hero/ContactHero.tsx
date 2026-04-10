// FILE: artifacts/ishu/src/pages/contact/sections/hero/ContactHero.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import styles from "./contact-hero.module.css";

export function ContactHero() {
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
            <MessageCircle size={12} />
            We're here to help
          </div>
          <h1 className={styles.title}>
            Get in <span className={styles.titleAccent}>Touch</span>
          </h1>
          <p className={styles.subtitle}>
            Have questions? Reach out via WhatsApp, phone, or email. We respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
