// ============================================================================
// FILE: artifacts/modules/Home/ToolsShowcase/backend/index.ts
// PURPOSE: Dedicated backend module for the Home ToolsShowcase section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { toolsTable } from "../../../../../lib/db/src/schema/tools";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // REAL database query
    const tools = await db.select()
      .from(toolsTable)
      .orderBy(desc(toolsTable.createdAt))
      .limit(6);
    
    // Send it back to the specific frontend
    res.json({
      success: true,
      data: tools
    });
  } catch (err) {
    console.error("Error fetching data for ToolsShowcase:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
