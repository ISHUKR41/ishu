// ============================================================================
// FILE: artifacts/modules/Home/FeaturedResults/List/backend/index.ts
// PURPOSE: Dedicated backend module for the Home FeaturedResults section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../../lib/db/src";
import { resultsTable } from "../../../../../../lib/db/src/schema/results";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // REAL database query
    const results = await db.select()
      .from(resultsTable)
      .orderBy(desc(resultsTable.createdAt))
      .limit(6);
    
    // Send it back to the specific frontend
    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error("Error fetching data for FeaturedResults:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
