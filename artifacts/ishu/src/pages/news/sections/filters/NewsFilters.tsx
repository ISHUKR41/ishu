import { Search } from "lucide-react";
import { useListNewsCategories } from "@workspace/api-client-react";
import styles from "./NewsFilters.module.css";

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
  const { data: catData } = useListNewsCategories();
  const categories = Array.isArray(catData) ? catData : [];

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
          <button
            onClick={() => onCategory("")}
            className={`${styles.tab} ${category === "" ? styles.tabActive : ""}`}
            aria-pressed={category === ""}
          >
            All News
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => onCategory(c.slug)}
              className={`${styles.tab} ${category === c.slug ? styles.tabActive : ""}`}
              aria-pressed={category === c.slug}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
