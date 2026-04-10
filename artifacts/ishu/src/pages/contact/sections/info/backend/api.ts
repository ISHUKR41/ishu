// ============================================================================
// FILE: api.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for api.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

/**
 * Contact Info Section - Backend API Layer
 * Real contact information for ISHU platform.
 * Changes here do NOT affect any other section.
 */

export const contactInfo = {
  name: "Ishu Kumar",
  phone: "+91 8986985813",
  whatsapp: "+91 8986985813",
  email: "ishukryk@gmail.com",
  location: "India",
  whatsappLink: "https://wa.me/918986985813",
  socialLinks: {
    whatsapp: "https://wa.me/918986985813",
    email: "mailto:ishukryk@gmail.com",
    phone: "tel:+918986985813",
  },
  officeHours: "Monday - Saturday, 9:00 AM - 6:00 PM IST",
  responseTime: "Within 24 hours",
};
