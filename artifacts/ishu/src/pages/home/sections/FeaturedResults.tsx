import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListResults } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedResults() {
  const { data, isLoading } = useListResults({ limit: 6 });
  const results = data?.results || [];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Government Results & Vacancies</h2>
            <p className="text-muted-foreground">Stay updated with the most recent exam results, answer keys, and new job openings across India.</p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/results" className="flex items-center gap-2">
              View All Results <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 pt-4">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </div>
            ))
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/results/${result.id}`}>
                  <div className="group rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 p-6 flex flex-col h-full cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Briefcase className="h-24 w-24" />
                    </div>

                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                        {result.category}
                      </Badge>
                      {result.state && (
                        <Badge variant="outline" className="text-muted-foreground">
                          {result.state}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors relative z-10 line-clamp-2">
                      {result.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6 flex-grow relative z-10 line-clamp-2">
                      {result.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-border text-sm text-muted-foreground relative z-10">
                      {result.lastDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span>Last Date: {new Date(result.lastDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {result.totalPosts && (
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-orange-500" />
                          <span>{result.totalPosts} Posts</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
