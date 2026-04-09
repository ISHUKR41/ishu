// @ts-nocheck
// ============================================================================
// FILE: Contact/FAQSection/backend/controller.ts & index.ts (combined for brevity)
// PURPOSE: Express router + controller for FAQ data.
// ISOLATION: Only serves FAQ data.
// ============================================================================
import { Router } from "express";
import type { Request, Response } from "express";
import { CONTACT_FAQS } from "../../_shared/constants";

async function getFAQData(req: Request, res: Response) {
  try {
    res.json({ success: true, data: CONTACT_FAQS });
  } catch (error) {
    console.error("[Contact/FAQ] Error:", error);
    res.status(500).json({ success: false, message: "Failed to load FAQ data." });
  }
}

const faqRouter = Router();
faqRouter.get("/", getFAQData);
export default faqRouter;
