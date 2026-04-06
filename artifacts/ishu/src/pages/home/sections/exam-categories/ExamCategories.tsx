import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Award, Landmark, Train, Shield, BookOpen,
  GraduationCap, Building2, Scale
} from "lucide-react";
import styles from "./exam-categories.module.css";

const categories = [
  {
    id: "upsc",
    label: "UPSC Civil Services",
    icon: Landmark,
    count: "1,000+ Resources",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    href: "/results?category=upsc",
  },
  {
    id: "ssc",
    label: "SSC Exams",
    icon: Award,
    count: "800+ Resources",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    href: "/results?category=ssc",
  },
  {
    id: "banking",
    label: "Banking & IBPS",
    icon: Building2,
    count: "600+ Resources",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    href: "/results?category=banking",
  },
  {
    id: "railway",
    label: "Railway RRB",
    icon: Train,
    count: "500+ Resources",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    href: "/results?category=railway",
  },
  {
    id: "defence",
    label: "Defence & Army",
    icon: Shield,
    count: "300+ Resources",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    href: "/results?category=defence",
  },
  {
    id: "jee",
    label: "JEE Mains & Adv",
    icon: GraduationCap,
    count: "700+ Resources",
    color: "#eab308",
    bg: "rgba(234,179,8,0.12)",
    href: "/results?category=jee",
  },
  {
    id: "neet",
    label: "NEET UG / PG",
    icon: BookOpen,
    count: "500+ Resources",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.12)",
    href: "/results?category=neet",
  },
  {
    id: "state",
    label: "State PCS Exams",
    icon: Scale,
    count: "400+ Resources",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    href: "/results?category=state",
  },
];

export function ExamCategories() {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <BookOpen size={13} />
            Browse by Category
          </div>
          <h2 className={styles.sectionTitle}>Popular Exam Categories</h2>
          <p className={styles.sectionDesc}>
            Jump straight to the exam you are preparing for. Results, resources, news and tools — all in one place.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href={cat.href} className={styles.card}>
                <div className={styles.iconWrap} style={{ background: cat.bg }}>
                  <cat.icon size={22} style={{ color: cat.color }} />
                </div>
                <div className={styles.cardText}>
                  <h3 className={styles.cardLabel}>{cat.label}</h3>
                  <span className={styles.cardCount}>{cat.count}</span>
                </div>
                <div className={styles.arrow} style={{ color: cat.color }}>›</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
