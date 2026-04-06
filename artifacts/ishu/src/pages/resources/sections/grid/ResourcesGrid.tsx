import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, BookOpen, Video, PenTool, Globe, FileCheck, Brain, ExternalLink, Loader2, ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import styles from "./resources-grid.module.css";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  exam: string;
  iconColor: string;
  iconBg: string;
  downloadUrl: string;
  sourceUrl: string;
  fileSize: string;
  downloads: number;
  tags: string[];
  year?: number;
}

const typeIconMap: Record<string, React.ElementType> = {
  "previous-papers": FileText,
  syllabus: FileCheck,
  "mock-tests": Brain,
  "study-notes": BookOpen,
  books: BookOpen,
  "video-lectures": Video,
  "current-affairs": Globe,
};

const typeIconDefault = PenTool;

type SortKey = "downloads" | "title" | "year";

function formatDownloads(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

interface ResourcesGridProps {
  category: string;
  search: string;
}

export function ResourcesGrid({ category, search }: ResourcesGridProps) {
  const [sort, setSort] = useState<SortKey>("downloads");

  const { data, isLoading, isError } = useQuery<{ resources: Resource[]; total: number }>({
    queryKey: ["resources", category, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "all") params.set("category", category);
      if (search) params.set("search", search);
      params.set("limit", "54");
      const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const res = await fetch(`${baseUrl}/api/resources?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const rawResources = data?.resources ?? [];

  const resources = [...rawResources].sort((a, b) => {
    if (sort === "downloads") return b.downloads - a.downloads;
    if (sort === "year") return (b.year ?? 0) - (a.year ?? 0);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "downloads", label: "Most Downloaded" },
    { value: "year", label: "Newest First" },
    { value: "title", label: "A → Z" },
  ];

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        {!isLoading && !isError && resources.length > 0 && (
          <div className={styles.topBar}>
            <p className={styles.resultCount}>
              <strong>{resources.length}</strong> resource{resources.length !== 1 ? "s" : ""}
              {search ? ` for "${search}"` : ""}
            </p>
            <div className={styles.sortRow}>
              <ArrowUpDown size={13} className={styles.sortIcon} />
              <span className={styles.sortLabel}>Sort:</span>
              <div className={styles.sortBtns}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.sortBtn} ${sort === opt.value ? styles.sortBtnActive : ""}`}
                    onClick={() => setSort(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className={styles.loadingState}>
            <Loader2 size={28} className={styles.spinner} />
            <p>Loading resources…</p>
          </div>
        ) : isError ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><FileText size={24} /></div>
            <h3 className={styles.emptyTitle}>Failed to load resources</h3>
            <p className={styles.emptyDesc}>Please try again in a moment.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${search}-${sort}`}
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {resources.length > 0 ? (
                resources.map((resource, index) => {
                  const Icon = typeIconMap[resource.type] ?? typeIconDefault;
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.35), ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <a
                        href={resource.downloadUrl}
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${resource.title}`}
                      >
                        <div className={styles.cardTop}>
                          <div
                            className={styles.iconBox}
                            style={{ background: resource.iconBg }}
                            aria-hidden="true"
                          >
                            <Icon size={22} style={{ color: resource.iconColor }} />
                          </div>
                          <div className={styles.topRight}>
                            <span className={styles.typeBadge}>
                              {resource.type.replace(/-/g, " ")}
                            </span>
                            {resource.year && (
                              <span className={styles.yearBadge}>{resource.year}</span>
                            )}
                          </div>
                        </div>

                        <h3 className={styles.cardTitle}>{resource.title}</h3>
                        <p className={styles.cardDesc}>{resource.description}</p>

                        <div className={styles.cardFooter}>
                          <div className={styles.footerLeft}>
                            <span className={styles.exam}>{resource.exam}</span>
                            {resource.fileSize && (
                              <span className={styles.fileSize}>{resource.fileSize}</span>
                            )}
                          </div>
                          <span className={styles.downloadBtn}>
                            {resource.fileSize === "Online" ? (
                              <>
                                <ExternalLink size={12} />
                                View Free
                              </>
                            ) : (
                              <>
                                <Download size={12} />
                                Download
                              </>
                            )}
                          </span>
                        </div>

                        {resource.downloads > 0 && (
                          <div className={styles.downloadsRow}>
                            <span className={styles.downloadCount}>
                              {formatDownloads(resource.downloads)}+ downloads
                            </span>
                          </div>
                        )}
                      </a>
                    </motion.div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><FileText size={24} /></div>
                  <h3 className={styles.emptyTitle}>No resources found</h3>
                  <p className={styles.emptyDesc}>
                    {search ? `No results for "${search}". Try a different search term.` : "No resources in this category yet."}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
