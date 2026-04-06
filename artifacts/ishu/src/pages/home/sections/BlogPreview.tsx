import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListBlogs } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogPreview() {
  const { data, isLoading } = useListBlogs({ limit: 3 });
  const blogs = data?.posts || [];

  return (
    <section className="py-20 md:py-32 relative bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from our Blog</h2>
            <p className="text-muted-foreground">Insights, study tips, and career advice from experts and successful candidates.</p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              Read All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="group cursor-pointer flex flex-col h-full">
                    <div className="relative h-56 rounded-xl overflow-hidden mb-6 bg-muted border border-border">
                      {blog.imageUrl ? (
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-4xl font-display font-bold text-muted-foreground/30">Blog</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-400/30 bg-blue-400/10">
                        {blog.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto text-sm font-medium text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No blog posts found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
