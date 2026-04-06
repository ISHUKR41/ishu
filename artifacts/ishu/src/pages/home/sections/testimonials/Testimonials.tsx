import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "SSC CGL Aspirant",
    content: "Ishu has been my daily companion for the last year. The PDF tools are incredibly fast, and I get all my exam updates in one place. Best platform for Indian students!",
    rating: 5,
    avatar: "R",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Engineering Student",
    content: "The news section is fantastic. I love how it's categorized and I can read it in Gujarati too. The interface is much cleaner than any other government job portal.",
    rating: 5,
    avatar: "P",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Banking Aspirant",
    content: "I used to check 5 different websites every day for IBPS updates. Now I just check Ishu. The WhatsApp alerts feature is a lifesaver. Highly recommended!",
    rating: 5,
    avatar: "A",
  },
];

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <Star size={14} />
            Testimonials
          </div>
          <h2 className={styles.sectionTitle}>Trusted by Indian Students</h2>
          <p className={styles.sectionDesc}>
            See what our community has to say about their experience with Ishu.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
