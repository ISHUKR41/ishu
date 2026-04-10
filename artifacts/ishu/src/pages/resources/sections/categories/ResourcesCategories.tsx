// FILE: artifacts/ishu/src/pages/resources/sections/categories/ResourcesCategories.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useQuery } from "@tanstack/react-query";
import styles from "./resources-categories.module.css";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface ResourcesCategoriesProps {
  active: string;
  onSelect: (id: string) => void;
}

export function ResourcesCategories({ active, onSelect }: ResourcesCategoriesProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
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
    retry: 1,
  });

  const cats = categories ?? [];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className={styles.tabs} aria-label="Resource categories loading">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  height: "2rem",
                  width: "6.5rem",
                  borderRadius: "0.5rem",
                  background: "hsl(var(--muted))",
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        ) : cats.length === 0 ? (
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>
            Categories are temporarily unavailable.
          </p>
        ) : (
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
        )}
      </div>
    </section>
  );
}
