import { Router, type IRouter } from "express";
import { db, blogsTable, newsTable, resultsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const [latestResults, latestNews, latestBlogs] = await Promise.all([
    db
      .select({
        title: resultsTable.title,
        summary: resultsTable.shortDescription,
        category: resultsTable.category,
      })
      .from(resultsTable)
      .orderBy(desc(resultsTable.createdAt))
      .limit(2),
    db
      .select({
        title: newsTable.title,
        summary: newsTable.shortDescription,
        category: newsTable.category,
      })
      .from(newsTable)
      .orderBy(desc(newsTable.createdAt))
      .limit(2),
    db
      .select({
        title: blogsTable.title,
        summary: blogsTable.excerpt,
        category: blogsTable.category,
      })
      .from(blogsTable)
      .orderBy(desc(blogsTable.createdAt))
      .limit(2),
  ]);

  const palette = ["#3b82f6", "#8b5cf6", "#10b981", "#f97316", "#14b8a6", "#ec4899"];
  const cards = [
    ...latestResults.map((item) => ({ ...item, type: "Result Update" })),
    ...latestNews.map((item) => ({ ...item, type: "News Update" })),
    ...latestBlogs.map((item) => ({ ...item, type: "Blog Update" })),
  ].map((item, index) => {
    const initials =
      item.title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "HL";

    return {
      id: index + 1,
      name: item.title,
      role: item.type,
      location: item.category,
      content: item.summary,
      avatar: initials,
      color: palette[index % palette.length],
    };
  });

  res.json(cards);
});

export default router;
