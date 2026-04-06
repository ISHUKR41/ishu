import { motion } from "framer-motion";
import { Star, Download, ExternalLink, Flame } from "lucide-react";
import styles from "./featured-resources.module.css";

const featuredItems = [
  {
    id: 1,
    title: "UPSC CSE Prelims Papers 2013–2024",
    exam: "UPSC CSE",
    downloads: "182K",
    type: "Previous Papers",
    url: "https://upsc.gov.in/examinations/previous-question-papers",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    id: 11,
    title: "Current Affairs Monthly – March 2025",
    exam: "All Exams",
    downloads: "201K",
    type: "Current Affairs",
    url: "https://pib.gov.in/",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    id: 5,
    title: "NEET UG Biology NCERT Notes",
    exam: "NEET UG",
    downloads: "211K",
    type: "Study Notes",
    url: "https://ncert.nic.in/textbook.php",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.12)",
  },
  {
    id: 38,
    title: "Current Affairs 2024 Annual Yearbook",
    exam: "All Exams",
    downloads: "198K",
    type: "Current Affairs",
    url: "https://pib.gov.in/",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    id: 33,
    title: "UPSC Prelims GS1 Mock Tests – 40 Sets",
    exam: "UPSC CSE",
    downloads: "93K",
    type: "Mock Tests",
    url: "https://upsc.gov.in/",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    id: 2,
    title: "SSC CGL Syllabus & Pattern 2024–25",
    exam: "SSC CGL",
    downloads: "94K",
    type: "Syllabus",
    url: "https://ssc.gov.in/Examination/Syllabus",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
  },
];

export function FeaturedResources() {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.label}>
            <Flame size={14} />
            Most Popular
          </div>
          <h2 className={styles.title}>Featured Resources</h2>
          <p className={styles.desc}>
            The most downloaded and highest-rated study materials across all exams.
          </p>
        </div>
        <div className={styles.grid}>
          {featuredItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-label={`Open ${item.title}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconDot} style={{ background: item.bg }}>
                  <Star size={14} style={{ color: item.color }} />
                </div>
                <div className={styles.info}>
                  <span className={styles.typeBadge} style={{ color: item.color, background: item.bg }}>
                    {item.type}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.examTag}>{item.exam}</span>
                </div>
                <div className={styles.actionArea}>
                  <span className={styles.dlCount}>
                    <Download size={11} />
                    {item.downloads}
                  </span>
                  <ExternalLink size={14} className={styles.extIcon} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
