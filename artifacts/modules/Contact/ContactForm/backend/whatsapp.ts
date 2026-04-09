// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/backend/whatsapp.ts
// PURPOSE: WhatsApp Business API integration for sending automated
//          notifications to users when they opt in via the contact form.
//          This module handles the WhatsApp message dispatch logic.
//          In production, this would use the official WhatsApp Business API
//          or a third-party service like Twilio's WhatsApp API.
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

  /** The type of message ("text" for plain text) */
  type: "text";
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * WhatsApp Business API configuration.
 * In production, these values come from environment variables.
 * The API token and phone number ID are obtained from the
 * Meta Business Platform (https://business.facebook.com).
 */
const WHATSAPP_CONFIG = {
  // The ISHU support phone number (receives notifications)
  supportNumber: "918986985813",

  // API endpoint (would be configured via env vars in production)
  apiUrl: process.env.WHATSAPP_API_URL || "",

  // API bearer token (would be stored securely in env vars)
  apiToken: process.env.WHATSAPP_API_TOKEN || "",
};

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
    // If WhatsApp API is not configured, log and skip
    if (!WHATSAPP_CONFIG.apiToken) {
      console.log("[WhatsApp] API not configured. Skipping notification.");
      console.log("[WhatsApp] Would have sent:", JSON.stringify(formData, null, 2));
      return false;
    }

    // Compose the notification message for the support team
    const message: WhatsAppMessage = {
      to: WHATSAPP_CONFIG.supportNumber,
      type: "text",
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

    // Send via WhatsApp Business API
    const response = await fetch(WHATSAPP_CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_CONFIG.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: message.to,
        type: message.type,
        text: { body: message.body },
      }),
    });

    if (!response.ok) {
      console.error("[WhatsApp] API returned error:", response.status);
      return false;
    }

    console.log("[WhatsApp] Support team notified successfully.");
    return true;
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
    if (!WHATSAPP_CONFIG.apiToken || !phoneNumber) {
      console.log("[WhatsApp] Skipping user confirmation (not configured or no phone).");
      return false;
    }

    // Prepend country code if not present
    const fullNumber = phoneNumber.startsWith("91") ? phoneNumber : `91${phoneNumber}`;

    const response = await fetch(WHATSAPP_CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_CONFIG.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: fullNumber,
        type: "text",
        text: {
          body: [
            `✅ *Thank you for contacting ISHU!*`,
            ``,
            `Your inquiry has been received.`,
            `📋 Reference ID: ${referenceId}`,
            ``,
            `Our team will respond within 24 hours.`,
            ``,
            `— Team ISHU 🎓`,
          ].join("\n"),
        },
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("[WhatsApp] Failed to send user confirmation:", error);
    return false;
  }
}
