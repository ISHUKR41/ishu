// ============================================================================
// FILE: Contact Module — Shared TypeScript Interfaces
// PURPOSE: Centralized type definitions for the Contact module.
//          Every section (HeroSection, ContactForm, ContactInfo, etc.)
//          imports types from HERE instead of defining their own.
//          This ensures type-safety across frontend ↔ backend boundaries
//          while keeping all Contact types in ONE place.
// ISOLATION: These types are ONLY used within the Contact module.
//            No other module (Home, Results, News, etc.) should ever import
//            from this file. This prevents cross-module type leakage.
// ============================================================================

// ---------------------------------------------------------------------------
// Section 1: Contact Form — Request & Response shapes
// ---------------------------------------------------------------------------

/**
 * The shape of data submitted from the multi-step contact form (frontend → backend).
 * Each field maps to a specific step in the multi-step form wizard.
 */
export interface ContactFormSubmission {
  /** Step 1: User's full name (required) */
  fullName: string;

  /** Step 1: User's email address for reply (required) */
  email: string;

  /** Step 1: User's phone number (optional, for WhatsApp follow-up) */
  phone?: string;

  /** Step 2: The broad category of the inquiry */
  category: ContactCategory;

  /** Step 2: Subject line summarizing the inquiry */
  subject: string;

  /** Step 2: The full message body from the user */
  message: string;

  /** Step 2: Whether the user consents to WhatsApp notifications */
  whatsappOptIn: boolean;
}

/**
 * The backend's response after processing a contact form submission.
 * Returned as JSON from POST /api/modules/contact/form.
 */
export interface ContactFormResponse {
  /** Whether the submission was saved and email dispatched successfully */
  success: boolean;

  /** A human-readable status message to display to the user */
  message: string;

  /** A unique reference ID so the user can track their inquiry */
  referenceId?: string;
}

/**
 * All possible categories a user can choose from when submitting a contact form.
 * These map to real inquiry types relevant to the ISHU platform.
 */
export type ContactCategory =
  | "general"           // General inquiry
  | "technical"         // Technical issue / bug report
  | "exam-results"      // Question about exam results
  | "partnership"       // Business / partnership inquiry
  | "feedback"          // Platform feedback
  | "advertising"       // Advertising inquiry
  | "content"           // Content-related inquiry
  | "other";            // Anything else

// ---------------------------------------------------------------------------
// Section 2: Contact Info — Card data shapes
// ---------------------------------------------------------------------------

/**
 * Represents a single contact information card displayed on the page.
 * Each card shows one method of reaching the ISHU team.
 */
export interface ContactInfoCard {
  /** Unique identifier for this card */
  id: string;

  /** The Lucide React icon name to render (e.g., "Mail", "Phone", "MapPin") */
  iconName: string;

  /** The card's title (e.g., "Email Us", "Call Us") */
  title: string;

  /** The actual contact value (e.g., "ishukryk@gmail.com") */
  value: string;

  /** A short description of when to use this contact method */
  description: string;

  /** The clickable link (e.g., "mailto:ishukryk@gmail.com") */
  href: string;
}

// ---------------------------------------------------------------------------
// Section 3: FAQ — Question & Answer shapes
// ---------------------------------------------------------------------------

/**
 * Represents a single frequently asked question with its answer.
 * Used by the FAQSection accordion component.
 */
export interface FAQItem {
  /** Unique identifier */
  id: string;

  /** The question text displayed in the accordion header */
  question: string;

  /** The answer text revealed when the accordion expands */
  answer: string;

  /** Sort order (lower numbers appear first) */
  order: number;
}

// ---------------------------------------------------------------------------
// Section 4: Social Links — Social media platform shapes
// ---------------------------------------------------------------------------

/**
 * Represents a single social media link displayed in the SocialLinks section.
 */
export interface SocialLink {
  /** Unique identifier */
  id: string;

  /** Platform name (e.g., "Twitter", "Instagram") */
  platform: string;

  /** The full URL to the social profile */
  url: string;

  /** The Lucide React or React Icons icon identifier */
  iconName: string;

  /** Hex color associated with this social platform */
  brandColor: string;

  /** Follower count or subscriber count to display */
  followers?: string;
}

// ---------------------------------------------------------------------------
// Section 5: Map — Geographic location shapes
// ---------------------------------------------------------------------------

/**
 * Represents a geographic location marker on the interactive map.
 */
export interface MapLocation {
  /** Latitude coordinate */
  lat: number;

  /** Longitude coordinate */
  lng: number;

  /** Display label for the marker */
  label: string;

  /** Additional description shown in the marker popup */
  description: string;
}

// ---------------------------------------------------------------------------
// Section 6: Hero — Hero section data shapes
// ---------------------------------------------------------------------------

/**
 * Data structure for the Contact page hero section.
 * Fetched from the backend to allow dynamic content updates.
 */
export interface ContactHeroData {
  /** The main headline text */
  headline: string;

  /** The supporting subheadline text */
  subheadline: string;

  /** Floating stats displayed alongside the 3D globe */
  stats: {
    label: string;
    value: string;
  }[];
}
