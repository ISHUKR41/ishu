// @ts-nocheck
// ============================================================================
// FILE: Contact/backend/index.ts — Contact Module Backend Aggregator
// PURPOSE: Aggregates all Contact section routers into a single router
//          that can be mounted in the main Express server.
//          Each section's backend operates independently; this file
//          simply wires them together under /api/modules/contact/*.
// TECH: Express.js Router
// ISOLATION: This aggregator only imports from Contact sub-modules.
// ============================================================================

import { Router } from "express";
import heroRouter from "../HeroSection/backend/index";
import formRouter from "../ContactForm/backend/index";
import infoRouter from "../ContactInfo/backend/index";
import mapRouter from "../MapSection/backend/index";
import faqRouter from "../FAQSection/backend/index";
import socialRouter from "../SocialLinks/backend/index";

// Create the top-level Contact module router
const contactModuleRouter = Router();

// ---------------------------------------------------------------------------
// Mount each section's router under its own sub-path
// ---------------------------------------------------------------------------

/** GET /api/modules/contact/hero — Hero section data */
contactModuleRouter.use("/hero", heroRouter);

/** POST /api/modules/contact/form — Form submission */
contactModuleRouter.use("/form", formRouter);

/** GET /api/modules/contact/info — Contact info cards */
contactModuleRouter.use("/info", infoRouter);

/** GET /api/modules/contact/map — Map location data */
contactModuleRouter.use("/map", mapRouter);

/** GET /api/modules/contact/faq — FAQ data */
contactModuleRouter.use("/faq", faqRouter);

/** GET /api/modules/contact/social — Social links data */
contactModuleRouter.use("/social", socialRouter);

export default contactModuleRouter;
