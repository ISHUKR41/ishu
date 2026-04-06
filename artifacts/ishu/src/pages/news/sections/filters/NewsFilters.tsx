import { Search } from "lucide-react";
import styles from "./NewsFilters.module.css";

const CATEGORIES = [
  { value: "", label: "All News" },
  { value: "education", label: "Education" },
  { value: "government-jobs", label: "Govt Jobs" },
  { value: "entrance-exams", label: "Entrance Exams" },
  { value: "results", label: "Results" },
  { value: "scholarships", label: "Scholarships" },
];

interface NewsFiltersProps {
  search: string;
  category: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
}

export function NewsFilters({
  search,
  category,
  onSearch,
  onCategory,
}: NewsFiltersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search news..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search news"
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
