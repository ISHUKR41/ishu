import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import styles from "./contact-form.module.css";
import { submitContactForm, type ContactFormData } from "./api";

interface ContactFormProps {
  className?: string;
}

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm({ className }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in Name, Email, and Message.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={`${styles.section} ${className ?? ""}`}>
        <motion.div
          className={styles.successBox}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.successIcon}>
            <CheckCircle size={28} />
          </div>
          <h2 className={styles.successTitle}>Message Sent!</h2>
          <p className={styles.successDesc}>
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            className={styles.resetBtn}
            onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
          >
            Send Another Message
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <p className={styles.title}>Send Us a Message</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-name" className={styles.label}>Full Name *</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-email" className={styles.label}>Email *</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-phone" className={styles.label}>Phone Number</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              className={styles.input}
              placeholder="+91 XXXXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-subject" className={styles.label}>Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              className={styles.input}
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-message" className={styles.label}>Message *</label>
          <textarea
            id="contact-message"
            name="message"
            className={styles.textarea}
            placeholder="Tell us how we can help you..."
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: "0.8rem" }}>{error}</p>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitting}
        >
          <Send size={16} />
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
