// ============================================================================
// FILE: artifacts/modules/Home/FAQ/backend/index.ts
// PURPOSE: Dedicated backend module for the Home FAQ section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { db } from "../../../../../lib/db/src";
import { faqTable } from "../../../../../lib/db/src/schema/faq";
import { asc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const faqs = await db
      .select({
        id: faqTable.id,
        question: faqTable.question,
        answer: faqTable.answer,
      })
      .from(faqTable)
      .where(eq(faqTable.isActive, true))
      .orderBy(asc(faqTable.order), asc(faqTable.id))
      .limit(20);
    
    res.json({
      success: true,
      items: faqs,
      data: faqs,
      total: faqs.length,
    });
  } catch (err) {
    console.error("Error fetching data for FAQ:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
