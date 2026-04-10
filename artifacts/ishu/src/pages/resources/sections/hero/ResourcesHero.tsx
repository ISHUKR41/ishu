// FILE: artifacts/ishu/src/pages/resources/sections/hero/ResourcesHero.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Search, BookMarked } from "lucide-react";
import styles from "./resources-hero.module.css";

interface ResourcesHeroProps {
  search: string;
  onSearch: (val: string) => void;
}

export function ResourcesHero({ search, onSearch }: ResourcesHeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.sectionLabel}>
            <BookMarked size={14} />
            Free Resources
          </div>
          <h1 className={styles.title}>
            Your Complete <span className={styles.gradientText}>Study Hub</span>
          </h1>
          <p className={styles.desc}>
            Free study materials, previous year papers, mock tests, syllabi, and guides for every government exam in India. All in one place.
          </p>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search resources, exams, topics..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
