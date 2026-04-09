// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/frontend/FormStep1.tsx
// PURPOSE: Step 1 of the multi-step contact form wizard — Personal Info.
//          Collects the user's name, email, and optional phone number.
//          Uses Framer Motion for smooth step transitions and CSS Modules
//          for scoped styling.
// TECH: React, Framer Motion, CSS Modules
// ISOLATION: This component ONLY renders the first step's fields.
//            It receives its state via props from the parent form.
// ============================================================================

import { motion } from "framer-motion";
import styles from "./styles.module.css";

// ---------------------------------------------------------------------------
// Props Interface
// ---------------------------------------------------------------------------

interface FormStep1Props {
  /** Current form values for this step */
  values: {
    fullName: string;
    email: string;
    phone: string;
  };

  /** Callback to update a specific field */
  onChange: (field: string, value: string) => void;

  /** Validation errors for each field (if any) */
  errors: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Step 1 Component: Personal Information
// ---------------------------------------------------------------------------

/**
 * FormStep1 renders the personal information fields:
 * - Full Name (required)
 * - Email Address (required)
 * - Phone Number (optional, for WhatsApp)
 *
 * The entire step is wrapped in a Framer Motion <motion.div> which
 * animates the entrance (slide in from right) and exit (slide out to left)
 * when the user navigates between steps.
 */
export default function FormStep1({ values, onChange, errors }: FormStep1Props) {
  return (
    <motion.div
      // Framer Motion animation variants for step transitions
      initial={{ x: 50, opacity: 0 }}      // Start off-screen right
      animate={{ x: 0, opacity: 1 }}        // Slide to center
      exit={{ x: -50, opacity: 0 }}          // Exit to left
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.fieldGroup}
    >
      {/* ---- Full Name Field ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-fullname" className={styles.label}>
          Full Name *
        </label>
        <input
          id="contact-fullname"
          type="text"
          className={styles.input}
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          autoComplete="name"
          required
          aria-describedby={errors.fullName ? "fullname-error" : undefined}
        />
        {/* Show validation error if present */}
        {errors.fullName && (
          <span id="fullname-error" className={styles.error} role="alert">
            {errors.fullName}
          </span>
        )}
      </div>

      {/* ---- Email Address Field ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-email" className={styles.label}>
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          className={styles.input}
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
          required
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.error} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* ---- Phone Number Field (Optional) ---- */}
      <div className={styles.field}>
        <label htmlFor="contact-phone" className={styles.label}>
          Phone Number (optional — for WhatsApp notifications)
        </label>
        <input
          id="contact-phone"
          type="tel"
          className={styles.input}
          placeholder="10-digit Indian mobile number"
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          autoComplete="tel"
          maxLength={10}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <span id="phone-error" className={styles.error} role="alert">
            {errors.phone}
          </span>
        )}
      </div>
    </motion.div>
  );
}
