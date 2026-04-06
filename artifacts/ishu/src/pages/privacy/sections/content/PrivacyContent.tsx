import { motion } from "framer-motion";
import styles from "./privacy-content.module.css";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, including name, email address, WhatsApp number, and any other information you choose to provide when creating an account or contacting us.",
    ],
    list: [
      "Account registration data (name, email, password hash)",
      "WhatsApp number for notification subscriptions",
      "Contact form submissions",
      "Usage data and pages visited",
      "Device information and browser type",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalise your experience on Ishu.",
    ],
    list: [
      "Send exam result alerts and educational news via WhatsApp",
      "Respond to your comments, questions, and requests",
      "Analyse usage patterns to improve our platform",
      "Prevent fraudulent or abusive activity",
      "Send administrative notifications about service changes",
    ],
  },
  {
    title: "Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your data in the following limited circumstances:",
    ],
    list: [
      "With your consent or at your direction",
      "With service providers who assist us in operating our platform",
      "To comply with legal obligations or protect our rights",
      "In connection with a merger or acquisition of Ishu",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures including encryption in transit (HTTPS/TLS), hashed password storage (bcrypt), and regular security reviews to protect your personal information from unauthorised access, disclosure, alteration, or destruction.",
      "While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We encourage you to use a strong unique password for your Ishu account.",
    ],
    list: [],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "We use session cookies to keep you logged in and to remember your language preferences. We do not use advertising or third-party tracking cookies. You can control cookie settings in your browser.",
    ],
    list: [
      "Session cookies (required for login functionality)",
      "Language preference cookies",
      "We do not use Google Analytics or advertising cookies",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access, update, or delete your personal information. You can manage most of your data from your account settings page. For additional requests, contact us at the address below.",
    ],
    list: [
      "Access — request a copy of your personal data",
      "Correction — request correction of inaccurate data",
      "Deletion — request deletion of your account and data",
      "Portability — request your data in a portable format",
      "Opt-out — unsubscribe from WhatsApp alerts at any time",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Ishu is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately and we will delete it.",
    ],
    list: [],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of material changes by posting a notice on our website or by sending you an email. Your continued use of Ishu after the effective date of the revised policy constitutes your acceptance of the changes.",
    ],
    list: [],
  },
];

export function PrivacyContent() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            className={styles.block}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className={styles.sectionTitle}>{sec.title}</h2>
            {sec.content.map((p, j) => (
              <p key={j} className={styles.para}>{p}</p>
            ))}
            {sec.list.length > 0 && (
              <ul className={styles.list}>
                {sec.list.map((item, j) => (
                  <li key={j} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            )}
            {i < sections.length - 1 && <hr className={styles.divider} />}
          </motion.div>
        ))}

        <div className={styles.contactBox}>
          <p className={styles.contactTitle}>Questions about your privacy?</p>
          <p className={styles.contactText}>
            Contact us at <a href="mailto:privacy@ishu.in">privacy@ishu.in</a> or visit our{" "}
            <a href="/contact">Contact page</a>. We aim to respond within 72 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
