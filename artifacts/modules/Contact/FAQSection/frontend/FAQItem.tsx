// @ts-nocheck
// ============================================================================
// FILE: Contact/FAQSection/frontend/FAQItem.tsx
// PURPOSE: Individual FAQ accordion item with GSAP-powered open/close.
//          Uses GSAP to smoothly animate the height of the answer panel.
// TECH: React, GSAP, Lucide React (ChevronDown icon), CSS Modules
// ISOLATION: Only used within the FAQSection.
// ============================================================================

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import styles from "./styles.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
}

/**
 * FAQItem renders a single collapsible FAQ accordion item.
 * Clicking the header toggles the answer panel open/closed
 * with a smooth GSAP height animation.
 */
export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    if (!bodyRef.current) return;

    if (isOpen) {
      // Close: animate height to 0
      gsap.to(bodyRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Open: animate height to auto (measure natural height first)
      gsap.set(bodyRef.current, { height: "auto" });
      const naturalHeight = bodyRef.current.offsetHeight;
      gsap.fromTo(
        bodyRef.current,
        { height: 0 },
        { height: naturalHeight, duration: 0.3, ease: "power2.inOut" }
      );
    }

    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles.faqItem}>
      <button className={styles.faqHeader} onClick={toggleOpen} aria-expanded={isOpen}>
        <span className={styles.faqQuestion}>{question}</span>
        <ChevronDown
          className={`${styles.faqIcon} ${isOpen ? styles.open : ""}`}
          size={20}
        />
      </button>
      <div ref={bodyRef} className={styles.faqBody}>
        <p className={styles.faqAnswer}>{answer}</p>
      </div>
    </div>
  );
}
