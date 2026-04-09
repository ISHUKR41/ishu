// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactInfo/frontend/ContactCard.tsx
// PURPOSE: A single reusable contact info card with Framer Motion hover
//          animation and professional Lucide React icons.
// TECH: React, Framer Motion, Lucide React
// ISOLATION: Only used within ContactInfo section.
// ============================================================================

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import styles from "./styles.module.css";

interface ContactCardProps {
  iconName: string;
  title: string;
  value: string;
  description: string;
  href: string;
}

/**
 * ContactCard renders a single contact method card.
 * It dynamically resolves the Lucide icon by name,
 * and wraps everything in a clickable <a> tag.
 */
export default function ContactCard({ iconName, title, value, description, href }: ContactCardProps) {
  // Dynamically resolve the Lucide icon component by name
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={styles.card}
      whileHover={{ scale: 1.02 }}   // Subtle scale on hover
      whileTap={{ scale: 0.98 }}     // Press-down effect on click
    >
      <div className={styles.iconWrapper}>
        <IconComponent size={24} strokeWidth={2} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardValue}>{value}</p>
      <p className={styles.cardDescription}>{description}</p>
    </motion.a>
  );
}
