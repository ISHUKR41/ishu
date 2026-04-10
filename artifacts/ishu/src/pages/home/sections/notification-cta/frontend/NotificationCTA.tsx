// FILE: artifacts/ishu/src/pages/home/sections/notification-cta/frontend/NotificationCTA.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useListResultCategories, useSubscribeNotifications } from "../backend/api";
import styles from "./notification-cta.module.css";

export function NotificationCTA() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
  const { toast } = useToast();
  const subscribe = useSubscribeNotifications();
  const { data: categoryData, isLoading: categoriesLoading } = useListResultCategories();
  const categoryOptions = Array.isArray(categoryData) ? categoryData.slice(0, 10) : [];

  const toggleCategory = (slug: string) => {
    setSelectedCategories((previous) => {
      if (slug === "all") {
        return ["all"];
      }

      const withoutAll = previous.filter((item) => item !== "all");
      if (withoutAll.includes(slug)) {
        const next = withoutAll.filter((item) => item !== slug);
        return next.length > 0 ? next : ["all"];
      }

      return [...withoutAll, slug];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) {
      toast({ title: "Error", description: "Please provide both name and WhatsApp number.", variant: "destructive" });
      return;
    }

    const categories = selectedCategories.includes("all")
      ? ["all"]
      : selectedCategories;

    subscribe.mutate({ data: { whatsappNumber: phone, name, categories } }, {
      onSuccess: () => {
        toast({ title: "Subscribed!", description: "You'll now receive updates on WhatsApp." });
        setPhone("");
        setName("");
        setSelectedCategories(["all"]);
      },
      onError: () => {
        toast({ title: "Subscription failed", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.bgGradient} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={styles.card}
        >
          <div className={styles.glow} />
          <div className={styles.inner}>
            <div className={styles.leftCol}>
              <div className={styles.iconBox}><Phone size={24} /></div>
              <h2 className={styles.title}>Never Miss an Update</h2>
              <p className={styles.desc}>
                Get instant WhatsApp notifications for new job postings, exam results, admit cards, and important news directly on your phone.
              </p>
              <ul className={styles.featureList}>
                {["Instant alerts for new vacancies", "Direct links to exam results", "Daily educational news digest"].map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.rightCol}>
              <h3 className={styles.formTitle}>Subscribe Now</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
                <Input placeholder="WhatsApp Number (+91 9876543210)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />

                <div className={styles.categoryBlock}>
                  <p className={styles.categoryLabel}>Choose notification categories</p>
                  <div className={styles.categoryGrid}>
                    <button
                      type="button"
                      className={`${styles.categoryChip} ${selectedCategories.includes("all") ? styles.categoryChipActive : ""}`}
                      onClick={() => toggleCategory("all")}
                    >
                      All Updates
                    </button>

                    {categoryOptions.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={`${styles.categoryChip} ${selectedCategories.includes(category.slug) ? styles.categoryChipActive : ""}`}
                        onClick={() => toggleCategory(category.slug)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  {categoriesLoading && <p className={styles.categoryHint}>Loading live categories...</p>}
                </div>

                <Button type="submit" className={styles.submitBtn} disabled={subscribe.isPending}>
                  {subscribe.isPending ? "Subscribing..." : (<>Get WhatsApp Alerts <Send size={16} /></>)}
                </Button>
                <p className={styles.privacy}>We respect your privacy. No spam, ever.</p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
