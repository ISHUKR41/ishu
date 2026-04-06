import styles from "./resources-categories.module.css";

const categories = [
  { id: "all", label: "All Resources" },
  { id: "previous-papers", label: "Previous Papers" },
  { id: "syllabus", label: "Syllabus & Pattern" },
  { id: "mock-tests", label: "Mock Tests" },
  { id: "study-notes", label: "Study Notes" },
  { id: "books", label: "Best Books" },
  { id: "video-lectures", label: "Video Lectures" },
  { id: "current-affairs", label: "Current Affairs" },
];

interface ResourcesCategoriesProps {
  active: string;
  onSelect: (id: string) => void;
}

export function ResourcesCategories({ active, onSelect }: ResourcesCategoriesProps) {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${active === cat.id ? styles.tabActive : ""}`}
              onClick={() => onSelect(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
