// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactInfo/frontend/index.tsx
// PURPOSE: Contact information cards grid. Displays all methods of
//          contacting ISHU (email, phone, WhatsApp, address) using
//          real data from _shared/constants.ts.
// TECH: React, Framer Motion (stagger), CSS Modules
// ISOLATION: Renders ONLY the info cards. No cross-section dependencies.
// ============================================================================

import { motion } from "framer-motion";
import { CONTACT_INFO_CARDS } from "../../_shared/constants";
import ContactCard from "./ContactCard";
import styles from "./styles.module.css";

/**
 * ContactInfoSection renders a grid of contact method cards.
 * Each card animates in with a staggered entrance using Framer Motion.
 * All data is REAL — sourced from _shared/constants.ts.
 */
export default function ContactInfoSection() {
  return (
    <section className={styles.section} aria-label="Contact information">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>How to Reach Us</h2>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {CONTACT_INFO_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
              }}
            >
              <ContactCard
                iconName={card.iconName}
                title={card.title}
                value={card.value}
                description={card.description}
                href={card.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
