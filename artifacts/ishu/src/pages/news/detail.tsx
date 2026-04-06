import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetNews as useGetNewsArticle } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, User, TrendingUp, Tag } from "lucide-react";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: article, isLoading, error } = useGetNewsArticle(id, { query: { enabled: !!id } });

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

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Article not found.</p>
        <Button asChild variant="outline"><Link href="/news">Back to News</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={article.title} description={article.summary ?? ""} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to News
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {article.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-8 h-64 md:h-96">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              {article.isTrending && (
                <span className="flex items-center gap-1 text-xs text-orange-400 border border-orange-500/30 rounded-full px-2.5 py-1 bg-orange-500/10">
                  <TrendingUp className="h-3 w-3" /> Trending
                </span>
              )}
              {article.category && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground border border-white/10 rounded-full px-2.5 py-1 bg-white/5 capitalize">
                  <Tag className="h-3 w-3" /> {article.category.replace("-", " ")}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              {article.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
              )}
            </div>

            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground leading-relaxed">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br />") }} />
              ) : (
                <p>{article.summary}</p>
              )}
            </div>

            {article.tags && (article.tags as string[]).length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-sm text-muted-foreground mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {(article.tags as string[]).map((tag: string) => (
                    <span key={tag} className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Button asChild variant="outline">
              <Link href="/news">← More News</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
