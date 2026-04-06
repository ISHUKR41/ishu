import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "SSC CGL 2024 Qualifier",
    location: "Patna, Bihar",
    content: "Ishu has been my daily companion for the last year. The PDF tools are incredibly fast, and I get all my exam updates in one place. Best platform for Indian students!",
    rating: 5,
    avatar: "RS",
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Engineering Student, IIT Kharagpur",
    location: "Ahmedabad, Gujarat",
    content: "The news section is fantastic. I love how it's categorized and I can read it in Gujarati too. The interface is much cleaner than any other government job portal.",
    rating: 5,
    avatar: "PP",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "IBPS PO Selected 2024",
    location: "Kanpur, UP",
    content: "I used to check 5 different websites every day for IBPS updates. Now I just check Ishu. The notification feature is a lifesaver. Highly recommended!",
    rating: 5,
    avatar: "AK",
    color: "#10b981",
  },
  {
    id: 4,
    name: "Divya Menon",
    role: "UPSC CSE Aspirant",
    location: "Thiruvananthapuram, Kerala",
    content: "The study resources section alone is worth bookmarking Ishu. I found all my UPSC previous papers and even a brilliant mock test series. Absolutely free — unbelievable!",
    rating: 5,
    avatar: "DM",
    color: "#f97316",
  },
  {
    id: 5,
    name: "Sandeep Yadav",
    role: "RRB NTPC Selected 2024",
    location: "Jaipur, Rajasthan",
    content: "Railway result updates on Ishu came before even official websites updated. I got my result first on Ishu. The PDF merge tool also saved hours before my interview.",
    rating: 5,
    avatar: "SY",
    color: "#14b8a6",
  },
  {
    id: 6,
    name: "Ananya Singh",
    role: "NEET UG 2025 Aspirant",
    location: "Bhopal, MP",
    content: "I found the NEET Biology NCERT notes and chemistry formula charts right here. Downloaded both, and they've been incredibly useful for my revision. 10/10 platform!",
    rating: 5,
    avatar: "AS",
    color: "#ec4899",
  },
];

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
