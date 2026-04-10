// FILE: artifacts/ishu/src/pages/news/categories/results-news/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { PageMeta } from "@/components/layout/PageMeta";
import { useListNews } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NewsResultsNews() {
  const { data, isLoading } = useListNews({ category: "results-news", limit: 50 });
  const newsList = (data as any)?.news ?? data ?? [];

  return (
    <>
      <PageMeta
        title="Results News News - ISHU | Indian Student Hub"
        description="Latest Results News news and updates for Indian students and job seekers on ISHU platform."
        keywords="results-news news, Results News updates, indian education, ishu"
        canonical={`https://ishu.in/news/category/results-news`}
      />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <h1 className="text-3xl font-bold mb-2">Results News News</h1>
          <p className="text-muted-foreground mb-8">Latest Results News updates and announcements</p>
          {isLoading ? (
            <div className="flex items-center justify-center py-20 opacity-40">
              <div className="w-8 h-8 border-2 border-border border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : Array.isArray(newsList) && newsList.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsList.map((item: any) => (
                <Link key={item.id} href={`/news/${item.id}`} className="block p-4 rounded-lg border border-border hover:border-blue-500/30 transition-colors bg-card">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.summary ?? item.content?.substring(0, 150)}</p>
                  {item.publishedAt && (
                    <p className="text-xs text-muted-foreground mt-3">{new Date(item.publishedAt).toLocaleDateString("en-IN")}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No Results News news available yet. Check back soon.
            </div>
          )}
        </div>
      </div>
    </>
  );
}