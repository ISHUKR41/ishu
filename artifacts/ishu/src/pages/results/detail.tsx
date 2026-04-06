import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetResult } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ExternalLink, FileText, CheckCircle, ArrowLeft, Clock } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  coming_soon: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  expired: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ResultDetail() {
  const [, params] = useRoute("/results/:id");
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: result, isLoading, error } = useGetResult(id, { query: { queryKey: ["result", id], enabled: !!id } });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-48 rounded-xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl md:col-span-2" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Result not found.</p>
        <Button asChild variant="outline"><Link href="/results">Back to Results</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={result.title} description={result.shortDescription ?? ""} />
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/results" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Results
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium capitalize ${STATUS_COLORS[result.status] ?? ""}`}>
                  {result.status.replace("_", " ")}
                </span>
                {result.category && (
                  <span className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground uppercase">
                    {result.category}
                  </span>
                )}
                {result.state && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-blue-400" /> {result.state}
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{result.title}</h1>
              <p className="text-muted-foreground text-lg max-w-3xl">{result.shortDescription}</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">About This Exam</h2>
                <p className="text-muted-foreground leading-relaxed">{result.fullDescription}</p>
              </motion.div>

              {result.eligibility && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" /> Eligibility
                  </h2>
                  <p className="text-muted-foreground">{result.eligibility}</p>
                </motion.div>
              )}

              {result.requiredDocuments && (result.requiredDocuments as string[]).length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" /> Required Documents
                  </h2>
                  <ul className="space-y-2">
                    {(result.requiredDocuments as string[]).map((doc: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Key Details</h2>
                <div className="space-y-4">
                  {result.totalPosts && (
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Posts</p>
                        <p className="font-semibold text-foreground">{result.totalPosts.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {result.lastDate && (
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Date</p>
                        <p className="font-semibold text-foreground">{new Date(result.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    </div>
                  )}
                  {result.examDate && (
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Exam Date</p>
                        <p className="font-semibold text-foreground">{new Date(result.examDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {result.officialLink && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 gap-2" asChild>
                    <a href={result.officialLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Official Website
                    </a>
                  </Button>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
                <p className="text-sm font-medium text-blue-300 mb-1">Stay Updated</p>
                <p className="text-xs text-muted-foreground mb-3">Get notified about this exam's updates.</p>
                <Button size="sm" variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20" asChild>
                  <Link href="/contact">Subscribe to Alerts</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
