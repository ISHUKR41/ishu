import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetTool as useGetToolBySlug } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Upload, Download, Info, Star, Zap, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ToolDetail() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug ?? "";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: tool, isLoading, error } = useGetToolBySlug(slug, { query: { enabled: !!slug } });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-64 rounded-xl mb-6" />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Tool not found.</p>
        <Button asChild variant="outline"><Link href="/tools">Back to Tools</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={tool.name} description={tool.description ?? ""} />
      <div className="min-h-screen bg-background">
        <div className="border-b border-white/10 bg-gradient-to-b from-indigo-950/30 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted-foreground capitalize">
                  {tool.category}
                </span>
                {tool.isPremium ? (
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400" /> Premium
                  </span>
                ) : (
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400 flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Free
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{tool.name}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">{tool.description}</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/20 mb-4">
                    <Upload className="h-7 w-7 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Upload Your File</h2>
                  <p className="text-muted-foreground text-sm">Drop your file here or click to browse</p>
                </div>

                <div
                  className="border-2 border-dashed border-white/20 rounded-xl p-10 mb-6 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                  onClick={() => document.getElementById("file-input")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) setSelectedFile(file);
                  }}
                >
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3 text-foreground">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <Upload className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p>Drag & drop or click to upload</p>
                    </div>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setSelectedFile(e.target.files[0])}
                />

                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-300/90 text-left">
                    Server-side processing is coming soon. This tool UI is ready — full processing will be available after deployment.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 gap-2"
                  disabled={!selectedFile}
                >
                  <Download className="h-4 w-4" /> Process & Download
                </Button>
              </motion.div>
            </div>

            <div className="space-y-6">
              {tool.howToUse && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-400" /> How to Use
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.howToUse}</p>
                </motion.div>
              )}

              {tool.features && (tool.features as string[]).length > 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Features</h2>
                  <ul className="space-y-2">
                    {(tool.features as string[]).map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Stats</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Times Used</span>
                    <span className="font-medium">{(tool.usageCount ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{tool.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{tool.isPremium ? "Premium" : "Free"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
