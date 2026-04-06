import { PageMeta } from "@/components/layout/PageMeta";
import { TermsHero } from "./sections/hero/TermsHero";
import { TermsContent } from "./sections/content/TermsContent";
import styles from "./terms.module.css";

export default function Terms() {
  return (
    <>
      <PageMeta
        title="Terms of Service | Ishu - India's Education Platform"
        description="Read the terms and conditions governing your use of Ishu — India's premier education, results, tools and news platform."
        keywords="ishu terms of service, terms and conditions, user agreement, legal"
        canonical="https://ishu.in/terms"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service | Ishu",
          url: "https://ishu.in/terms",
          description: "Terms of Service for Ishu — India's premier education, results, tools and news platform.",
          publisher: {
            "@type": "Organization",
            name: "Ishu",
            url: "https://ishu.in",
          },
        }}
      />
      <div className={styles.page}>
        <TermsHero />
        <TermsContent />
      </div>
    </>
  );
}
