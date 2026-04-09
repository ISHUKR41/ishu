// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/backend/controller.ts
// PURPOSE: Business logic controller for processing contact form submissions.
//          Handles: Zod validation → Reference ID generation → WhatsApp
//          notification dispatch → Response to client.
//          In production, this would also store submissions in a database
//          and trigger email notifications via Nodemailer/SendGrid.
// TECH: Express.js, Zod, crypto (Node.js built-in)
// ISOLATION: This controller is ONLY used by the ContactForm router.
// ============================================================================

import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { contactFormSchema } from "./validation";
import { notifySupportTeam, sendUserConfirmation } from "./whatsapp";

/**
 * POST /api/modules/contact/form
 *
 * Processes a new contact form submission.
 *
 * Flow:
 * 1. Parse and validate the request body using Zod
 * 2. Generate a unique reference ID for tracking
 * 3. (Future) Store the submission in the database
 * 4. Send WhatsApp notification to support team
 * 5. Send WhatsApp confirmation to user (if opted in)
 * 6. Return success response with reference ID
 */
export async function submitContactForm(req: Request, res: Response) {
  try {
    // ---- Step 1: Validate the incoming data using Zod ----
    // safeParse returns { success: boolean, data?: T, error?: ZodError }
    // Unlike .parse(), it does NOT throw — we handle errors gracefully
    const validationResult = contactFormSchema.safeParse(req.body);

    // If validation fails, return detailed error messages
    if (!validationResult.success) {
      // Extract human-readable error messages from Zod's error format
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),   // e.g., "fullName", "email"
        message: err.message,         // e.g., "Name must be at least 2 characters"
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed. Please fix the highlighted errors.",
        errors,
      });
    }

    // ---- Step 2: Generate unique reference ID ----
    // Format: ISHU-XXXXXXXX (8 hex characters from a UUID)
    const referenceId = `ISHU-${randomUUID().slice(0, 8).toUpperCase()}`;

    // ---- Step 3: (Future) Database storage ----
    // TODO: Insert into contact_submissions table via Drizzle ORM
    // await db.insert(contactSubmissions).values({
    //   referenceId,
    //   ...validationResult.data,
    //   createdAt: new Date(),
    // });

    // For now, log the submission
    console.log(`[Contact Form] New submission - Ref: ${referenceId}`);
    console.log(`[Contact Form] From: ${validationResult.data.fullName} <${validationResult.data.email}>`);
    console.log(`[Contact Form] Subject: ${validationResult.data.subject}`);

    // ---- Step 4: Notify support team via WhatsApp ----
    await notifySupportTeam({
      fullName: validationResult.data.fullName,
      email: validationResult.data.email,
      subject: validationResult.data.subject,
      category: validationResult.data.category,
      referenceId,
    });

    // ---- Step 5: Send user confirmation (if WhatsApp opted in) ----
    if (validationResult.data.whatsappOptIn && validationResult.data.phone) {
      await sendUserConfirmation(validationResult.data.phone, referenceId);
    }

    // ---- Step 6: Return success response ----
    res.status(201).json({
      success: true,
      message: "Your message has been received! We'll get back to you within 24 hours.",
      referenceId,
    });
  } catch (error) {
    // Catch any unexpected errors
    console.error("[Contact Form] Unexpected error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
