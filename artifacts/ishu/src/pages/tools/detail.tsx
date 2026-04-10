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

const DEFAULT_PDF_TO_JPG_DPI = "200";
const DEFAULT_JPG_TO_PDF_ORIENTATION = "portrait";
const DEFAULT_ROTATE_ANGLE = "90";
const DEFAULT_IMAGE_QUALITY = "82";
const DEFAULT_RESIZE_WIDTH = "1200";
const DEFAULT_RESIZE_HEIGHT = "1200";
const DEFAULT_CONVERT_IMAGE_FORMAT = "png";
const DEFAULT_PAGE_NUMBER_START = "1";
const DEFAULT_PAGE_NUMBER_POSITION = "bottom-right";
const WORD_INPUT_ACCEPT =
  ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const IMAGE_INPUT_ACCEPT = "image/*,.jpg,.jpeg,.png,.bmp,.gif,.webp,.tiff";
const PDF_INPUT_ACCEPT = "application/pdf,.pdf";

const HOW_TO_USE: Record<string, string> = {
  "merge-pdf": "Upload two or more PDF files, arrange them in order, then click Process to combine them into a single PDF.",
  "split-pdf": "Upload your PDF, choose the pages or page ranges you want to split, then download each part separately.",
  "compress-pdf": "Upload your PDF file and select the compression level. The tool will reduce the file size while maintaining quality.",
  "rotate-pdf": "Upload your PDF, choose a rotation angle, then process to get a corrected orientation copy.",
  "extract-pdf-pages": "Upload your PDF and provide page ranges (for example 1-3,5) to extract only those pages.",
  "delete-pdf-pages": "Upload your PDF and provide page ranges to remove unwanted pages from the final file.",
  "reorder-pdf": "Upload your PDF and provide page order as comma-separated values like 3,1,2.",
  "add-page-numbers": "Upload your PDF, set start number and position, then process to print page numbers.",
  "protect-pdf": "Upload your PDF, set a password, and download the encrypted protected copy.",
  "unlock-pdf": "Upload a protected PDF and provide the password if required to remove protection.",
  "pdf-to-text": "Upload a PDF to extract machine-readable text into a downloadable .txt file.",
  "compress-image": "Upload an image and choose quality level to reduce file size for faster sharing.",
  "resize-image": "Upload an image and set width/height. Keep aspect ratio to avoid distortion.",
  "convert-image": "Upload an image and choose output format like PNG, JPG, WEBP, BMP, TIFF, or GIF.",
  "pdf-to-word": "Upload your PDF and click Process. The tool will extract text and layout to create an editable Word document.",
  "word-to-pdf": "Upload your Word document (.docx) and click Process to convert it into a PDF with full formatting preserved.",
};

const FEATURES: Record<string, string[]> = {
  "merge-pdf": ["Merge unlimited PDFs", "Drag-and-drop reordering", "No file size limit", "Preserve original quality"],
  "compress-pdf": ["Reduce size up to 90%", "Choose compression level", "Batch processing", "No quality loss option"],
  "rotate-pdf": ["90/180/270 rotation", "Orientation repair", "Zero layout loss", "Fast processing"],
  "extract-pdf-pages": ["Range-based extraction", "Selective page export", "No watermark", "Original quality"],
  "delete-pdf-pages": ["Remove unwanted pages", "Range-based deletion", "Instant output", "Secure processing"],
  "reorder-pdf": ["Custom page order", "Partial reorder support", "Append remaining pages", "No quality change"],
  "add-page-numbers": ["Start from custom number", "Bottom-left/center/right", "Readable font sizing", "Bulk page numbering"],
  "protect-pdf": ["Password encryption", "Share safely", "Quick download", "No signup"],
  "unlock-pdf": ["Remove protection", "Password supported", "Recover editable copy", "Private processing"],
  "pdf-to-text": ["Text extraction", "Multi-page output", "Readable TXT format", "Fast export"],
  "compress-image": ["Adjust quality", "Smaller file size", "Optimized output", "Quick sharing"],
  "resize-image": ["Custom dimensions", "Aspect ratio control", "High quality scaling", "Format-aware output"],
  "convert-image": ["Multiple output formats", "Transparent conversion", "Color-safe output", "Single-click export"],
  "pdf-to-word": ["Editable output", "Preserve formatting", "Table extraction", "Image extraction"],
};

export default function ToolDetail() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug ?? "";
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pageRanges, setPageRanges] = useState("1-1");
  const [pageOrder, setPageOrder] = useState("1");
  const [rotateAngle, setRotateAngle] = useState(DEFAULT_ROTATE_ANGLE);
  const [password, setPassword] = useState("");
  const [pageNumberStart, setPageNumberStart] = useState(DEFAULT_PAGE_NUMBER_START);
  const [pageNumberPosition, setPageNumberPosition] = useState(DEFAULT_PAGE_NUMBER_POSITION);
  const [imageQuality, setImageQuality] = useState(DEFAULT_IMAGE_QUALITY);
  const [resizeWidth, setResizeWidth] = useState(DEFAULT_RESIZE_WIDTH);
  const [resizeHeight, setResizeHeight] = useState(DEFAULT_RESIZE_HEIGHT);
  const [keepAspect, setKeepAspect] = useState(true);
  const [targetImageFormat, setTargetImageFormat] = useState(DEFAULT_CONVERT_IMAGE_FORMAT);
  const [isProxyPending, setIsProxyPending] = useState(false);
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
  const isPdfToWordTool = slug === "pdf-to-word";
  const isWordToPdfTool = slug === "word-to-pdf";
  const isPdfToJpgTool = slug === "pdf-to-jpg";
  const isJpgToPdfTool = slug === "jpg-to-pdf";
  const isRotateTool = slug === "rotate-pdf";
  const isExtractPagesTool = slug === "extract-pdf-pages";
  const isDeletePagesTool = slug === "delete-pdf-pages";
  const isReorderTool = slug === "reorder-pdf";
  const isAddPageNumbersTool = slug === "add-page-numbers";
  const isProtectTool = slug === "protect-pdf";
  const isUnlockTool = slug === "unlock-pdf";
  const isPdfToTextTool = slug === "pdf-to-text";
  const isCompressImageTool = slug === "compress-image";
  const isResizeImageTool = slug === "resize-image";
  const isConvertImageTool = slug === "convert-image";

  const requiresPageRanges = isSplitTool || isExtractPagesTool || isDeletePagesTool;
  const requiresPageOrder = isReorderTool;
  const requiresPassword = isProtectTool;
  const isImageInputTool = isJpgToPdfTool || isCompressImageTool || isResizeImageTool || isConvertImageTool;
  const supportsServerProcessing =
    isMergeTool ||
    isSplitTool ||
    isCompressTool ||
    isPdfToWordTool ||
    isWordToPdfTool ||
    isPdfToJpgTool ||
    isJpgToPdfTool ||
    isRotateTool ||
    isExtractPagesTool ||
    isDeletePagesTool ||
    isReorderTool ||
    isAddPageNumbersTool ||
    isProtectTool ||
    isUnlockTool ||
    isPdfToTextTool ||
    isCompressImageTool ||
    isResizeImageTool ||
    isConvertImageTool;

  const isPending = mergePdf.isPending || compressPdf.isPending || splitPdf.isPending || isProxyPending;

  const resizeWidthValue = Number.parseInt(resizeWidth, 10);
  const resizeHeightValue = Number.parseInt(resizeHeight, 10);
  const hasValidResizeDimensions =
    Number.isInteger(resizeWidthValue) &&
    Number.isInteger(resizeHeightValue) &&
    resizeWidthValue > 0 &&
    resizeHeightValue > 0;

  const hasRequiredToolSpecificInput =
    (!requiresPageRanges || Boolean(pageRanges.trim())) &&
    (!requiresPageOrder || Boolean(pageOrder.trim())) &&
    (!requiresPassword || Boolean(password.trim())) &&
    (!isResizeImageTool || hasValidResizeDimensions);

  const canProcess =
    supportsServerProcessing &&
    (isMergeTool ? selectedFiles.length >= 2 : selectedFiles.length >= 1) &&
    hasRequiredToolSpecificInput;

  const inputAccept = isWordToPdfTool
    ? WORD_INPUT_ACCEPT
    : isImageInputTool
      ? IMAGE_INPUT_ACCEPT
      : PDF_INPUT_ACCEPT;

  const allowsMultipleUpload = isMergeTool || isJpgToPdfTool;

  const fileLabel =
    selectedFiles.length === 0
      ? "No file selected"
      : selectedFiles.length === 1
      ? selectedFiles[0].name
      : `${selectedFiles.length} files selected`;

  const pickFiles = (files: File[]) => {
    if (isMergeTool || isJpgToPdfTool) {
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

  const extractFilenameFromContentDisposition = (value: string | null): string | null => {
    // Supports both RFC 6266 formats:
    // 1) filename*=UTF-8''<url-encoded-name>
    // 2) filename="<ascii-name>"
    if (!value) return null;
    const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch {
        return null;
      }
    }
    const asciiMatch = value.match(/filename="([^"]+)"|filename=([^;\s]+)/i);
    return asciiMatch?.[1] ?? asciiMatch?.[2] ?? null;
  };

  const processViaToolsProxy = async (toolSlug: string, files: File[], extras?: Record<string, string>) => {
    const formData = new FormData();
    if (toolSlug === "jpg-to-pdf") {
      files.forEach((file) => formData.append("files", file));
    } else {
      formData.append("file", files[0]);
    }

    Object.entries(extras ?? {}).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    const response = await fetch(`${baseUrl}/api/tools/process/${toolSlug}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const bodyText = await response.text();
      throw new Error(bodyText || "Tool processing failed.");
    }

    const blob = await response.blob();
    const filename =
      extractFilenameFromContentDisposition(response.headers.get("content-disposition")) ??
      `processed-${Date.now()}.bin`;
    return { blob, filename };
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
          : requiresPageRanges
          ? "Please upload a PDF and provide page ranges (example: 1-3,5)."
          : requiresPageOrder
          ? "Please provide page order (example: 3,1,2)."
          : requiresPassword
          ? "Please enter a password to protect this PDF."
          : isResizeImageTool && !hasValidResizeDimensions
          ? "Please enter valid width and height values greater than zero."
          : "Please upload the required file to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProxyPending(true);
    try {
      let blob: Blob;
      let filename = `${tool.slug}-${Date.now()}.pdf`;

      if (isMergeTool) {
        blob = await mergePdf.mutateAsync({ data: { files: selectedFiles } });
        filename = `merged-${Date.now()}.pdf`;
      } else if (isSplitTool) {
        blob = await splitPdf.mutateAsync({ data: { file: selectedFiles[0], pages: pageRanges } });
        filename = `split-${Date.now()}.pdf`;
      } else if (isCompressTool) {
        blob = await compressPdf.mutateAsync({ data: { file: selectedFiles[0], quality } });
        filename = `compressed-${Date.now()}.pdf`;
      } else if (isPdfToWordTool) {
        const output = await processViaToolsProxy("pdf-to-word", selectedFiles);
        blob = output.blob;
        filename = output.filename;
      } else if (isWordToPdfTool) {
        const output = await processViaToolsProxy("word-to-pdf", selectedFiles);
        blob = output.blob;
        filename = output.filename;
      } else if (isPdfToJpgTool) {
        const output = await processViaToolsProxy("pdf-to-jpg", selectedFiles, {
          dpi: DEFAULT_PDF_TO_JPG_DPI,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isJpgToPdfTool) {
        const output = await processViaToolsProxy("jpg-to-pdf", selectedFiles, {
          orientation: DEFAULT_JPG_TO_PDF_ORIENTATION,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isRotateTool) {
        const output = await processViaToolsProxy("rotate-pdf", selectedFiles, {
          angle: rotateAngle,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isExtractPagesTool) {
        const output = await processViaToolsProxy("extract-pdf-pages", selectedFiles, {
          pages: pageRanges,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isDeletePagesTool) {
        const output = await processViaToolsProxy("delete-pdf-pages", selectedFiles, {
          pages: pageRanges,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isReorderTool) {
        const output = await processViaToolsProxy("reorder-pdf", selectedFiles, {
          order: pageOrder,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isAddPageNumbersTool) {
        const output = await processViaToolsProxy("add-page-numbers", selectedFiles, {
          start: pageNumberStart,
          position: pageNumberPosition,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isProtectTool) {
        const output = await processViaToolsProxy("protect-pdf", selectedFiles, {
          password,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isUnlockTool) {
        const extras = password.trim().length > 0 ? { password } : undefined;
        const output = await processViaToolsProxy("unlock-pdf", selectedFiles, extras);
        blob = output.blob;
        filename = output.filename;
      } else if (isPdfToTextTool) {
        const output = await processViaToolsProxy("pdf-to-text", selectedFiles);
        blob = output.blob;
        filename = output.filename;
      } else if (isCompressImageTool) {
        const output = await processViaToolsProxy("compress-image", selectedFiles, {
          quality: imageQuality,
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isResizeImageTool) {
        const output = await processViaToolsProxy("resize-image", selectedFiles, {
          width: resizeWidth,
          height: resizeHeight,
          keep_aspect: keepAspect ? "true" : "false",
        });
        blob = output.blob;
        filename = output.filename;
      } else if (isConvertImageTool) {
        const output = await processViaToolsProxy("convert-image", selectedFiles, {
          target_format: targetImageFormat,
        });
        blob = output.blob;
        filename = output.filename;
      } else {
        throw new Error("Unsupported tool processing flow.");
      }

      downloadBlob(blob, filename);
      toast({ title: "Success", description: "File processed and download started." });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unable to process this file.";
      toast({ title: "Processing failed", description: message, variant: "destructive" });
    } finally {
      setIsProxyPending(false);
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
                  accept={inputAccept}
                  multiple={allowsMultipleUpload}
                  className="hidden"
                  onChange={(e) => pickFiles(Array.from(e.target.files ?? []))}
                />

                {!supportsServerProcessing && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-300/90 text-left">
                      Processing endpoint for this tool is not mapped yet. Live processing is currently available for core PDF operations, conversions, security tools, and selected image tools.
                    </p>
                  </div>
                )}

                {requiresPageRanges && (
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

                {requiresPageOrder && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="page-order">Page order</label>
                    <input
                      id="page-order"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={pageOrder}
                      onChange={(e) => setPageOrder(e.target.value)}
                      placeholder="e.g. 3,1,2"
                    />
                  </div>
                )}

                {isRotateTool && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="rotate-angle">Rotation angle</label>
                    <select
                      id="rotate-angle"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={rotateAngle}
                      onChange={(e) => setRotateAngle(e.target.value)}
                    >
                      <option value="90">90 degrees</option>
                      <option value="180">180 degrees</option>
                      <option value="270">270 degrees</option>
                    </select>
                  </div>
                )}

                {isAddPageNumbersTool && (
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2" htmlFor="page-number-start">Start number</label>
                      <input
                        id="page-number-start"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        value={pageNumberStart}
                        onChange={(e) => setPageNumberStart(e.target.value)}
                        inputMode="numeric"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2" htmlFor="page-number-position">Position</label>
                      <select
                        id="page-number-position"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        value={pageNumberPosition}
                        onChange={(e) => setPageNumberPosition(e.target.value)}
                      >
                        <option value="bottom-left">Bottom left</option>
                        <option value="bottom-center">Bottom center</option>
                        <option value="bottom-right">Bottom right</option>
                      </select>
                    </div>
                  </div>
                )}

                {(isProtectTool || isUnlockTool) && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="pdf-password">
                      {isProtectTool ? "Password" : "Password (optional)"}
                    </label>
                    <input
                      id="pdf-password"
                      type="password"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isProtectTool ? "Enter PDF password" : "Enter password if PDF is locked"}
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

                {isCompressImageTool && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="image-quality">Image quality (10-95)</label>
                    <input
                      id="image-quality"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={imageQuality}
                      onChange={(e) => setImageQuality(e.target.value)}
                      inputMode="numeric"
                      placeholder="82"
                    />
                  </div>
                )}

                {isResizeImageTool && (
                  <div className="mb-4 space-y-3 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2" htmlFor="resize-width">Width (px)</label>
                        <input
                          id="resize-width"
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={resizeWidth}
                          onChange={(e) => setResizeWidth(e.target.value)}
                          inputMode="numeric"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2" htmlFor="resize-height">Height (px)</label>
                        <input
                          id="resize-height"
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={resizeHeight}
                          onChange={(e) => setResizeHeight(e.target.value)}
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={keepAspect}
                        onChange={(e) => setKeepAspect(e.target.checked)}
                      />
                      Keep aspect ratio
                    </label>
                  </div>
                )}

                {isConvertImageTool && (
                  <div className="mb-4 text-left">
                    <label className="block text-sm text-muted-foreground mb-2" htmlFor="target-image-format">Output format</label>
                    <select
                      id="target-image-format"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={targetImageFormat}
                      onChange={(e) => setTargetImageFormat(e.target.value)}
                    >
                      <option value="png">PNG</option>
                      <option value="jpg">JPG</option>
                      <option value="webp">WEBP</option>
                      <option value="bmp">BMP</option>
                      <option value="tiff">TIFF</option>
                      <option value="gif">GIF</option>
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
