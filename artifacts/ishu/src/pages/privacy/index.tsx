import { PageMeta } from "@/components/layout/PageMeta";
import { PrivacyHero } from "./sections/hero/PrivacyHero";
import { PrivacyContent } from "./sections/content/PrivacyContent";
import styles from "./privacy.module.css";

export default function Privacy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy | Ishu - India's Education Platform"
        description="Learn how Ishu collects, uses, and protects your personal data. We are committed to your privacy and data security."
        keywords="ishu privacy policy, data protection, personal data, cookies policy"
        canonical="https://ishu.in/privacy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy | Ishu",
          url: "https://ishu.in/privacy",
          description: "Ishu Privacy Policy — how we collect, use, and protect your personal data.",
          publisher: {
            "@type": "Organization",
            name: "Ishu",
            url: "https://ishu.in",
          },
        }}
      />
      <div className={styles.page}>
        <PrivacyHero />
        <PrivacyContent />
      </div>
    </>
  );
}
