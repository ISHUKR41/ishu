import { Search } from "lucide-react";
import styles from "./ResultsFilters.module.css";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "upsc", label: "UPSC" },
  { value: "ssc-cgl", label: "SSC CGL" },
  { value: "banking-ibps", label: "Banking / IBPS" },
  { value: "railway-rrb", label: "Railway RRB" },
  { value: "jee-mains", label: "JEE Mains" },
  { value: "neet-ug", label: "NEET UG" },
  { value: "police", label: "Police" },
  { value: "teaching", label: "Teaching" },
];

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
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-gray-900">
                  {c.label}
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
                <option key={s.value} value={s.value} className="bg-gray-900">
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
