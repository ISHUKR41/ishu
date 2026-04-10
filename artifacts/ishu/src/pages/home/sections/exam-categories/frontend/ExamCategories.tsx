// FILE: artifacts/ishu/src/pages/home/sections/exam-categories/frontend/ExamCategories.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { type ComponentType } from "react";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useListResultCategories } from "@workspace/api-client-react";
import styles from "./exam-categories.module.css";

const CATEGORY_META: Record<string, { icon: ComponentType<{ className?: string; style?: any }>; color: string; bg: string }> = {
  "upsc-civil-services": { icon: Icons.Building, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  "ssc-cgl": { icon: Icons.Trophy, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  "ssc-chsl": { icon: Icons.Trophy, color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  "banking-ibps": { icon: Icons.Building, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  "railway-rrb": { icon: Icons.Rocket, color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  "army-defence": { icon: Icons.Shield, color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  "jee-mains": { icon: Icons.Graduation, color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  "neet-ug": { icon: Icons.Academic, color: "#14b8a6", bg: "rgba(20,184,166,0.12)" },
  "state-psc": { icon: Icons.Building, color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  "police": { icon: Icons.Shield, color: "#dc2626", bg: "rgba(220,38,38,0.12)" },
  "teaching-tet": { icon: Icons.Users, color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  "engineering-jobs": { icon: Icons.Building, color: "#84cc16", bg: "rgba(132,204,22,0.12)" },
};

const DEFAULT_META = { icon: Icons.Layers, color: "#6366f1", bg: "rgba(99,102,241,0.12)" };

export function ExamCategories() {
  const { data, isLoading } = useListResultCategories();
  const categories = Array.isArray(data) ? data : [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <Icons.BookOpen className="w-[13px] h-[13px]" />
            Browse by Category
          </div>
          <h2 className={styles.sectionTitle}>Popular Exam Categories</h2>
          <p className={styles.sectionDesc}>
            Jump straight to the exam you are preparing for. Results, resources, news and tools — all in one place.
          </p>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))
          ) : categories.length > 0 ? (
            categories.map((cat, index) => {
              const meta = CATEGORY_META[cat.slug] ?? DEFAULT_META;
              const IconCmp = meta.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link href={`/results?category=${cat.slug}`} className={styles.card}>
                    <div className={styles.iconWrap} style={{ background: meta.bg }}>
                      <IconCmp className="w-[22px] h-[22px]" style={{ color: meta.color }} />
                    </div>
                    <div className={styles.cardText}>
                      <h3 className={styles.cardLabel}>{cat.name}</h3>
                      <span className={styles.cardCount}>
                        {cat.count > 0 ? `${cat.count} listing${cat.count !== 1 ? "s" : ""}` : "View Results"}
                      </span>
                    </div>
                    <div className={styles.arrow} style={{ color: meta.color }}>›</div>
                  </Link>
                </motion.div>
              );
            })
          ) : null}
        </div>
      </div>
    </section>
  );
}
