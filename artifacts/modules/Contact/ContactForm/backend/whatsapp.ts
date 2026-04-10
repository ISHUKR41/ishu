// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/backend/whatsapp.ts
// PURPOSE: WhatsApp Business API integration for sending automated
//          notifications to users when they opt in via the contact form.
//          This module handles the WhatsApp message dispatch logic.
//          Uses real provider APIs (Meta WhatsApp Cloud API or Twilio)
//          based on runtime environment configuration.
// TECH: Node.js (fetch API), WhatsApp Business API
// ISOLATION: This module is ONLY used by the ContactForm backend.
// ============================================================================

// ---------------------------------------------------------------------------
// WhatsApp Message Interface
// ---------------------------------------------------------------------------

interface WhatsAppMessage {
  /** The recipient's phone number in international format (e.g., "918986985813") */
  to: string;
  /** The message text to send */
  body: string;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SUPPORT_NUMBER = (process.env.CONTACT_SUPPORT_WHATSAPP || "918986985813").replace(/\D/g, "");

const META_WHATSAPP_CONFIG = {
  apiUrl: (process.env.WHATSAPP_API_URL || "").trim(),
  apiToken: (process.env.WHATSAPP_API_TOKEN || "").trim(),
};

const TWILIO_WHATSAPP_CONFIG = {
  accountSid: (process.env.TWILIO_ACCOUNT_SID || "").trim(),
  authToken: (process.env.TWILIO_AUTH_TOKEN || "").trim(),
  from: (process.env.TWILIO_WHATSAPP_FROM || "").trim(),
};

let providerMissingWarningLogged = false;

function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    return "";
  }

  if (digits.startsWith("91") && digits.length >= 12) {
    return digits;
  }

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

function hasMetaProvider(): boolean {
  return Boolean(META_WHATSAPP_CONFIG.apiUrl && META_WHATSAPP_CONFIG.apiToken);
}

function hasTwilioProvider(): boolean {
  return Boolean(
    TWILIO_WHATSAPP_CONFIG.accountSid &&
      TWILIO_WHATSAPP_CONFIG.authToken &&
      TWILIO_WHATSAPP_CONFIG.from,
  );
}

async function sendViaMeta(message: WhatsAppMessage): Promise<boolean> {
  const response = await fetch(META_WHATSAPP_CONFIG.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${META_WHATSAPP_CONFIG.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: message.to,
      type: "text",
      text: { body: message.body },
    }),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("[WhatsApp][Meta] Send failed", {
      status: response.status,
      body: responseBody,
    });
    return false;
  }

  return true;
}

async function sendViaTwilio(message: WhatsAppMessage): Promise<boolean> {
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_WHATSAPP_CONFIG.accountSid}/Messages.json`;
  const credentials = Buffer.from(
    `${TWILIO_WHATSAPP_CONFIG.accountSid}:${TWILIO_WHATSAPP_CONFIG.authToken}`,
  ).toString("base64");

  const payload = new URLSearchParams({
    From: TWILIO_WHATSAPP_CONFIG.from,
    To: `whatsapp:+${message.to}`,
    Body: message.body,
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("[WhatsApp][Twilio] Send failed", {
      status: response.status,
      body: responseBody,
    });
    return false;
  }

  return true;
}

async function sendWhatsApp(message: WhatsAppMessage): Promise<boolean> {
  if (hasMetaProvider()) {
    return sendViaMeta(message);
  }

  if (hasTwilioProvider()) {
    return sendViaTwilio(message);
  }

  if (!providerMissingWarningLogged) {
    providerMissingWarningLogged = true;
    console.warn(
      "[WhatsApp] No provider configured. Set Meta (WHATSAPP_API_URL + WHATSAPP_API_TOKEN) or Twilio (TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_WHATSAPP_FROM).",
    );
  }

  return false;
}

// ---------------------------------------------------------------------------
// Public Functions
// ---------------------------------------------------------------------------

/**
 * Sends a WhatsApp notification to the ISHU support team when a new
 * contact form submission is received. This alerts the team immediately
 * so they can respond quickly.
 *
 * @param formData - The submitted form data (name, email, subject, message)
 * @returns True if message was sent successfully, false otherwise
 */
export async function notifySupportTeam(formData: {
  fullName: string;
  email: string;
  subject: string;
  category: string;
  referenceId: string;
}): Promise<boolean> {
  try {
    // Compose the notification message for the support team
    const message: WhatsAppMessage = {
      to: SUPPORT_NUMBER,
      body: [
        `🔔 *New Contact Form Submission*`,
        ``,
        `📝 *Reference:* ${formData.referenceId}`,
        `👤 *Name:* ${formData.fullName}`,
        `📧 *Email:* ${formData.email}`,
        `🏷️ *Category:* ${formData.category}`,
        `📋 *Subject:* ${formData.subject}`,
        ``,
        `View full details in the ISHU Admin Panel.`,
      ].join("\n"),
    };

    return sendWhatsApp(message);
  } catch (error) {
    // WhatsApp notification failure should NOT block the form submission
    // We log the error but return false (non-critical failure)
    console.error("[WhatsApp] Failed to send notification:", error);
    return false;
  }
}

/**
 * Sends a confirmation message to the user who submitted the form,
 * IF they opted in to WhatsApp notifications.
 *
 * @param phoneNumber - The user's phone number (10 digits)
 * @param referenceId - The submission reference ID
 * @returns True if sent successfully, false otherwise
 */
export async function sendUserConfirmation(
  phoneNumber: string,
  referenceId: string
): Promise<boolean> {
  try {
    if (!phoneNumber) {
      return false;
    }

    const normalizedNumber = normalizeIndianPhone(phoneNumber);
    if (!normalizedNumber) {
      return false;
    }

    const message: WhatsAppMessage = {
      to: normalizedNumber,
      body: [
        `✅ *Thank you for contacting ISHU!*`,
        ``,
        `Your inquiry has been received.`,
        `📋 Reference ID: ${referenceId}`,
        ``,
        `Our team will respond within 24 hours.`,
      ].join("\n"),
    };

    return sendWhatsApp(message);
  } catch (error) {
    console.error("[WhatsApp] Failed to send user confirmation:", error);
    return false;
  }
}
