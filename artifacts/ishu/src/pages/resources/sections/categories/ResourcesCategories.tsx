import { useQuery } from "@tanstack/react-query";
import styles from "./resources-categories.module.css";

interface Category {
  id: string;
  label: string;
  count: number;
}

const fallbackCategories: Category[] = [
  { id: "all", label: "All Resources", count: 0 },
  { id: "previous-papers", label: "Previous Papers", count: 0 },
  { id: "syllabus", label: "Syllabus & Pattern", count: 0 },
  { id: "mock-tests", label: "Mock Tests", count: 0 },
  { id: "study-notes", label: "Study Notes", count: 0 },
  { id: "books", label: "Best Books", count: 0 },
  { id: "video-lectures", label: "Video Lectures", count: 0 },
  { id: "current-affairs", label: "Current Affairs", count: 0 },
];

interface ResourcesCategoriesProps {
  active: string;
  onSelect: (id: string) => void;
}

export function ResourcesCategories({ active, onSelect }: ResourcesCategoriesProps) {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["resources-categories"],
    queryFn: async () => {
      const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const res = await fetch(`${baseUrl}/api/resources/categories`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  const cats = categories ?? fallbackCategories;

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.tabs} role="tablist" aria-label="Resource categories">
          {cats.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`${styles.tab} ${active === cat.id ? styles.tabActive : ""}`}
              onClick={() => onSelect(cat.id)}
            >
              {cat.label}
              {cat.count > 0 && (
                <span className={styles.count}>{cat.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
