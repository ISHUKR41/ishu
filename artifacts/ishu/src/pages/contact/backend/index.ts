// ============================================================================
// FILE: pages/contact/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const ContactBackendConfig = {
  unit: "contact",
  apiEndpoint: "/api/pages/contact",
} as const;

export default ContactBackendConfig;
