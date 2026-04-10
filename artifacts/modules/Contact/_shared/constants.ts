// ============================================================================
// FILE: artifacts/modules/Contact/_shared/constants.ts
// MODULE: Contact
// PURPOSE: Shared content/config constants used across Contact module sections.
//          These values are isolated at module level so section changes stay
//          local and predictable for large-team collaboration.
// ============================================================================

export const CONTACT_FAQS = [
  { question: "How long does it take for you to reply?", answer: "Usually within 24 hours." },
  { question: "What is your refund policy?", answer: "We offer a 30-day money back guarantee." },
  { question: "Do you offer bulk discounts?", answer: "Yes, please contact our sales team." },
];

export const CONTACT_SEO = {
  title: "Contact Us | ISHU",
  description: "Get in touch with the ISHU team for any queries or support.",
  openGraph: {
    title: "Contact Us | ISHU",
    description: "Get in touch with the ISHU team for any queries or support.",
    url: "https://ishu.in/contact",
  }
};

export const HERO_DATA = {
  title: "Get in Touch",
  subtitle: "We're here to help and answer any question you might have.",
};

export const CONTACT_INFO_CARDS = [
  { id: "1", title: "General Contact", description: "Talk to the ISHU team", email: "ishukryk@gmail.com", icon: "Phone" },
  { id: "2", title: "Support", description: "Get help with your account", email: "ishukryk@gmail.com", icon: "HelpCircle" },
  { id: "3", title: "Media", description: "Media and press inquiries", email: "ishukryk@gmail.com", icon: "Mic" },
];

export const CONTACT_CATEGORIES = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "sales", label: "Sales & Enterprise" },
  { value: "feedback", label: "Feedback & Suggestions" },
];

export const MESSAGE_MAX_LENGTH = 5000;

export const MAP_CENTER = { lat: 20.5937, lng: 78.9629 };
export const MAP_ZOOM = 5;
export const MAP_LOCATIONS = [
  { lat: 28.6139, lng: 77.2090, label: "New Delhi", description: "Our primary support hub." },
  { lat: 19.0760, lng: 72.8777, label: "Mumbai", description: "Content & Tech infrastructure." },
  { lat: 12.9716, lng: 77.5946, label: "Bengaluru", description: "Engineering & Innovation center." },
];

export const SOCIAL_LINKS = [
  { id: "1", platform: "Twitter", url: "https://twitter.com/ishu", followers: "50k+", iconName: "Twitter", brandColor: "#1DA1F2" },
  { id: "2", platform: "Instagram", url: "https://instagram.com/ishu", followers: "120k+", iconName: "Instagram", brandColor: "#E1306C" },
  { id: "3", platform: "LinkedIn", url: "https://linkedin.com/company/ishu", followers: "15k+", iconName: "Linkedin", brandColor: "#0077B5" },
  { id: "4", platform: "Facebook", url: "https://facebook.com/ishu", followers: "30k+", iconName: "Facebook", brandColor: "#1877F2" },
];
