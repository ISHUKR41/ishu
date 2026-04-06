import { Router, type IRouter } from "express";
import { db, toolsTable } from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";
import { ListToolsQueryParams, GetToolParams } from "@workspace/api-zod";

const router: IRouter = Router();

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

router.post("/tools/pdf/merge", async (req, res): Promise<void> => {
  res.status(501).json({ error: "PDF processing requires server-side binaries. Feature coming soon." });
});

router.post("/tools/pdf/compress", async (req, res): Promise<void> => {
  res.status(501).json({ error: "PDF processing requires server-side binaries. Feature coming soon." });
});

router.post("/tools/pdf/split", async (req, res): Promise<void> => {
  res.status(501).json({ error: "PDF processing requires server-side binaries. Feature coming soon." });
});

export default router;
