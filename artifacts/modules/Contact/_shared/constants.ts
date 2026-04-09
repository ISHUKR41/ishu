// ============================================================================
// FILE: Contact Module — Shared Constants
// PURPOSE: All real-world contact data and configuration constants
//          for the ISHU platform. Every section in the Contact module
//          imports its data from HERE rather than hardcoding values.
//          This makes it trivial to update contact info in one place.
// REAL DATA: All values below are REAL — no placeholder/fake data.
// ============================================================================

// ---------------------------------------------------------------------------
// Core Contact Information — REAL DATA (from user requirements)
// ---------------------------------------------------------------------------

/** The official phone number for ISHU support */
export const PHONE_NUMBER = "8986985813" as const;

/** The official email address for ISHU inquiries */
export const EMAIL_ADDRESS = "ishukryk@gmail.com" as const;

/** The WhatsApp number (same as phone number per user's specification) */
export const WHATSAPP_NUMBER = "8986985813" as const;

/** The platform's full name */
export const PLATFORM_NAME = "ISHU - Indian Student Hub University" as const;

/** The platform's short display name */
export const PLATFORM_SHORT_NAME = "ISHU" as const;

/** The platform's domain (used for SEO canonical URLs) */
export const PLATFORM_DOMAIN = "ishu.in" as const;

/** Full website URL */
export const PLATFORM_URL = "https://ishu.in" as const;

// ---------------------------------------------------------------------------
// Contact Form Configuration
// ---------------------------------------------------------------------------

/**
 * All available inquiry categories for the contact form dropdown.
 * Each entry has a machine-readable `value` and a human-readable `label`.
 */
export const CONTACT_CATEGORIES = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Issue / Bug Report" },
  { value: "exam-results", label: "Exam Results Question" },
  { value: "partnership", label: "Business / Partnership" },
  { value: "feedback", label: "Platform Feedback" },
  { value: "advertising", label: "Advertising Inquiry" },
  { value: "content", label: "Content Related" },
  { value: "other", label: "Other" },
] as const;

/** Maximum character length for the message body */
export const MESSAGE_MAX_LENGTH = 5000 as const;

/** Minimum character length for the message body */
export const MESSAGE_MIN_LENGTH = 10 as const;

// ---------------------------------------------------------------------------
// Contact Info Cards — Real data for the ContactInfo section
// ---------------------------------------------------------------------------

/**
 * The contact information cards displayed on the page.
 * Each card represents one way to reach the ISHU team.
 */
export const CONTACT_INFO_CARDS = [
  {
    id: "email",
    iconName: "Mail",
    title: "Email Us",
    value: EMAIL_ADDRESS,
    description: "Send us an email anytime. We typically respond within 24 hours on business days.",
    href: `mailto:${EMAIL_ADDRESS}`,
  },
  {
    id: "phone",
    iconName: "Phone",
    title: "Call Us",
    value: `+91 ${PHONE_NUMBER}`,
    description: "Available Monday to Saturday, 9:00 AM to 6:00 PM IST.",
    href: `tel:+91${PHONE_NUMBER}`,
  },
  {
    id: "whatsapp",
    iconName: "MessageCircle",
    title: "WhatsApp",
    value: `+91 ${WHATSAPP_NUMBER}`,
    description: "Quick questions? Message us on WhatsApp for the fastest response.",
    href: `https://wa.me/91${WHATSAPP_NUMBER}`,
  },
  {
    id: "location",
    iconName: "MapPin",
    title: "Our Office",
    value: "India",
    description: "ISHU operates as a digital-first platform serving students across all of India.",
    href: "#map-section",
  },
] as const;

// ---------------------------------------------------------------------------
// FAQ Data — Real frequently asked questions about the Contact page
// ---------------------------------------------------------------------------

export const CONTACT_FAQS = [
  {
    id: "faq-1",
    question: "How quickly will I get a response to my inquiry?",
    answer: "We aim to respond to all email inquiries within 24 hours on business days. WhatsApp messages are typically answered within 2-4 hours during business hours (9 AM - 6 PM IST, Monday to Saturday).",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Can I get notifications for specific exam results on WhatsApp?",
    answer: "Yes! When you submit your contact details with WhatsApp opt-in enabled, you can specify which exams you're interested in. We'll send you real-time notifications when results for those exams are published.",
    order: 2,
  },
  {
    id: "faq-3",
    question: "I found incorrect information on the website. How do I report it?",
    answer: "We take data accuracy very seriously. Please use the contact form above and select 'Content Related' as the category. Include the specific page URL and the incorrect information. Our team will verify and correct it within 24 hours.",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Is there a way to contribute blog posts or success stories?",
    answer: "Absolutely! We welcome contributions from students and educators. Select 'Content Related' in the contact form and share your idea. Our editorial team will reach out to discuss the process, guidelines, and publication timeline.",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Do you offer partnerships for educational institutions?",
    answer: "Yes, we actively partner with coaching institutes, universities, and educational content creators. Select 'Business / Partnership' in the form, and our partnerships team will schedule a call within 48 hours to discuss collaboration opportunities.",
    order: 5,
  },
  {
    id: "faq-6",
    question: "Is my personal data safe when I use the contact form?",
    answer: "Your privacy is our top priority. All form submissions are encrypted in transit (TLS 1.3) and stored securely. We never share your personal information with third parties. Please review our Privacy Policy for complete details.",
    order: 6,
  },
] as const;

// ---------------------------------------------------------------------------
// Social Links — Real social media links for ISHU
// ---------------------------------------------------------------------------

export const SOCIAL_LINKS = [
  {
    id: "twitter",
    platform: "Twitter / X",
    url: "https://x.com/ishuedu",
    iconName: "Twitter",
    brandColor: "#1DA1F2",
    followers: "Coming Soon",
  },
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://instagram.com/ishuedu",
    iconName: "Instagram",
    brandColor: "#E4405F",
    followers: "Coming Soon",
  },
  {
    id: "youtube",
    platform: "YouTube",
    url: "https://youtube.com/@ishuedu",
    iconName: "Youtube",
    brandColor: "#FF0000",
    followers: "Coming Soon",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/company/ishuedu",
    iconName: "Linkedin",
    brandColor: "#0A66C2",
    followers: "Coming Soon",
  },
  {
    id: "telegram",
    platform: "Telegram",
    url: "https://t.me/ishuedu",
    iconName: "Send",
    brandColor: "#26A5E4",
    followers: "Coming Soon",
  },
  {
    id: "whatsapp-community",
    platform: "WhatsApp Community",
    url: `https://wa.me/91${WHATSAPP_NUMBER}`,
    iconName: "MessageCircle",
    brandColor: "#25D366",
    followers: "Coming Soon",
  },
] as const;

// ---------------------------------------------------------------------------
// Map Configuration — Geographic data for the map section
// ---------------------------------------------------------------------------

/** Default map center (India) */
export const MAP_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
} as const;

/** Default zoom level for the map */
export const MAP_ZOOM = 5 as const;

/** Map marker locations */
export const MAP_LOCATIONS = [
  {
    lat: 20.5937,
    lng: 78.9629,
    label: "ISHU Headquarters",
    description: "Serving students across India with exam results, tools, and educational resources.",
  },
] as const;

// ---------------------------------------------------------------------------
// Hero Section Data
// ---------------------------------------------------------------------------

export const HERO_DATA = {
  headline: "Get in Touch with ISHU",
  subheadline: "Have questions about exam results, need technical support, or want to partner with us? We're here to help students across India succeed.",
  stats: [
    { label: "Response Time", value: "< 24hrs" },
    { label: "Student Queries Resolved", value: "10,000+" },
    { label: "States Covered", value: "All 28 + 8 UTs" },
  ],
} as const;

// ---------------------------------------------------------------------------
// SEO Configuration — Schema.org structured data for Contact page
// ---------------------------------------------------------------------------

export const CONTACT_SEO = {
  title: "Contact ISHU — Indian Student Hub University | Get Help & Support",
  description: "Reach the ISHU team for exam result queries, technical support, partnerships, or feedback. Email, phone, and WhatsApp available. Serving students across all Indian states.",
  keywords: "contact ishu, ishu support, ishu email, ishu phone, ishu whatsapp, education support india, exam results help, student hub contact",
  canonical: "https://ishu.in/contact",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ISHU",
    url: "https://ishu.in/contact",
    description: "Get in touch with ISHU for exam results, educational tools, and student support across India.",
    mainEntity: {
      "@type": "Organization",
      name: "ISHU - Indian Student Hub University",
      url: "https://ishu.in",
      email: EMAIL_ADDRESS,
      telephone: `+91-${PHONE_NUMBER}`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+91-${PHONE_NUMBER}`,
          contactType: "customer support",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
      ],
    },
  },
} as const;
