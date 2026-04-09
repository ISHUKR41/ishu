// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/frontend/FormStep3.tsx
// PURPOSE: Step 3 of the multi-step contact form — Confirmation.
//          Shows a success message with the reference ID after the
//          form has been successfully submitted to the backend.
//          Includes a checkmark animation via Framer Motion.
// TECH: React, Framer Motion, Lucide React (professional icons)
// ISOLATION: This component ONLY renders the confirmation screen.
// ============================================================================

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./styles.module.css";

// ---------------------------------------------------------------------------
// Props Interface
// ---------------------------------------------------------------------------

interface FormStep3Props {
  /** The response message from the backend */
  message: string;

  /** The unique reference ID for tracking the inquiry */
  referenceId: string;

  /** Callback to reset the form and submit another inquiry */
  onReset: () => void;
}

// ---------------------------------------------------------------------------
// Step 3 Component: Confirmation
// ---------------------------------------------------------------------------

/**
 * FormStep3 renders the post-submission confirmation screen.
 * It shows:
 * - An animated checkmark icon (Framer Motion scale-in)
 * - The success message from the backend
 * - The reference ID for tracking
 * - A button to submit another inquiry
 *
 * This step ONLY appears after the backend returns a successful response.
 */
export default function FormStep3({ message, referenceId, onReset }: FormStep3Props) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.confirmationCard}
    >
      {/* Animated checkmark icon */}
      <motion.div
        className={styles.confirmationIcon}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
      >
        {/* CheckCircle from Lucide React — professional, not AI-generated */}
        <CheckCircle size={40} color="#ffffff" strokeWidth={2.5} />
      </motion.div>

      {/* Success title */}
      <h3 className={styles.confirmationTitle}>Message Sent!</h3>

      {/* Backend response message */}
      <p className={styles.confirmationMessage}>{message}</p>

      {/* Reference ID for tracking */}
      {referenceId && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ color: "hsl(230 20% 55%)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            Your Reference ID:
          </p>
          <span className={styles.referenceId}>{referenceId}</span>
        </div>
      )}

      {/* Reset button — allows submitting another form */}
      <button className={styles.btnPrimary} onClick={onReset} type="button">
        Send Another Message
      </button>
    </motion.div>
  );
}
