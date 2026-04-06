import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import styles from "./faq.module.css";

const faqs = [
  {
    id: 1,
    question: "Is Ishu completely free to use?",
    answer: "Yes, Ishu is 100% free for all students. You can access exam results, use our 100+ PDF tools, download study resources, and read the latest news without any subscription or payment.",
  },
  {
    id: 2,
    question: "How quickly are government exam results updated?",
    answer: "Our results are updated within minutes of official announcements. We monitor all major exam boards including UPSC, SSC, IBPS, RRB, NTA, and state PSCs around the clock to ensure you never miss an update.",
  },
  {
    id: 3,
    question: "Are the PDF tools safe for my documents?",
    answer: "Absolutely. Your files are processed securely and never stored permanently on our servers. All uploads are deleted immediately after processing. We use industry-standard encryption for all file transfers.",
  },
  {
    id: 4,
    question: "Which exams does Ishu cover?",
    answer: "Ishu covers all major central and state-level government exams including UPSC CSE/IFS, SSC CGL/CHSL/MTS, IBPS PO/Clerk/SO, RRB NTPC/Group D/JE, NDA, CDS, NEET, JEE, GATE, UGC NET, all State PCS exams, and many more.",
  },
  {
    id: 5,
    question: "Can I get notifications for specific exams?",
    answer: "Yes! You can subscribe to notifications for specific exams, boards, or categories. We will send you instant alerts for result declarations, admit card releases, new vacancies, and important date changes.",
  },
  {
    id: 6,
    question: "Are the study resources officially sourced?",
    answer: "Yes. All study materials, previous year papers, and syllabi are sourced directly from official government websites including UPSC, SSC, IBPS, RRB, NTA, NCERT, and respective state boards. We provide direct links to official sources.",
  },
  {
    id: 7,
    question: "How can I report a wrong result or missing information?",
    answer: "You can use the Contact page to report any incorrect results, outdated information, or missing content. Our team reviews and corrects issues within 24 hours. We take data accuracy very seriously.",
  },
  {
    id: 8,
    question: "Does Ishu support Hindi and other regional languages?",
    answer: "Yes! Ishu supports multiple Indian languages including Hindi. You can switch the interface language from the top navigation bar. We are continuously adding support for more regional languages including Tamil, Telugu, Bengali, and Marathi.",
  },
];

export function FAQ() {
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
