// ============================================================================
// FILE: artifacts/modules/Home/BlogPreview/backend/index.ts
// PURPOSE: Dedicated backend module for the Home BlogPreview section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { newsTable } from "../../../../../lib/db/src/schema/news";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Currently using the news table to fetch blog entries (can be adapted to blog if exists)
    const blogs = await db.select()
      .from(newsTable)
      .orderBy(desc(newsTable.createdAt))
      .limit(3);
    
    res.json({
      success: true,
      data: blogs
    });
  } catch (err) {
    console.error("Error fetching data for BlogPreview:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
