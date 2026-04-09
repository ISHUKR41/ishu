// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, blogsTable, blogCategoriesTable } from "@workspace/db";
import { eq, ilike, sql, and } from "drizzle-orm";
import { ListBlogsQueryParams, GetBlogParams, CreateBlogBody } from "@workspace/api-zod";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();

router.get("/blogs", async (req, res): Promise<void> => {
  const parsed = ListBlogsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category, tag, page = 1, limit = 12, search } = parsed.data;
  const offset = (page - 1) * limit;

  const conditions: any[] = [];
  if (category) conditions.push(eq(blogsTable.category, category));
  if (search) conditions.push(ilike(blogsTable.title, `%${search}%`));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [posts, countResult] = await Promise.all([
    db.select().from(blogsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${blogsTable.createdAt} DESC`),
    db.select({ count: sql<number>`count(*)::int` }).from(blogsTable).where(whereClause),
  ]);

  const total = countResult[0]?.count ?? 0;

  res.json({
    posts: posts.map(p => ({ ...p, tags: p.tags ?? [] })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/blogs/categories", async (_req, res): Promise<void> => {
  const cats = await db.select().from(blogCategoriesTable).orderBy(blogCategoriesTable.name);
  const countByCat = await db
    .select({ category: blogsTable.category, count: sql<number>`count(*)::int` })
    .from(blogsTable)
    .groupBy(blogsTable.category);

  const countMap = new Map(countByCat.map(r => [r.category, r.count]));

  res.json(cats.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: countMap.get(c.slug) ?? 0,
  })));
});

router.get("/blogs/featured", async (_req, res): Promise<void> => {
  const posts = await db.select().from(blogsTable)
    .where(eq(blogsTable.isFeatured, true))
    .limit(6)
    .orderBy(sql`${blogsTable.createdAt} DESC`);

  res.json(posts.map(p => ({ ...p, tags: p.tags ?? [] })));
});

router.get("/blogs/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = GetBlogParams.safeParse({ slug: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [post] = await db.select().from(blogsTable).where(eq(blogsTable.slug, params.data.slug)).limit(1);
  if (!post) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }

  await db.update(blogsTable).set({ viewCount: (post.viewCount ?? 0) + 1 }).where(eq(blogsTable.slug, params.data.slug));

  res.json({ ...post, tags: post.tags ?? [] });
});

router.post("/admin/blogs", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateBlogBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [post] = await db.insert(blogsTable).values({
    ...parsed.data,
    tags: parsed.data.tags ?? [],
  }).returning();

  res.status(201).json({ ...post, tags: post.tags ?? [] });
});

export default router;
