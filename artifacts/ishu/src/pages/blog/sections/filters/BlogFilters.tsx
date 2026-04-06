import { Search } from "lucide-react";
import { useListBlogCategories } from "@workspace/api-client-react";
import styles from "./BlogFilters.module.css";

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
  const { data: catData } = useListBlogCategories();
  const categories = Array.isArray(catData) ? catData : [];

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
          <button
            onClick={() => onCategory("")}
            className={`${styles.tab} ${category === "" ? styles.tabActive : ""}`}
            aria-pressed={category === ""}
          >
            All Posts
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
