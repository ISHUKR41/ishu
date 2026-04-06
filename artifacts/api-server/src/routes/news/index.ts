import { Router, type IRouter } from "express";
import { db, newsTable, newsCategoriesTable } from "@workspace/db";
import { eq, ilike, sql, and } from "drizzle-orm";
import { ListNewsQueryParams, GetNewsParams, CreateNewsBody } from "@workspace/api-zod";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();

router.get("/news", async (req, res): Promise<void> => {
  const parsed = ListNewsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category, language, page = 1, limit = 30, search } = parsed.data;
  const offset = (page - 1) * limit;

  const conditions: any[] = [];
  if (category) conditions.push(eq(newsTable.category, category));
  if (language) conditions.push(eq(newsTable.language, language));
  if (search) conditions.push(ilike(newsTable.title, `%${search}%`));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [articles, countResult] = await Promise.all([
    db.select().from(newsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${newsTable.createdAt} DESC`),
    db.select({ count: sql<number>`count(*)::int` }).from(newsTable).where(whereClause),
  ]);

  const total = countResult[0]?.count ?? 0;

  res.json({
    articles: articles.map(a => ({
      ...a,
      relatedNewsIds: a.relatedNewsIds ?? [],
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/news/categories", async (_req, res): Promise<void> => {
  const categories = await db.select().from(newsCategoriesTable).orderBy(newsCategoriesTable.name);
  const countByCat = await db
    .select({ category: newsTable.category, count: sql<number>`count(*)::int` })
    .from(newsTable)
    .groupBy(newsTable.category);

  const countMap = new Map(countByCat.map(r => [r.category, r.count]));

  res.json(categories.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    color: c.color,
    count: countMap.get(c.slug) ?? 0,
  })));
});

router.get("/news/trending", async (_req, res): Promise<void> => {
  const articles = await db.select().from(newsTable)
    .where(eq(newsTable.isTrending, true))
    .limit(10)
    .orderBy(sql`${newsTable.viewCount} DESC`);

  res.json(articles.map(a => ({ ...a, relatedNewsIds: a.relatedNewsIds ?? [] })));
});

router.get("/news/:id", async (req, res): Promise<void> => {
  const params = GetNewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [article] = await db.select().from(newsTable).where(eq(newsTable.id, params.data.id)).limit(1);
  if (!article) {
    res.status(404).json({ error: "News article not found" });
    return;
  }

  await db.update(newsTable).set({ viewCount: (article.viewCount ?? 0) + 1 }).where(eq(newsTable.id, params.data.id));

  res.json({ ...article, relatedNewsIds: article.relatedNewsIds ?? [] });
});

router.post("/admin/news", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [article] = await db.insert(newsTable).values(parsed.data).returning();
  res.status(201).json({ ...article, relatedNewsIds: article.relatedNewsIds ?? [] });
});

export default router;
