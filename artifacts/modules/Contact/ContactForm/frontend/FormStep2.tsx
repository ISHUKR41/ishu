// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/frontend/FormStep2.tsx
// PURPOSE: Step 2 of the multi-step contact form — Message Details.
//          Collects the inquiry category, subject, message body,
//          and WhatsApp opt-in preference.
// TECH: React, Framer Motion, CSS Modules
// ISOLATION: This component ONLY renders step 2 fields.
// ============================================================================

import { motion } from "framer-motion";
import { CONTACT_CATEGORIES, MESSAGE_MAX_LENGTH } from "../../_shared/constants";
import styles from "./styles.module.css";

// ---------------------------------------------------------------------------
// Props Interface
// ---------------------------------------------------------------------------

interface FormStep2Props {
  /** Current form values for this step */
  values: {
    category: string;
    subject: string;
    message: string;
    whatsappOptIn: boolean;
  };

  /** Callback to update a specific field */
  onChange: (field: string, value: string | boolean) => void;

  /** Validation errors for each field (if any) */
  errors: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Step 2 Component: Message Details
// ---------------------------------------------------------------------------

/**
 * FormStep2 renders the message detail fields:
 * - Category dropdown (required)
 * - Subject line (required)
 * - Message body textarea (required, max 5000 chars)
 * - WhatsApp opt-in checkbox (optional)
 */
export default function FormStep2({ values, onChange, errors }: FormStep2Props) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.fieldGroup}
    >
      {/* ---- Category Dropdown ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-category" className={styles.label}>
          Inquiry Category *
        </label>
        <select
          id="contact-category"
          className={styles.select}
          value={values.category}
          onChange={(e) => onChange("category", e.target.value)}
          required
        >
          <option value="">Select a category...</option>
          {/* Render all categories from our constants file */}
          {CONTACT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles.error} role="alert">{errors.category}</span>
        )}
      </div>

      {/* ---- Subject Line ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-subject" className={styles.label}>
          Subject *
        </label>
        <input
          id="contact-subject"
          type="text"
          className={styles.input}
          placeholder="Briefly describe your inquiry"
          value={values.subject}
          onChange={(e) => onChange("subject", e.target.value)}
          required
        />
        {errors.subject && (
          <span className={styles.error} role="alert">{errors.subject}</span>
        )}
      </div>

      {/* ---- Message Body ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Your Message * ({values.message.length}/{MESSAGE_MAX_LENGTH} characters)
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          placeholder="Tell us more about your inquiry..."
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          maxLength={MESSAGE_MAX_LENGTH}
          required
        />
        {errors.message && (
          <span className={styles.error} role="alert">{errors.message}</span>
        )}
      </div>

      {/* ---- WhatsApp Opt-In Checkbox ---- */}
      <div
        className={styles.checkboxRow}
        onClick={() => onChange("whatsappOptIn", !values.whatsappOptIn)}
      >
        <input
          id="contact-whatsapp"
          type="checkbox"
          className={styles.checkbox}
          checked={values.whatsappOptIn}
          onChange={(e) => onChange("whatsappOptIn", e.target.checked)}
        />
        <label htmlFor="contact-whatsapp" className={styles.checkboxLabel}>
          I'd like to receive updates and confirmations via WhatsApp
        </label>
      </div>
    </motion.div>
  );
}
