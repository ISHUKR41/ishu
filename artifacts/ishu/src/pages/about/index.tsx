import { PageMeta } from "@/components/layout/PageMeta";
import { AboutHero } from "./sections/hero/AboutHero";
import { AboutStats } from "./sections/stats/AboutStats";
import { AboutValues } from "./sections/values/AboutValues";
import { AboutTeam } from "./sections/team/AboutTeam";
import styles from "./about.module.css";

export default function About() {
  return (
    <>
      <PageMeta
        title="About Ishu - India's Premier Education & Tools Platform"
        description="Learn about Ishu - India's #1 Education, Government Results, Tools & News Platform empowering 10M+ students across India with free tools, exam results, and career guidance."
        keywords="about ishu, ishu education platform, india education platform, government exam results, ishu team, ishu mission"
        canonical="https://ishu.in/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ishu",
          url: "https://ishu.in",
          logo: "https://ishu.in/favicon.svg",
          description:
            "India's Premier Education, Government Results, Tools & News Platform empowering millions of students.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8986985813",
            contactType: "customer service",
            areaServed: "IN",
          },
          sameAs: [
            "https://twitter.com/ishu",
            "https://instagram.com/ishu",
            "https://youtube.com/ishu",
          ],
        }}
      />
      <div className={styles.page}>
        <AboutHero />
        <AboutStats />
        <AboutValues />
        <AboutTeam />
      </div>
    </>
  );
}
