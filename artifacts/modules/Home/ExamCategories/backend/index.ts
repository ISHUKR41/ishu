// ============================================================================
// FILE: artifacts/modules/Home/ExamCategories/backend/index.ts
// PURPOSE: Dedicated backend module for the Home ExamCategories section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { resultCategoriesTable } from "../../../../../lib/db/src/schema/results";

// Note: If you cannot find the actual DB table right now just return realDataPlaceholder as true
// But since we want real data, we will try to query the database.
const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // REAL database query
    const categories = await db.select().from(resultCategoriesTable).limit(12);
    
    // Send it back to the specific frontend
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    console.error("Error fetching data for ExamCategories:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
