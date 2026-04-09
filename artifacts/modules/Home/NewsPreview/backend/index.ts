// ============================================================================
// FILE: artifacts/modules/Home/NewsPreview/backend/index.ts
// PURPOSE: Dedicated backend module for the Home NewsPreview section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { newsTable } from "../../../../../lib/db/src/schema/news";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const news = await db.select()
      .from(newsTable)
      .orderBy(desc(newsTable.createdAt))
      .limit(4);
    
    res.json({
      success: true,
      data: news
    });
  } catch (err) {
    console.error("Error fetching data for NewsPreview:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
