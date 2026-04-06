import { Search } from "lucide-react";
import { useListResultCategories } from "@workspace/api-client-react";
import styles from "./ResultsFilters.module.css";

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "expired", label: "Expired" },
];

interface ResultsFiltersProps {
  search: string;
  category: string;
  status: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
  onStatus: (v: string) => void;
  onReset: () => void;
}

export function ResultsFilters({
  search,
  category,
  status,
  onSearch,
  onCategory,
  onStatus,
  onReset,
}: ResultsFiltersProps) {
  const { data: catData } = useListResultCategories();
  const categories = Array.isArray(catData) ? catData : [];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search exams, notifications..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search results"
            />
          </div>
          <div className={styles.selects}>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => onCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="" className="bg-background text-foreground">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-background text-foreground">
                  {c.name}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={status}
              onChange={(e) => onStatus(e.target.value)}
              aria-label="Filter by status"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value} className="bg-background text-foreground">
                  {s.label}
                </option>
              ))}
            </select>
            {(search || category || status) && (
              <button className={styles.resetBtn} onClick={onReset}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
