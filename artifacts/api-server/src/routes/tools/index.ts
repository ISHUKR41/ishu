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

type CompressionLevel = "low" | "medium" | "high";

function sendPdf(res: any, bytes: Uint8Array, filename: string): void {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.status(200).send(Buffer.from(bytes));
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
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const src = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
      const pages = await mergedPdf.copyPages(src, src.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const bytes = await mergedPdf.save({ useObjectStreams: true, updateFieldAppearances: false });
    sendPdf(res, bytes, `merged-${Date.now()}.pdf`);
  } catch (_error) {
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
  } catch (_error) {
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
    res.status(400).json({ error: message });
  }
});

export default router;
