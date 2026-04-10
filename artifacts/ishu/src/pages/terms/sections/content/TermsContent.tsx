// FILE: artifacts/ishu/src/pages/terms/sections/content/TermsContent.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import styles from "./terms-content.module.css";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Ishu (ishu.in), you agree to be bound by these Terms of Service and all applicable laws and regulations of India. If you do not agree with any part of these terms, you may not use our platform.",
      "These terms apply to all visitors, users, and others who access or use Ishu, including the website, mobile versions, and any related services.",
    ],
    list: [],
  },
  {
    title: "Use of the Platform",
    content: [
      "Ishu provides free access to educational resources, government exam results, PDF tools, news, and career guidance. You agree to use the platform only for lawful purposes.",
    ],
    list: [
      "Do not upload or distribute harmful, illegal, or misleading content",
      "Do not attempt to gain unauthorised access to our systems",
      "Do not scrape or automate requests to our platform without written permission",
      "Do not impersonate any person or entity",
      "Do not use the platform for commercial spam or solicitation",
    ],
  },
  {
    title: "User Accounts",
    content: [
      "When you create an account with Ishu, you are responsible for maintaining the security of your account credentials. You must notify us immediately if you suspect unauthorised use of your account.",
    ],
    list: [
      "You must be at least 13 years of age to create an account",
      "You are responsible for all activity that occurs under your account",
      "You must provide accurate and current account information",
      "We reserve the right to suspend accounts that violate these terms",
    ],
  },
  {
    title: "PDF Tools & File Processing",
    content: [
      "Our free PDF tools process your files server-side to provide the requested output. Files uploaded for processing are automatically deleted from our servers within 1 hour of processing.",
      "We do not store or share the content of your uploaded files. All file transfers occur over encrypted HTTPS connections.",
    ],
    list: [],
  },
  {
    title: "Intellectual Property",
    content: [
      "The Ishu platform, including its design, code, logos, and original content, is owned by Ishu and protected by applicable intellectual property laws.",
      "Government exam results, official notifications, and syllabus documents are the property of their respective government bodies and are shared for informational purposes under fair use principles.",
    ],
    list: [],
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      "Ishu is provided 'as is' without warranties of any kind, express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses.",
      "Exam result information is aggregated from official government sources. We strive for accuracy but recommend verifying critical information on official government websites.",
    ],
    list: [],
  },
  {
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Ishu shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.",
      "Our total liability for any claim arising from use of Ishu shall not exceed ₹1,000 (Indian Rupees One Thousand).",
    ],
    list: [],
  },
  {
    title: "WhatsApp Notifications",
    content: [
      "By subscribing to WhatsApp notifications, you consent to receive automated messages about exam results, job alerts, and educational updates. You can unsubscribe at any time by contacting us. Message frequency varies based on your selected categories.",
    ],
    list: [],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.",
    ],
    list: [],
  },
  {
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting an updated version on this page with a revised 'Last updated' date. Continued use of Ishu after changes constitutes acceptance of the revised Terms.",
    ],
    list: [],
  },
];

export function TermsContent() {
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
          <p className={styles.contactTitle}>Questions about these Terms?</p>
          <p className={styles.contactText}>
            Contact us at <a href="mailto:legal@ishu.in">legal@ishu.in</a> or visit our{" "}
            <a href="/contact">Contact page</a>. We respond within 3 business days.
          </p>
        </div>
      </div>
    </section>
  );
}
