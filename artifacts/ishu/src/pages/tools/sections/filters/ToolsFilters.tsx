import { Search } from "lucide-react";
import styles from "./ToolsFilters.module.css";

const CATEGORIES = [
  { value: "", label: "All Tools" },
  { value: "PDF Tools", label: "PDF Tools" },
  { value: "PDF Convert", label: "Convert" },
  { value: "PDF Edit", label: "Edit" },
  { value: "PDF Security", label: "Security" },
  { value: "Image Convert", label: "Images" },
  { value: "PDF AI", label: "AI Tools" },
];

interface ToolsFiltersProps {
  search: string;
  category: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
}

export function ToolsFilters({
  search,
  category,
  onSearch,
  onCategory,
}: ToolsFiltersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search tools..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search tools"
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
