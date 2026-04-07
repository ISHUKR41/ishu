import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Bell, Calendar, ExternalLink, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSubscribeNotifications } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import styles from "./StateComingSoon.module.css";
import { useStateResults } from "../backend/useStateResults";

const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface StateComingSoonProps {
  stateName: string;
  stateCode: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing },
  },
};

export function StateComingSoon({ stateName, stateCode }: StateComingSoonProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { results, total, isLoading } = useStateResults(stateName);
  const subscribe = useSubscribeNotifications();

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: "Missing details", description: "Please enter your name and WhatsApp number.", variant: "destructive" });
      return;
    }

    subscribe.mutate(
      {
        data: {
          name: name.trim(),
          whatsappNumber: phone.trim(),
          categories: ["results", `state:${stateCode}`],
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Subscribed", description: `You will receive ${stateName} updates on WhatsApp.` });
          setName("");
          setPhone("");
        },
        onError: (error) => {
          toast({
            title: "Subscription failed",
            description: error instanceof Error ? error.message : "Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const formatDate = (value?: string | null): string => {
    if (!value) return "TBA";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "TBA";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const headingBadge = total > 0 ? `${total} live listings` : "No records yet";

  return (
    <div className={styles.container}>
      <div className={styles.gridBackground} />
      <div className={styles.glowEffect} />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.iconWrapper}>
          <MapPin className={styles.icon} size={48} />
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.title}>
          {stateName}
        </motion.h1>

        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.pulseDot} />
          {headingBadge}
        </motion.div>

        <motion.p variants={itemVariants} className={styles.description}>
          State-wise result updates, vacancy notifications, and key exam timelines for {stateName}. Listings are
          loaded from live backend data and updated as new records are published.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.features}>
          <div className={styles.feature}>
            <Calendar className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Latest Results</h3>
              <p className={styles.featureText}>Live status, exam date, and deadline visibility</p>
            </div>
          </div>
          <div className={styles.feature}>
            <Bell className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Notifications</h3>
              <p className={styles.featureText}>WhatsApp alerts for new state vacancies and updates</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.resultsPanel}>
          <h3 className={styles.resultsTitle}>Latest {stateName} Listings</h3>

          {isLoading && <p className={styles.resultsEmpty}>Loading state listings...</p>}

          {!isLoading && results.length === 0 && (
            <p className={styles.resultsEmpty}>
              No state-specific records are published yet. Subscribe below and we will notify you as soon as new
              listings are available.
            </p>
          )}

          {!isLoading && results.length > 0 && (
            <div className={styles.resultsGrid}>
              {results.slice(0, 8).map((item) => (
                <article key={item.id} className={styles.resultCard}>
                  <p className={styles.resultStatus}>{item.status.replaceAll("_", " ")}</p>
                  <h4 className={styles.resultName}>{item.title}</h4>
                  <p className={styles.resultMeta}>Exam: {formatDate(item.examDate)} | Last Date: {formatDate(item.lastDate)}</p>
                  {item.officialLink && (
                    <a className={styles.resultLink} href={item.officialLink} target="_blank" rel="noreferrer">
                      Official Link <ExternalLink size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className={styles.actions}>
          <Link href="/results" className={styles.backButton}>
            <ArrowLeft size={18} />
            Back to All Results
          </Link>
        </motion.div>

        <motion.form variants={itemVariants} className={styles.subscriptionForm} onSubmit={onSubscribe}>
          <h3 className={styles.formTitle}>Get {stateName} Alerts on WhatsApp</h3>
          <div className={styles.formRow}>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp number"
            />
          </div>
          <button className={styles.notifyButton} type="submit" disabled={subscribe.isPending}>
            <Bell size={18} />
            {subscribe.isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}
