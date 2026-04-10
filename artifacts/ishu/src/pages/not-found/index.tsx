// FILE: artifacts/ishu/src/pages/not-found/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import styles from "./not-found.module.css";

const quickLinks = [
  { href: "/results", label: "Results" },
  { href: "/tools", label: "PDF Tools" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <PageMeta title="404 - Page Not Found | Ishu" description="The page you are looking for does not exist. Browse our exam results, PDF tools, news, and resources." />
      <div className={styles.page}>
        <div className={styles.grid} />
        <div className={styles.glowBlue} />
        <div className={styles.glowPurple} />

        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className={styles.errorCode}
            data-text="404"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            404
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link href="/" className={styles.primaryBtn}>
              <Home size={16} />
              Go Home
            </Link>
            <a onClick={() => window.history.back()} className={styles.secondaryBtn} style={{ cursor: "pointer" }}>
              <ArrowLeft size={16} />
              Go Back
            </a>
          </motion.div>

          <motion.div
            className={styles.quickLinks}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className={styles.quickLinksTitle}>Popular Pages</p>
            <div className={styles.links}>
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
