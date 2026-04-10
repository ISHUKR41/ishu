// FILE: artifacts/ishu/src/pages/tools/detail.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  useGetTool as useGetToolBySlug,
  useMergePdf,
  useCompressPdf,
  useSplitPdf,
} from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Upload, Download, Zap, AlertCircle, Info, BarChart2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const HOW_TO_USE: Record<string, string> = {
  "merge-pdf": "Upload two or more PDF files, arrange them in order, then click Process to combine them into a single PDF.",
  "split-pdf": "Upload your PDF, choose the pages or page ranges you want to split, then download each part separately.",
  "compress-pdf": "Upload your PDF file and select the compression level. The tool will reduce the file size while maintaining quality.",
  "pdf-to-word": "Upload your PDF and click Process. The tool will extract text and layout to create an editable Word document.",
  "word-to-pdf": "Upload your Word document (.docx) and click Process to convert it into a PDF with full formatting preserved.",
};

const FEATURES: Record<string, string[]> = {
  "merge-pdf": ["Merge unlimited PDFs", "Drag-and-drop reordering", "No file size limit", "Preserve original quality"],
  "compress-pdf": ["Reduce size up to 90%", "Choose compression level", "Batch processing", "No quality loss option"],
  "pdf-to-word": ["Editable output", "Preserve formatting", "Table extraction", "Image extraction"],
};

export default function ToolDetail() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug ?? "";
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pageRanges, setPageRanges] = useState("1-1");
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium");
  const { toast } = useToast();

  const mergePdf = useMergePdf();
  const compressPdf = useCompressPdf();
  const splitPdf = useSplitPdf();

  const { data: tool, isLoading, error } = useGetToolBySlug(slug, {
    query: { queryKey: ["tool", slug], enabled: !!slug },
  });

  const isMergeTool = slug === "merge-pdf";
  const isSplitTool = slug === "split-pdf";
  const isCompressTool = slug === "compress-pdf";
  const supportsServerProcessing = isMergeTool || isSplitTool || isCompressTool;

  const isPending = mergePdf.isPending || compressPdf.isPending || splitPdf.isPending;

  const canProcess =
    supportsServerProcessing &&
    (isMergeTool ? selectedFiles.length >= 2 : selectedFiles.length >= 1) &&
    (!isSplitTool || Boolean(pageRanges.trim()));

  const fileLabel =
    selectedFiles.length === 0
      ? "No file selected"
      : selectedFiles.length === 1
      ? selectedFiles[0].name
      : `${selectedFiles.length} files selected`;

  const pickFiles = (files: File[]) => {
    if (isMergeTool) {
      setSelectedFiles(files);
      return;
    }
    setSelectedFiles(files.slice(0, 1));
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(href);
  };

  const processFile = async () => {
    if (!tool) {
      return;
    }

    if (!supportsServerProcessing) {
      toast({
        title: "Backend not configured",
        description: "This tool currently has discovery/details support, but no processing endpoint is mapped yet.",
        variant: "destructive",
      });
      return;
    }

    if (!canProcess) {
      toast({
        title: "Missing input",
        description: isMergeTool
          ? "Please upload at least 2 PDF files for merge."
          : isSplitTool
          ? "Please upload a PDF and provide page ranges."
          : "Please upload a PDF file to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      let blob: Blob;
      let filename = `${tool.slug}-${Date.now()}.pdf`;

      if (isMergeTool) {
        blob = await mergePdf.mutateAsync({ data: { files: selectedFiles } });
        filename = `merged-${Date.now()}.pdf`;
      } else if (isSplitTool) {
        blob = await splitPdf.mutateAsync({ data: { file: selectedFiles[0], pages: pageRanges } });
        filename = `split-${Date.now()}.pdf`;
      } else {
        blob = await compressPdf.mutateAsync({ data: { file: selectedFiles[0], quality } });
        filename = `compressed-${Date.now()}.pdf`;
      }

      downloadBlob(blob, filename);
      toast({ title: "Success", description: "File processed and download started." });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unable to process this file.";
      toast({ title: "Processing failed", description: message, variant: "destructive" });
    }
  };

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

  const howToUse = HOW_TO_USE[tool.slug] ?? `Upload your file and click Process to use the ${tool.name} tool.`;
  const features = FEATURES[tool.slug] ?? ["Fast processing", "Secure & private", "No registration required", "Free to use"];

  return (
    <>
      <PageMeta title={`${tool.name} - Free Online Tool | Ishu`} description={tool.description ?? ""} />
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground capitalize">
                  {tool.category}
                </span>
                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Free
                </span>
                {tool.isNew && (
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    New
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{tool.name}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">{tool.description}</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/20 mb-4">
                    <Upload className="h-7 w-7 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Upload Your File</h2>
                  <p className="text-muted-foreground text-sm">Drop your file here or click to browse</p>
                </div>

                <div
                  className="border-2 border-dashed border-border rounded-xl p-10 mb-6 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                  onClick={() => document.getElementById("file-input")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    pickFiles(Array.from(e.dataTransfer.files));
                  }}
                >
                  {selectedFiles.length > 0 ? (
                    <div className="flex items-center justify-center gap-3 text-foreground">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{fileLabel}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFiles.reduce((sum, file) => sum + file.size, 0) / 1024).toFixed(1)} KB total
                        </p>
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
                  accept="application/pdf"
                  multiple={isMergeTool}
                  className="hidden"
                  onChange={(e) => pickFiles(Array.from(e.target.files ?? []))}
                />

                {!supportsServerProcessing && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-300/90 text-left">
                      Processing endpoint for this tool is not mapped yet. Live processing is available for Merge PDF, Split PDF, and Compress PDF.
                    </p>
                  </div>
                )}

                {isSplitTool && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="page-ranges">Page ranges</label>
                    <input
                      id="page-ranges"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={pageRanges}
                      onChange={(e) => setPageRanges(e.target.value)}
                      placeholder="e.g. 1-3,5"
                    />
                  </div>
                )}

                {isCompressTool && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="quality">Compression level</label>
                    <select
                      id="quality"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={quality}
                      onChange={(e) => setQuality(e.target.value as "low" | "medium" | "high")}
                    >
                      <option value="low">Low (smaller file)</option>
                      <option value="medium">Medium</option>
                      <option value="high">High (better quality)</option>
                    </select>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 gap-2"
                  disabled={!canProcess || isPending}
                  onClick={processFile}
                >
                  <Download className="h-4 w-4" /> {isPending ? "Processing..." : "Process & Download"}
                </Button>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-400" /> How to Use
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{howToUse}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Features</h2>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-400" /> Stats
                </h2>
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
                    <span className="font-medium text-green-400">Free</span>
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
