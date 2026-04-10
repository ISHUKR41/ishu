// FILE: artifacts/ishu/src/pages/tools/sections/filters/ToolsFilters.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { Search } from "lucide-react";
import { useToolFilterCategories } from "./backend/api";
import styles from "./ToolsFilters.module.css";

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
  const { categories } = useToolFilterCategories();

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
          {categories.map((c) => (
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
