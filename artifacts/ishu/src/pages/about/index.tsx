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
        title="About Ishu - Education, Results, Tools & News Platform"
        description="Learn about Ishu, an education platform for Indian students with government exam results, practical tools, learning resources, and career updates."
        keywords="about ishu, ishu education platform, india education platform, government exam results, ishu team, ishu mission"
        canonical="https://ishu.in/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ishu",
          url: "https://ishu.in",
          logo: "https://ishu.in/favicon.svg",
          description:
            "Education platform for Indian students with exam results, tools, resources, and career updates.",
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
