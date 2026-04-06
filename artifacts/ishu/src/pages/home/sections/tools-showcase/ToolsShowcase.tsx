import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, FileType, Image as ImageIcon, FileText, Settings, Wrench } from "lucide-react";
import styles from "./tools-showcase.module.css";

const tools = [
  { id: 1, title: "Merge PDF", description: "Combine multiple PDFs into one document.", icon: FileType, colorVar: "rgba(59,130,246,0.12)", iconColor: "#3b82f6", slug: "merge-pdf" },
  { id: 2, title: "Split PDF", description: "Extract pages from your PDF file.", icon: FileType, colorVar: "rgba(139,92,246,0.12)", iconColor: "#8b5cf6", slug: "split-pdf" },
  { id: 3, title: "Compress PDF", description: "Reduce file size while keeping quality.", icon: Settings, colorVar: "rgba(249,115,22,0.12)", iconColor: "#f97316", slug: "compress-pdf" },
  { id: 4, title: "PDF to Word", description: "Convert PDF to editable DOC/DOCX.", icon: FileText, colorVar: "rgba(16,185,129,0.12)", iconColor: "#10b981", slug: "pdf-to-word" },
  { id: 5, title: "PDF to Excel", description: "Pull data from PDF to spreadsheets.", icon: FileText, colorVar: "rgba(20,184,166,0.12)", iconColor: "#14b8a6", slug: "pdf-to-excel" },
  { id: 6, title: "Word to PDF", description: "Make DOC and DOCX files into PDFs.", icon: FileText, colorVar: "rgba(99,102,241,0.12)", iconColor: "#6366f1", slug: "word-to-pdf" },
  { id: 7, title: "JPG to PDF", description: "Convert JPG images to PDF format.", icon: ImageIcon, colorVar: "rgba(234,179,8,0.12)", iconColor: "#eab308", slug: "jpg-to-pdf" },
  { id: 8, title: "PDF to JPG", description: "Convert every PDF page into an image.", icon: ImageIcon, colorVar: "rgba(239,68,68,0.12)", iconColor: "#ef4444", slug: "pdf-to-jpg" },
];

export function ToolsShowcase() {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>
            <Wrench size={14} />
            100+ Free Tools
          </div>
          <h2 className={styles.sectionTitle}>Every Student Tool You Need</h2>
          <p className={styles.sectionDesc}>
            Free, fast and secure tools to help you prepare documents for government job applications. No sign-up required.
          </p>
        </div>

        <div className={styles.grid}>
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={`/tools/${tool.slug}`}
                className={styles.toolCard}
                style={{ "--tool-color": tool.colorVar } as React.CSSProperties}
              >
                <div className={styles.toolIconWrapper} style={{ background: tool.colorVar }}>
                  <tool.icon size={24} style={{ color: tool.iconColor }} />
                </div>
                <h3 className={styles.toolName}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/tools" className={styles.ctaBtn}>
            Explore All 100+ Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
