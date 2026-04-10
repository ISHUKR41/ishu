// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, toolsTable } from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";
import { ListToolsQueryParams, GetToolParams } from "@workspace/api-zod";
import multer from "multer";
import { PDFDocument } from "pdf-lib";

const router: IRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 20,
  },
});

const pythonToolsBaseUrl = (
  process.env.TOOLS_PROCESSOR_URL
  || process.env.PYTHON_TOOLS_BASE_URL
  || "http://127.0.0.1:8000"
).replace(/\/+$/, "");
const toolsProcessorMode = (process.env.TOOLS_PROCESSOR_MODE || "auto").toLowerCase();
const pythonHealthCacheTtlMs = 30_000;
const MAX_FILENAME_LENGTH = 120;
const PYTHON_DIRECT_PROXY_SLUGS = new Set([
  "pdf-to-word",
  "word-to-pdf",
  "pdf-to-jpg",
  "jpg-to-pdf",
  "rotate-pdf",
  "extract-pdf-pages",
  "delete-pdf-pages",
  "reorder-pdf",
  "add-page-numbers",
  "protect-pdf",
  "unlock-pdf",
  "pdf-to-text",
  "compress-image",
  "resize-image",
  "convert-image",
]);
const PYTHON_PROXY_DEFAULT_FILENAMES: Record<string, string> = {
  "pdf-to-word": "converted.docx",
  "word-to-pdf": "converted.pdf",
  "pdf-to-jpg": "converted.zip",
  "jpg-to-pdf": "converted.pdf",
  "rotate-pdf": "rotated.pdf",
  "extract-pdf-pages": "extracted-pages.pdf",
  "delete-pdf-pages": "pages-removed.pdf",
  "reorder-pdf": "reordered.pdf",
  "add-page-numbers": "numbered.pdf",
  "protect-pdf": "protected.pdf",
  "unlock-pdf": "unlocked.pdf",
  "pdf-to-text": "extracted.txt",
  "compress-image": "compressed.jpg",
  "resize-image": "resized.png",
  "convert-image": "converted.bin",
};

let pythonHealthCache: { ok: boolean; checkedAt: number } | null = null;

type CompressionLevel = "low" | "medium" | "high";

function sanitizeFilename(raw: string): string {
  const extensionMatch = raw.trim().match(/(\.[a-zA-Z0-9]{1,10})$/);
  const extension = extensionMatch?.[1] ?? "";
  const normalized = raw
    .trim()
    .replace(/(\.\.)+/g, "_")
    .replace(/[\\\/]+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^\.+/g, "")
    .replace(/\.[a-zA-Z0-9]{1,10}$/g, "");

  const maxBaseLength = Math.max(1, MAX_FILENAME_LENGTH - extension.length);
  const baseName = normalized.length > 0 ? normalized.slice(0, maxBaseLength) : "upload";
  return `${baseName}${extension}` || "upload.bin";
}

function sendPdf(res: any, bytes: Uint8Array, filename: string): void {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.status(200).send(Buffer.from(bytes));
}

function shouldUsePythonProcessor(): boolean {
  return toolsProcessorMode === "python" || toolsProcessorMode === "auto";
}

async function isPythonProcessorAvailable(): Promise<boolean> {
  if (!shouldUsePythonProcessor()) {
    return false;
  }

  if (toolsProcessorMode === "python") {
    return true;
  }

  const now = Date.now();
  if (pythonHealthCache && now - pythonHealthCache.checkedAt < pythonHealthCacheTtlMs) {
    return pythonHealthCache.ok;
  }

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), 1500);

  try {
    const healthResponse = await fetch(`${pythonToolsBaseUrl}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    const ok = healthResponse.ok;
    pythonHealthCache = { ok, checkedAt: now };
    return ok;
  } catch {
    pythonHealthCache = { ok: false, checkedAt: now };
    return false;
  } finally {
    clearTimeout(timeoutHandle);
  }
}

function appendUploadedFiles(formData: FormData, fieldName: string, files: Express.Multer.File[]): void {
  for (const file of files) {
    const blob = new globalThis.Blob([file.buffer], {
      type: file.mimetype || "application/pdf",
    });
    formData.append(
      fieldName,
      blob,
      sanitizeFilename(file.originalname || "document.pdf"),
    );
  }
}

async function callPythonProcessor(
  endpoint: string,
  buildFormData: (formData: FormData) => void,
): Promise<Response | null> {
  if (!shouldUsePythonProcessor()) {
    return null;
  }

  if (toolsProcessorMode === "auto") {
    const available = await isPythonProcessorAvailable();
    if (!available) {
      return null;
    }
  }

  const formData = new globalThis.FormData();
  buildFormData(formData);

  try {
    const response = await fetch(`${pythonToolsBaseUrl}/api/tools/process/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return response;
    }

    if (toolsProcessorMode === "python") {
      const bodyText = await response.text();
      throw new Error(`Python processor returned ${response.status}: ${bodyText.slice(0, 200)}`);
    }

    return null;
  } catch (error) {
    if (toolsProcessorMode === "python") {
      throw error;
    }
    return null;
  }
}

async function relayProcessorResponse(res: any, response: Response, fallbackFilename: string): Promise<void> {
  const bytes = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const contentDisposition =
    response.headers.get("content-disposition") || `attachment; filename="${fallbackFilename}"`;

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", contentDisposition);
  res.status(200).send(bytes);
}

function parsePageRanges(raw: string, totalPages: number): number[] {
  const selected = new Set<number>();
  const chunks = raw.split(",").map((chunk) => chunk.trim()).filter(Boolean);

  for (const chunk of chunks) {
    if (chunk.includes("-")) {
      const [startRaw, endRaw] = chunk.split("-").map((v) => v.trim());
      const start = Number.parseInt(startRaw, 10);
      const end = Number.parseInt(endRaw, 10);

      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
        throw new Error(`Invalid range: ${chunk}`);
      }

      for (let i = start; i <= end; i += 1) {
        if (i <= totalPages) {
          selected.add(i - 1);
        }
      }
      continue;
    }

    const page = Number.parseInt(chunk, 10);
    if (!Number.isInteger(page) || page < 1 || page > totalPages) {
      throw new Error(`Invalid page number: ${chunk}`);
    }
    selected.add(page - 1);
  }

  return Array.from(selected).sort((a, b) => a - b);
}

router.get("/tools", async (req, res): Promise<void> => {
  const parsed = ListToolsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category } = parsed.data;
  const conditions: any[] = [];
  if (category) conditions.push(eq(toolsTable.category, category));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const tools = await db.select().from(toolsTable)
    .where(whereClause)
    .orderBy(toolsTable.name);

  res.json(tools);
});

router.get("/tools/stats", async (_req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(toolsTable);
  const [totalUsageResult] = await db.select({ total: sql<number>`sum(usage_count)::int` }).from(toolsTable);
  const popular = await db.select().from(toolsTable).orderBy(sql`${toolsTable.usageCount} DESC`).limit(5);

  res.json({
    totalTools: totalResult?.count ?? 0,
    totalUsage: totalUsageResult?.total ?? 0,
    popularTools: popular.map(t => ({ name: t.name, usageCount: t.usageCount })),
  });
});

router.get("/tools/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = GetToolParams.safeParse({ slug: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [tool] = await db.select().from(toolsTable).where(eq(toolsTable.slug, params.data.slug)).limit(1);
  if (!tool) {
    res.status(404).json({ error: "Tool not found" });
    return;
  }

  await db.update(toolsTable).set({ usageCount: (tool.usageCount ?? 0) + 1 }).where(eq(toolsTable.slug, params.data.slug));

  res.json(tool);
});

router.post("/tools/pdf/merge", upload.array("files", 20), async (req, res): Promise<void> => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  if (files.length < 2) {
    res.status(400).json({ error: "Please upload at least 2 PDF files to merge." });
    return;
  }

  try {
    const pythonResponse = await callPythonProcessor("merge-pdf", (formData) => {
      appendUploadedFiles(formData, "files", files);
    });

    if (pythonResponse) {
      await relayProcessorResponse(res, pythonResponse, `merged-${Date.now()}.pdf`);
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
      const pages = await mergedPdf.copyPages(src, src.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const bytes = await mergedPdf.save({ useObjectStreams: true, updateFieldAppearances: false });
    sendPdf(res, bytes, `merged-${Date.now()}.pdf`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to merge provided files.";
    if (toolsProcessorMode === "python") {
      res.status(502).json({ error: `Python merge service failed: ${message}` });
      return;
    }
    res.status(400).json({ error: "Unable to merge provided files. Please upload valid PDF documents." });
  }
});

router.post("/tools/pdf/compress", upload.single("file"), async (req, res): Promise<void> => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "Please upload a PDF file." });
    return;
  }

  const quality = (req.body?.quality as CompressionLevel | undefined) ?? "medium";

  try {
    const pythonResponse = await callPythonProcessor("compress-pdf", (formData) => {
      appendUploadedFiles(formData, "file", [file]);
      formData.append("quality", quality);
    });

    if (pythonResponse) {
      await relayProcessorResponse(res, pythonResponse, `compressed-${Date.now()}.pdf`);
      return;
    }

    const source = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const optimized = await PDFDocument.create();

    const copiedPages = await optimized.copyPages(source, source.getPageIndices());
    copiedPages.forEach((page) => optimized.addPage(page));

    const saveOptions = {
      low: { useObjectStreams: true, objectsPerTick: 40, updateFieldAppearances: false },
      medium: { useObjectStreams: true, objectsPerTick: 20, updateFieldAppearances: false },
      high: { useObjectStreams: false, objectsPerTick: 10, updateFieldAppearances: true },
    }[quality] ?? { useObjectStreams: true, objectsPerTick: 20, updateFieldAppearances: false };

    const bytes = await optimized.save(saveOptions);
    sendPdf(res, bytes, `compressed-${Date.now()}.pdf`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to compress this file.";
    if (toolsProcessorMode === "python") {
      res.status(502).json({ error: `Python compression service failed: ${message}` });
      return;
    }
    res.status(400).json({ error: "Unable to compress this file. Please upload a valid PDF." });
  }
});

router.post("/tools/pdf/split", upload.single("file"), async (req, res): Promise<void> => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "Please upload a PDF file." });
    return;
  }

  const pageRanges = String(req.body?.pages ?? "").trim();
  if (!pageRanges) {
    res.status(400).json({ error: "Please provide page ranges (e.g. 1-3,5)." });
    return;
  }

  try {
    const pythonResponse = await callPythonProcessor("split-pdf", (formData) => {
      appendUploadedFiles(formData, "file", [file]);
      formData.append("pages", pageRanges);
      formData.append("split_all", "false");
    });

    if (pythonResponse) {
      await relayProcessorResponse(res, pythonResponse, `split-${Date.now()}.pdf`);
      return;
    }

    const source = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const selectedPageIndexes = parsePageRanges(pageRanges, source.getPageCount());

    if (selectedPageIndexes.length === 0) {
      res.status(400).json({ error: "No valid pages were selected." });
      return;
    }

    const output = await PDFDocument.create();
    const pages = await output.copyPages(source, selectedPageIndexes);
    pages.forEach((page) => output.addPage(page));

    const bytes = await output.save({ useObjectStreams: true, updateFieldAppearances: false });
    sendPdf(res, bytes, `split-${Date.now()}.pdf`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to split this file.";
    if (toolsProcessorMode === "python") {
      res.status(502).json({ error: `Python split service failed: ${message}` });
      return;
    }
    res.status(400).json({ error: message });
  }
});

router.post("/tools/process/:slug", upload.any(), async (req, res): Promise<void> => {
  const slug = String(req.params.slug ?? "").trim();
  if (!PYTHON_DIRECT_PROXY_SLUGS.has(slug)) {
    res.status(404).json({ error: "Tool processor route is not available for this slug." });
    return;
  }

  if (!shouldUsePythonProcessor()) {
    res.status(501).json({ error: "Python tool processor is disabled by server configuration." });
    return;
  }

  if (toolsProcessorMode === "auto") {
    const available = await isPythonProcessorAvailable();
    if (!available) {
      res.status(503).json({ error: "Python tool processor is unavailable right now." });
      return;
    }
  }

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  if (files.length === 0) {
    res.status(400).json({ error: "Please upload at least one file." });
    return;
  }

  try {
    const formData = new globalThis.FormData();

    for (const file of files) {
      const blob = new globalThis.Blob([file.buffer], {
        type: file.mimetype || "application/octet-stream",
      });
      formData.append(
        file.fieldname || "file",
        blob,
        sanitizeFilename(file.originalname || "upload.bin"),
      );
    }

    for (const [key, value] of Object.entries(req.body ?? {})) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const response = await fetch(`${pythonToolsBaseUrl}/api/tools/process/${slug}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const bodyText = await response.text();
      res.status(502).json({
        error: `Python tool processor failed (${response.status}).`,
        detail: bodyText.slice(0, 500),
      });
      return;
    }

    const defaultFilename = PYTHON_PROXY_DEFAULT_FILENAMES[slug] ?? `processed-${Date.now()}.pdf`;

    await relayProcessorResponse(res, response, defaultFilename);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected processor error.";
    res.status(502).json({ error: `Unable to process file with python service: ${message}` });
  }
});

export default router;
