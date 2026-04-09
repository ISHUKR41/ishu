// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactForm/frontend/index.tsx
// PURPOSE: Main orchestrator for the multi-step contact form wizard.
//          Manages form state, step navigation, client-side Zod validation,
//          and API submission. Composes the three step components
//          (FormStep1, FormStep2, FormStep3) with AnimatePresence for
//          smooth transitions between steps.
// TECH: React (useState), Framer Motion (AnimatePresence), Zod, Fetch API
// ISOLATION: This component is ONLY responsible for the form section.
//            It has zero knowledge of or impact on HeroSection, MapSection, etc.
// ============================================================================

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { contactFormSchema } from "../backend/validation";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import styles from "./styles.module.css";

// ---------------------------------------------------------------------------
// Initial form state
// ---------------------------------------------------------------------------

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  category: "",
  subject: "",
  message: "",
  whatsappOptIn: false,
};

// ---------------------------------------------------------------------------
// Main Export: ContactFormSection
// ---------------------------------------------------------------------------

/**
 * ContactFormSection is the complete multi-step form wizard.
 *
 * Steps:
 * 1. Personal Info (name, email, phone)
 * 2. Message Details (category, subject, message, WhatsApp opt-in)
 * 3. Confirmation (success message + reference ID)
 *
 * Features:
 * - Client-side Zod validation before submission
 * - Animated step transitions via Framer Motion AnimatePresence
 * - Visual step indicator showing progress
 * - Loading state during submission
 * - Error handling with specific field-level messages
 */
export default function ContactFormSection() {
  // ---------------------------------------------------------------------------
  // State Management
  // ---------------------------------------------------------------------------

  /** Current step in the wizard (1, 2, or 3) */
  const [currentStep, setCurrentStep] = useState<number>(1);

  /** Form field values */
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  /** Field-level validation errors */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Whether the form is currently submitting */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Backend response data (for step 3) */
  const [responseData, setResponseData] = useState<{
    message: string;
    referenceId: string;
  } | null>(null);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  /**
   * Updates a single form field value.
   * Connected to each step component's onChange prop.
   */
  const handleFieldChange = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field when user starts typing
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  /**
   * Validates step 1 fields and advances to step 2 if valid.
   */
  const handleNextStep = useCallback(() => {
    // Validate only step 1 fields
    const step1Errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      step1Errors.fullName = "Name must be at least 2 characters long";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      step1Errors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      step1Errors.phone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }

    setErrors({});
    setCurrentStep(2);
  }, [formData]);

  /**
   * Goes back to the previous step.
   */
  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  /**
   * Validates all fields via Zod and submits to the backend.
   */
  const handleSubmit = useCallback(async () => {
    // Run full Zod validation on the complete form data
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      // Map Zod errors to our field error state
      const zodErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        zodErrors[field] = err.message;
      });
      setErrors(zodErrors);
      return;
    }

    // All validation passed — submit to the backend
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/modules/contact/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const responseJson = await response.json();

      if (responseJson.success) {
        // Move to step 3 (confirmation)
        setResponseData({
          message: responseJson.message,
          referenceId: responseJson.referenceId || "",
        });
        setCurrentStep(3);
      } else {
        // Server returned validation errors
        if (responseJson.errors) {
          const serverErrors: Record<string, string> = {};
          responseJson.errors.forEach((err: any) => {
            serverErrors[err.field] = err.message;
          });
          setErrors(serverErrors);
        } else {
          setErrors({ _form: responseJson.message });
        }
      }
    } catch (error) {
      console.error("[ContactForm] Submission error:", error);
      setErrors({ _form: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  /**
   * Resets the form to its initial state (for "Send Another" button).
   */
  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setResponseData(null);
    setCurrentStep(1);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className={styles.section} id="contact-form" aria-label="Contact form">
      <div className={styles.sectionInner}>
        {/* Section heading */}
        <h2 className={styles.sectionTitle}>Send Us a Message</h2>
        <p className={styles.sectionSubtitle}>
          Fill out the form below and we'll get back to you within 24 hours.
        </p>

        {/* Step indicator dots */}
        <div className={styles.stepIndicator}>
          {[
            { num: 1, label: "Personal Info" },
            { num: 2, label: "Message" },
            { num: 3, label: "Done" },
          ].map((step, i) => (
            <div key={step.num} className={styles.step}>
              {/* Connecting line between steps */}
              {i > 0 && (
                <div className={`${styles.stepLine} ${currentStep > i ? styles.active : ""}`} />
              )}
              {/* Step circle */}
              <div
                className={`${styles.stepCircle} ${
                  currentStep === step.num ? styles.active :
                  currentStep > step.num ? styles.completed : ""
                }`}
              >
                {currentStep > step.num ? "✓" : step.num}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Form card with animated step content */}
        <div className={styles.formCard}>
          {/* Global form error */}
          {errors._form && (
            <div style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              background: "hsla(0, 80%, 50%, 0.1)",
              border: "1px solid hsla(0, 80%, 50%, 0.3)",
              color: "#ef4444",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}>
              {errors._form}
            </div>
          )}

          {/* AnimatePresence enables exit animations when switching steps */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <FormStep1
                key="step-1"
                values={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <FormStep2
                key="step-2"
                values={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && responseData && (
              <FormStep3
                key="step-3"
                message={responseData.message}
                referenceId={responseData.referenceId}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>

          {/* Navigation buttons (only shown on steps 1 and 2) */}
          {currentStep < 3 && (
            <div className={styles.buttonRow}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handlePrevStep}
                >
                  ← Back
                </button>
              ) : (
                <div /> /* Spacer */
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleNextStep}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message ✉️"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
