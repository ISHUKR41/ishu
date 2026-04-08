import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../backend/api";
import styles from "./testimonials.module.css";

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <Star size={14} />
            Student Reviews
          </div>
          <h2 className={styles.sectionTitle}>Trusted by 500K+ Students</h2>
          <p className={styles.sectionDesc}>
            Real experiences from students who use Ishu every day to prepare for their dream exams.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={styles.card}
            >
              <div className={styles.stars}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className={styles.star} />
                ))}
              </div>
              <p className={styles.quote}>
                <span className={styles.quoteChar}>"</span>
                {t.content}
              </p>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: `${t.color}20`, color: t.color }}>{t.avatar}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                  <div className={styles.authorLocation}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
