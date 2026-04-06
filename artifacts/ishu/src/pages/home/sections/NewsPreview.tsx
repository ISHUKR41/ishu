import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListNews } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsPreview() {
  const { data, isLoading } = useListNews({ limit: 3 });
  const news = data?.articles || [];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Breaking Educational News</h2>
            <p className="text-muted-foreground">Stay ahead with real-time updates on exams, education policies, and technology trends.</p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/news" className="flex items-center gap-2">
              All News <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col h-[400px]">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6 space-y-4 flex-1">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between mt-auto pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/news/${article.id}`}>
                  <div className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {article.imageUrl ? (
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <span className="text-4xl font-display font-bold text-white/20">Ishu News</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-0 shadow-lg">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                        {article.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.viewCount} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No news articles found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
