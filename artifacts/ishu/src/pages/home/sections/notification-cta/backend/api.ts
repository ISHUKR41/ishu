/**
 * Home Notification CTA Section - Backend API Layer
 * Isolated API hooks for the notification/WhatsApp subscription section.
 * Changes here do NOT affect any other section.
 */
export { useSubscribeNotifications } from "@workspace/api-client-react";

// WhatsApp notification categories available for subscription
export const notificationCategories = [
  { id: "all", label: "All Updates", description: "Receive all notifications" },
  { id: "upsc", label: "UPSC", description: "Civil Services, IAS, IPS exams" },
  { id: "ssc", label: "SSC", description: "CGL, CHSL, MTS exams" },
  { id: "banking", label: "Banking", description: "IBPS, SBI exams" },
  { id: "railway", label: "Railway", description: "RRB NTPC, Group D" },
  { id: "defence", label: "Defence", description: "NDA, CDS, AFCAT" },
  { id: "jee", label: "JEE", description: "JEE Main, JEE Advanced" },
  { id: "neet", label: "NEET", description: "NEET UG, NEET PG" },
  { id: "state-psc", label: "State PSC", description: "State-level PSC exams" },
  { id: "teaching", label: "Teaching", description: "CTET, TET, UGC NET" },
  { id: "police", label: "Police", description: "State Police, CRPF, BSF" },
] as const;
