// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

const SITE_CONTACT = {
  name: process.env.SITE_CONTACT_NAME || "Ishu Kumar",
  phone: process.env.SITE_CONTACT_PHONE || "+91 8986985813",
  whatsapp: process.env.SITE_CONTACT_WHATSAPP || "+91 8986985813",
  email: process.env.SITE_CONTACT_EMAIL || "ishukryk@gmail.com",
  location: process.env.SITE_CONTACT_LOCATION || "India",
};

// Mounted in routes/index.ts at /contact, so this resolves to /api/contact/info.
router.get("/info", (_req, res): void => {
  const whatsappDigits = SITE_CONTACT.whatsapp.replace(/\D/g, "");

  res.json({
    ...SITE_CONTACT,
    whatsappLink: `https://wa.me/${whatsappDigits}`,
    socialLinks: {
      whatsapp: `https://wa.me/${whatsappDigits}`,
      email: `mailto:${SITE_CONTACT.email}`,
      phone: `tel:${SITE_CONTACT.phone.replace(/\s+/g, "")}`,
    },
    officeHours: "Monday - Saturday, 9:00 AM - 6:00 PM IST",
    responseTime: "Within 24 hours",
  });
});

async function handleContactSubmission(req, res): Promise<void> {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [contact] = await db.insert(contactsTable).values(parsed.data).returning();

  res.status(201).json({
    message: "Message sent successfully. We will get back to you soon!",
    id: contact.id,
  });
}

router.post("/", handleContactSubmission);

// Keep this alias so existing frontend modules using /api/contact/submit
// continue to work without breaking during migration.
router.post("/submit", handleContactSubmission);

export default router;
