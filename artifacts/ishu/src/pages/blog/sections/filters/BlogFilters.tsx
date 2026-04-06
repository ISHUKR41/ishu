import { Search } from "lucide-react";
import styles from "./BlogFilters.module.css";

const CATEGORIES = [
  { value: "", label: "All Posts" },
  { value: "career-guidance", label: "Career Guidance" },
  { value: "exam-tips", label: "Exam Tips" },
  { value: "study-material", label: "Study Material" },
  { value: "success-stories", label: "Success Stories" },
  { value: "news-analysis", label: "News Analysis" },
];

interface BlogFiltersProps {
  search: string;
  category: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
}

export function BlogFilters({
  search,
  category,
  onSearch,
  onCategory,
}: BlogFiltersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search articles..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search blog"
          />
        </div>
        <div className={styles.tabs}>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => onCategory(c.value)}
              className={`${styles.tab} ${category === c.value ? styles.tabActive : ""}`}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
