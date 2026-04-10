// FILE: artifacts/ishu/src/pages/contact/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { PageMeta } from "@/components/layout/PageMeta";
import { ContactHero } from "./sections/hero/ContactHero";
import { ContactInfo } from "./sections/info/ContactInfo";
import { ContactForm } from "./sections/form/ContactForm";
import styles from "./contact.module.css";

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact Us - Ishu | WhatsApp, Phone, Email Support"
        description="Get in touch with Ishu - India's Premier Education Platform. Reach us via WhatsApp (+91 8986985813), email (ishukryk@gmail.com), or use our contact form."
        keywords="contact ishu, ishu support, ishu whatsapp, ishu email, education platform support india"
        canonical="https://ishu.in/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Ishu",
          description: "Contact Ishu - India's Premier Education & Tools Platform.",
          url: "https://ishu.in/contact",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8986985813",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        }}
      />
      <div className={styles.page}>
        <ContactHero />
        <div className={styles.body}>
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </>
  );
}
