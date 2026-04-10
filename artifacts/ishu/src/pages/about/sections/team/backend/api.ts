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
 * About Team Section - Backend API Layer
 * Changes here do NOT affect any other section.
 */

export const teamData = {
  title: "Our Team",
  description: "A dedicated team of developers, educators, and technologists building India's best education platform.",
  members: [
    {
      name: "ISHU Team",
      role: "Founder & Lead Developer",
      description: "Passionate about making education accessible to every Indian student through technology.",
      avatar: "IT",
      color: "#3b82f6",
    },
  ],
};
