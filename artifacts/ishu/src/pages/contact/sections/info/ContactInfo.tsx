// FILE: artifacts/ishu/src/pages/contact/sections/info/ContactInfo.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import styles from "./contact-info.module.css";

interface ContactInfoPayload {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  whatsappLink: string;
}

function normalizeContactInfo(raw: unknown): ContactInfoPayload | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const candidate = raw as Record<string, unknown>;
  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  const phone = typeof candidate.phone === "string" ? candidate.phone.trim() : "";
  const whatsapp = typeof candidate.whatsapp === "string" ? candidate.whatsapp.trim() : "";
  const email = typeof candidate.email === "string" ? candidate.email.trim() : "";
  const location = typeof candidate.location === "string" ? candidate.location.trim() : "";
  const whatsappLink =
    typeof candidate.whatsappLink === "string" ? candidate.whatsappLink.trim() : "";

  if (!phone || !whatsapp || !email) {
    return null;
  }

  return {
    name: name || "Ishu Team",
    phone,
    whatsapp,
    email,
    location: location || "India",
    whatsappLink:
      whatsappLink || `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
  };
}

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  const { data, isLoading, isError } = useQuery<ContactInfoPayload>({
    queryKey: ["contact", "info"],
    queryFn: async () => {
      const response = await fetch("/api/contact/info", { credentials: "include" });
      if (!response.ok) {
        throw new Error(`Contact info request failed: ${response.status}`);
      }

      const json = await response.json();
      const normalized = normalizeContactInfo(json);
      if (!normalized) {
        throw new Error("Invalid contact payload");
      }

      return normalized;
    },
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const contact = data ?? null;

  if (isLoading) {
    return (
      <section className={`${styles.section} ${className ?? ""}`}>
        <p className={styles.title}>Get in Touch</p>
        <div className={styles.list}>
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
        </div>
      </section>
    );
  }

  if (isError || !contact) {
    return (
      <section className={`${styles.section} ${className ?? ""}`}>
        <p className={styles.title}>Get in Touch</p>
        <p className={styles.statusMessage}>
          Contact details are temporarily unavailable. Please refresh in a moment.
        </p>
      </section>
    );
  }

  const CONTACT_ITEMS = [
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
      iconColor: "#4ade80",
      iconBg: "rgba(34,197,94,0.15)",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Direct",
      value: "Chat on WhatsApp",
      href: contact.whatsappLink,
      iconColor: "#4ade80",
      iconBg: "rgba(34,197,94,0.15)",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      iconColor: "#60a5fa",
      iconBg: "rgba(59,130,246,0.15)",
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location,
      href: null,
      iconColor: "#fb923c",
      iconBg: "rgba(249,115,22,0.15)",
    },
  ];

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

    </section>
  );
}
