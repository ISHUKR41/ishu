import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Twitter, Instagram, Youtube } from "lucide-react";
import styles from "./contact-info.module.css";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 8986985813",
    href: "tel:+918986985813",
    iconColor: "#4ade80",
    iconBg: "rgba(34,197,94,0.15)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Direct",
    value: "Chat on WhatsApp",
    href: "https://wa.me/918986985813",
    iconColor: "#4ade80",
    iconBg: "rgba(34,197,94,0.15)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ishukryk@gmail.com",
    href: "mailto:ishukryk@gmail.com",
    iconColor: "#60a5fa",
    iconBg: "rgba(59,130,246,0.15)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
    iconColor: "#fb923c",
    iconBg: "rgba(249,115,22,0.15)",
  },
];

const SOCIAL_LINKS = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/ishu" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/ishu" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/ishu" },
];

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <p className={styles.title}>Get in Touch</p>
      <div className={styles.list}>
        {CONTACT_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            className={styles.item}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={styles.iconBox}
              style={{ background: item.iconBg }}
            >
              <item.icon size={18} style={{ color: item.iconColor }} />
            </div>
            <div>
              <p className={styles.label}>{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className={styles.value}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <span className={styles.value}>{item.value}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.socialRow}>
        <p className={styles.socialTitle}>Follow Us</p>
        <div className={styles.socialLinks}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <s.icon size={14} />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
