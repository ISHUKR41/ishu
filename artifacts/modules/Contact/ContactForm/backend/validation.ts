// ============================================================================
// FILE: Contact/ContactForm/backend/validation.ts
// PURPOSE: Zod schema definitions for server-side validation of the
//          contact form submission. These schemas are used by BOTH the
//          backend controller (server-side validation) and could be
//          shared with the frontend for client-side validation.
//          Zod provides runtime type-checking + TypeScript inference.
// TECH: Zod (schema validation library)
// ISOLATION: These schemas are ONLY for the Contact form.
// ============================================================================

import { z } from "zod";

// ---------------------------------------------------------------------------
// Contact Category Enum — validated list of allowed category values
// ---------------------------------------------------------------------------

/**
 * Zod enum for valid contact form categories.
 * Only these exact string values will pass validation.
 * Anything else (e.g., "hacking", "admin") will be rejected.
 */
export const contactCategorySchema = z.enum([
  "general",
  "technical",
  "exam-results",
  "partnership",
  "feedback",
  "advertising",
  "content",
  "other",
]);

// ---------------------------------------------------------------------------
// Full Contact Form Schema — validates the complete form submission
// ---------------------------------------------------------------------------

/**
 * Complete Zod schema for validating a contact form submission.
 * This runs on BOTH the frontend (before sending) and backend (after receiving).
 *
 * Validation rules:
 * - fullName: 2-100 characters, trimmed
 * - email: Valid email format
 * - phone: Optional, but if provided must be 10 digits (Indian mobile)
 * - category: Must be one of the predefined categories
 * - subject: 3-200 characters
 * - message: 10-5000 characters
 * - whatsappOptIn: Boolean flag
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal("")), // Allow empty string (optional field)

  category: contactCategorySchema,

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters long")
    .max(200, "Subject must not exceed 200 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(5000, "Message must not exceed 5000 characters"),

  whatsappOptIn: z
    .boolean()
    .default(false),
});

// ---------------------------------------------------------------------------
// Type Inference — Automatically derive TypeScript types from Zod schemas
// ---------------------------------------------------------------------------

/**
 * TypeScript type automatically inferred from the Zod schema.
 * This ensures that the frontend form state, backend handler, and
 * validation logic ALL use the exact same type definition.
 * No manual type definitions needed — Zod is the single source of truth.
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
