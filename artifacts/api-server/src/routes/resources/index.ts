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
import { resourcesData, resourceCategories } from "./data";

const router: IRouter = Router();

router.get("/resources", async (req, res): Promise<void> => {
  const { category, search, featured, page = "1", limit = "20" } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (pageNum - 1) * limitNum;

  let filtered = [...resourcesData];

  if (category && category !== "all") {
    filtered = filtered.filter((r) => r.type === category);
  }

  if (featured === "true") {
    filtered = filtered.filter((r) => Boolean(r.featured));
  }

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
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

router.get("/resources/categories", async (_req, res): Promise<void> => {
  res.json(resourceCategories);
});

router.get("/resources/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid resource ID" });
    return;
  }
  const resource = resourcesData.find((r) => r.id === id);
  if (!resource) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  res.json(resource);
});

export default router;
