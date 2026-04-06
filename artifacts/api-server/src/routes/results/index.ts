import { Router, type IRouter } from "express";
import { db, resultsTable, resultCategoriesTable } from "@workspace/db";
import { eq, ilike, sql, and } from "drizzle-orm";
import { ListResultsQueryParams, GetResultParams, CreateResultBody } from "@workspace/api-zod";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();

router.get("/results", async (req, res): Promise<void> => {
  const parsed = ListResultsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category, state, status, page = 1, limit = 20 } = parsed.data;
  const offset = (page - 1) * limit;

  const conditions: any[] = [];
  if (category) conditions.push(eq(resultsTable.category, category));
  if (state) conditions.push(eq(resultsTable.state, state));
  if (status) conditions.push(eq(resultsTable.status, status));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [results, countResult] = await Promise.all([
    db.select().from(resultsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${resultsTable.createdAt} DESC`),
    db.select({ count: sql<number>`count(*)::int` }).from(resultsTable).where(whereClause),
  ]);

  const total = countResult[0]?.count ?? 0;

  res.json({
    results: results.map(r => ({
      ...r,
      requiredDocuments: r.requiredDocuments ?? [],
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/results/stats", async (_req, res): Promise<void> => {
  const [active, upcoming, expired] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(resultsTable).where(eq(resultsTable.status, "active")),
    db.select({ count: sql<number>`count(*)::int` }).from(resultsTable).where(eq(resultsTable.status, "upcoming")),
    db.select({ count: sql<number>`count(*)::int` }).from(resultsTable).where(eq(resultsTable.status, "expired")),
  ]);

  const byCategoryRaw = await db
    .select({ category: resultsTable.category, count: sql<number>`count(*)::int` })
    .from(resultsTable)
    .groupBy(resultsTable.category);

  const byStateRaw = await db
    .select({ state: resultsTable.state, count: sql<number>`count(*)::int` })
    .from(resultsTable)
    .where(sql`${resultsTable.state} is not null`)
    .groupBy(resultsTable.state);

  res.json({
    totalActive: active[0]?.count ?? 0,
    totalUpcoming: upcoming[0]?.count ?? 0,
    totalExpired: expired[0]?.count ?? 0,
    byCategory: byCategoryRaw.map(r => ({ category: r.category, count: r.count })),
    byState: byStateRaw.map(r => ({ state: r.state ?? "", count: r.count })),
  });
});

router.get("/results/categories", async (_req, res): Promise<void> => {
  const categories = await db.select().from(resultCategoriesTable).orderBy(resultCategoriesTable.name);

  const countByCategory = await db
    .select({ category: resultsTable.category, count: sql<number>`count(*)::int` })
    .from(resultsTable)
    .groupBy(resultsTable.category);

  const countMap = new Map(countByCategory.map(r => [r.category, r.count]));

  res.json(categories.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: countMap.get(c.slug) ?? 0,
  })));
});

router.get("/results/states", async (_req, res): Promise<void> => {
  const statesWithCount = await db
    .select({ state: resultsTable.state, count: sql<number>`count(*)::int` })
    .from(resultsTable)
    .where(sql`${resultsTable.state} is not null`)
    .groupBy(resultsTable.state);

  const activeByState = await db
    .select({ state: resultsTable.state, count: sql<number>`count(*)::int` })
    .from(resultsTable)
    .where(and(sql`${resultsTable.state} is not null`, eq(resultsTable.status, "active")))
    .groupBy(resultsTable.state);

  const activeMap = new Map(activeByState.map(r => [r.state, r.count]));

  res.json(statesWithCount.map(r => ({
    state: r.state ?? "",
    count: r.count,
    activeCount: activeMap.get(r.state) ?? 0,
  })));
});

router.get("/results/:id", async (req, res): Promise<void> => {
  const params = GetResultParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [result] = await db.select().from(resultsTable).where(eq(resultsTable.id, params.data.id)).limit(1);
  if (!result) {
    res.status(404).json({ error: "Result not found" });
    return;
  }

  res.json({ ...result, requiredDocuments: result.requiredDocuments ?? [] });
});

router.post("/admin/results", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateResultBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [result] = await db.insert(resultsTable).values({
    ...parsed.data,
    requiredDocuments: parsed.data.requiredDocuments ?? [],
  }).returning();

  res.status(201).json({ ...result, requiredDocuments: result.requiredDocuments ?? [] });
});

router.put("/admin/results/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const parsed = CreateResultBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [result] = await db.update(resultsTable).set({
    ...parsed.data,
    requiredDocuments: parsed.data.requiredDocuments ?? [],
  }).where(eq(resultsTable.id, id)).returning();

  if (!result) {
    res.status(404).json({ error: "Result not found" });
    return;
  }

  res.json({ ...result, requiredDocuments: result.requiredDocuments ?? [] });
});

router.delete("/admin/results/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [deleted] = await db.delete(resultsTable).where(eq(resultsTable.id, id)).returning();
  if (!deleted) {
    res.status(404).json({ error: "Result not found" });
    return;
  }

  res.json({ message: "Deleted successfully" });
});

export default router;
