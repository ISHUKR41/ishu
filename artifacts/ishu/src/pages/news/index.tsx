import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListNews as useGetNews } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search, Clock, TrendingUp, ChevronRight, Newspaper } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All News" },
  { value: "education", label: "Education" },
  { value: "government-jobs", label: "Govt Jobs" },
  { value: "entrance-exams", label: "Entrance Exams" },
  { value: "results", label: "Results" },
  { value: "scholarships", label: "Scholarships" },
];

export default function News() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetNews({
    search: search || undefined,
    category: category || undefined,
    page,
    limit: 12,
  });

  const articles = (data as any)?.articles ?? (data as any)?.news ?? [];
  const totalPages = (data as any)?.totalPages ?? 1;
  const total = (data as any)?.total ?? 0;

  return (
    <>
      <PageMeta title="Education & Government News" description="Latest news on education, government jobs, exam results, scholarships and more." />
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-950/50 to-background py-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest News</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay informed with the latest updates on education, government jobs and entrance exams.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => { setCategory(c.value); setPage(1); }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  category === c.value
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>No news found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any, i: number) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/news/${article.id}`}>
                    <div className="group h-full rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      {article.imageUrl && (
                        <div className="h-44 overflow-hidden">
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {article.isTrending && (
                            <span className="flex items-center gap-1 text-xs text-orange-400">
                              <TrendingUp className="h-3 w-3" /> Trending
                            </span>
                          )}
                          {article.category && (
                            <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-muted-foreground capitalize">
                              {article.category.replace("-", " ")}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.summary}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </div>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Previous</Button>
              <span className="px-4 py-2 text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
