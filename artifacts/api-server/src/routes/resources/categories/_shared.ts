import { Router, type IRouter } from "express";
import { resourcesData } from "../data";

export function createResourcesCategoryRouter(categoryType: string): IRouter {
  const router: IRouter = Router();

  router.get("/", async (req, res): Promise<void> => {
    const { page = "1", limit = "20", search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    let filtered = resourcesData.filter((r) => r.type === categoryType);

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.exam.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.includes(q)),
      );
    }

    const total = filtered.length;
    const paged = filtered.slice(offset, offset + limitNum);

    res.json({
      resources: paged,
      category: categoryType,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  return router;
}
