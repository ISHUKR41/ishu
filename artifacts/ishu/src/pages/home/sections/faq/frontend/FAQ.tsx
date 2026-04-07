import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { useFaqItems } from "./backend/useFaqItems";
import styles from "./faq.module.css";

export function FAQ() {
  const faqs = useFaqItems();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <HelpCircle size={13} />
            FAQ
          </div>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDesc}>
            Everything you need to know about Ishu and our platform.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.plusIcon}
                >
                  <Plus size={18} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={styles.answerWrapper}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
