import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListResults as useGetResults } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, MapPin, Users, ChevronRight, Filter } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  coming_soon: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  expired: "bg-red-500/20 text-red-400 border-red-500/30",
};

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

export default function Results() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetResults({
    search: search || undefined,
    category: category || undefined,
    status: status || undefined,
    page,
    limit: 12,
  });

  const results = data?.results ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <PageMeta title="Government Exam Results" description="Latest government exam results, admit cards and notifications for SSC, UPSC, Railway, Banking and more." />
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/50 to-background py-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Government Exam Results</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay updated with the latest results, notifications & admit cards for all major government exams.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams, notifications..."
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <select
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-gray-900">{c.label}</option>
              ))}
            </select>
            <select
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            >
              <option value="" className="bg-gray-900">All Status</option>
              <option value="active" className="bg-gray-900">Active</option>
              <option value="upcoming" className="bg-gray-900">Upcoming</option>
              <option value="coming_soon" className="bg-gray-900">Coming Soon</option>
            </select>
          </div>

          {total > 0 && (
            <p className="text-sm text-muted-foreground mb-6">Showing {results.length} of {total} results</p>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-xl" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">No results found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result: any, i: number) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/results/${result.id}`}>
                    <div className="group relative h-full rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[result.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                          {result.status.replace("_", " ")}
                        </span>
                        {result.totalPosts && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {result.totalPosts.toLocaleString()} Posts
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{result.shortDescription}</p>
                      <div className="flex flex-col gap-1.5 mt-auto">
                        {result.lastDate && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 text-orange-400" />
                            Last Date: <span className="text-foreground">{new Date(result.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        )}
                        {result.state && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-blue-400" />
                            {result.state}
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4 text-blue-400" />
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
