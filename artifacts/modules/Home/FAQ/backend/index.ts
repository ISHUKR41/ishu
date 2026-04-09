// ============================================================================
// FILE: artifacts/modules/Home/FAQ/backend/index.ts
// PURPOSE: Dedicated backend module for the Home FAQ section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { faqTable } from "../../../../../lib/db/src/schema/faq";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const faqs = await db.select()
      .from(faqTable)
      .limit(6);
    
    res.json({
      success: true,
      data: faqs
    });
  } catch (err) {
    console.error("Error fetching data for FAQ:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
