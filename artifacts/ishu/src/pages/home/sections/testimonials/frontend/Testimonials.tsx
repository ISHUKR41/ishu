// ============================================================================
// FILE: pages/home/sections/testimonials/frontend/Testimonials.tsx
// PURPOSE: Displays real home highlight cards fetched from the backend API.
//          Previously used hardcoded data imported from backend/api.ts.
//          Now fetches dynamically from /api/home/sections/testimonials.
//
// ROOT CAUSE FIX: Replaced static import of fake testimonial data with
//                 a proper React Query hook that fetches from the API.
//
// TECH STACK:
//   - React 18 (hooks, state management)
//   - Framer Motion (scroll-triggered card animations)
//   - React Query via useQuery (server-state caching)
//   - Lucide React (Star icon — professional, not AI-generated)
//   - CSS Modules (scoped styling via testimonials.module.css)
//
// ISOLATION: This component is 100% self-contained. It only depends on
//            its own CSS module and the shared UI skeleton component.
//            It can be developed and tested independently.
// ============================================================================

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./testimonials.module.css";

/**
 * Shape of a single highlight card from the backend API.
 * Matches the response from GET /api/home/sections/testimonials.
 */
interface Testimonial {
  /** Unique identifier for the testimonial */
  id: number;
  /** Student's full name */
  name: string;
  /** Their exam qualification or student status */
  role: string;
  /** City and state in India */
  location: string;
  /** The actual review text */
  content: string;
  /** Star rating from 1 to 5 */
  rating?: number;
  /** Two-letter initials for the avatar circle */
  avatar: string;
  /** Hex color code for the avatar accent */
  color: string;
}

/**
 * Testimonials — Displays real platform highlights.
 *
 * WHAT IT DOES:
 * 1. Fetches real highlight cards from GET /api/home/sections/testimonials
 * 2. Displays them in a responsive grid with Framer Motion animations
 * 3. Shows skeleton placeholders while loading
 * 4. Each card has star ratings, review text, and student info
 *
 * WHY REACT QUERY: Caches the response, deduplicates requests, and
 * provides automatic loading/error states without manual useState.
 */
export function Testimonials() {
  const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  // Fetch testimonials from the dedicated backend endpoint
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["home", "testimonials"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/home/sections/testimonials`);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json();
    },
    // Cache for 10 minutes since testimonials don't change often
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header with icon label */}
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <Star size={14} />
            Verified Highlights
          </div>
          <h2 className={styles.sectionTitle}>Latest Real Updates from the Platform</h2>
          <p className={styles.sectionDesc}>
            No demo entries here — every card is generated from real results, news, and blog records.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className={styles.grid}>
          {isLoading ? (
            // Show 6 skeleton placeholders while data is loading
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={styles.card}>
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            // Render real testimonials with scroll-triggered animations
            testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={styles.card}
              >
                {typeof t.rating === "number" && t.rating > 0 && (
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className={styles.star} />
                    ))}
                  </div>
                )}

                {/* Review text with decorative opening quote */}
                <p className={styles.quote}>
                  <span className={styles.quoteChar}>&ldquo;</span>
                  {t.content}
                </p>

                {/* Student info: avatar, name, role, location */}
                <div className={styles.author}>
                  <div
                    className={styles.avatar}
                    style={{ background: `${t.color}20`, color: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                    <div className={styles.authorLocation}>{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
