// @ts-nocheck
// ============================================================================
// FILE: Contact/SocialLinks/backend/index.ts
// PURPOSE: Express router for social links data.
// ============================================================================
import { Router } from "express";
import type { Request, Response } from "express";
import { SOCIAL_LINKS } from "../../_shared/constants";

const socialRouter = Router();
socialRouter.get("/", async (req: Request, res: Response) => {
  try { res.json({ success: true, data: SOCIAL_LINKS }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed." }); }
});
export default socialRouter;
