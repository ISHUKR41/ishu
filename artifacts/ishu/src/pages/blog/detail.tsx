// FILE: artifacts/ishu/src/pages/blog/detail.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetBlog } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, User, Tag, Eye } from "lucide-react";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: blog, isLoading, error } = useGetBlog(slug, {
    query: { queryKey: ["blog", slug], enabled: !!slug },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-72 rounded-xl mb-6" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Blog post not found.</p>
        <Button asChild variant="outline"><Link href="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={blog.title} description={blog.excerpt ?? ""} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-green-400 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {blog.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-8 h-64 md:h-96">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              {blog.isFeatured && (
                <span className="text-xs text-yellow-400 border border-yellow-500/30 rounded-full px-2.5 py-1 bg-yellow-500/10">Featured</span>
              )}
              {blog.category && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1 bg-card capitalize">
                  <Tag className="h-3 w-3" /> {blog.category.replace(/-/g, " ")}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              {blog.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" /> {blog.author}
                </div>
              )}
              {blog.readTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {blog.readTime} min read
                </div>
              )}
              {blog.viewCount && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {blog.viewCount.toLocaleString()} views
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>

            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground leading-relaxed">
              {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }} />
              ) : (
                <p>{blog.excerpt}</p>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string) => (
                    <span key={tag} className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          <div className="mt-12 pt-8 border-t border-border">
            <Button asChild variant="outline"><Link href="/blog">← More Articles</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
