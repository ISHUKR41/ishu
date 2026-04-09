// ============================================================================
// FILE: modules/Tools/ToolGrid/backend/index.ts
// PURPOSE: Backend API for the ToolGrid section — returns all tools.
// ENDPOINT: GET /api/tools/grid
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { toolsTable } from "../../../../../lib/db/src/schema/tools";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const tools = await db.select().from(toolsTable).orderBy(desc(toolsTable.createdAt));
    res.json({ data: tools });
  } catch (error) {
    console.error("[Tools/ToolGrid/backend] Error:", error);
    res.json({ data: [] });
  }
});

export default router;
