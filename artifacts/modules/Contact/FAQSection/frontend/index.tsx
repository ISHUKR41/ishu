// @ts-nocheck
// ============================================================================
// FILE: Contact/FAQSection/frontend/index.tsx
// PURPOSE: FAQ section with animated accordion for common contact questions.
//          Uses real FAQ data from _shared/constants.ts.
// TECH: React, GSAP (via FAQItem), CSS Modules
// ISOLATION: ONLY renders the FAQ section. No cross-dependencies.
// ============================================================================

import { CONTACT_FAQS } from "../../_shared/constants";
import FAQItem from "./FAQItem";
import styles from "./styles.module.css";

/**
 * FAQSection renders a list of frequently asked questions with
 * expandable/collapsible answers. All FAQ data is real, sourced from
 * the _shared/constants.ts file.
 */
export default function FAQSection() {
  return (
    <section className={styles.section} aria-label="Frequently asked questions">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {CONTACT_FAQS.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
