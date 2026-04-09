// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/backend/index.ts
// PURPOSE: Express router for the Contact form API endpoint.
//          Mounted at /api/modules/contact/form in the main server.
//          Handles POST requests for new form submissions.
// TECH: Express.js Router
// ISOLATION: This router handles ONLY form submission endpoints.
// ============================================================================

import { Router } from "express";
import { submitContactForm } from "./controller";

// Create a dedicated Express router for the contact form
const formRouter = Router();

// ---------------------------------------------------------------------------
// Route: POST /api/modules/contact/form
// Description: Accepts a new contact form submission
// Body: { fullName, email, phone?, category, subject, message, whatsappOptIn }
// Response: { success, message, referenceId? }
// ---------------------------------------------------------------------------
formRouter.post("/", submitContactForm);

export default formRouter;
