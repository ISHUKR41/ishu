// ============================================================================
// FILE: pages/tools/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const ToolsBackendConfig = {
  unit: "tools",
  apiEndpoint: "/api/pages/tools",
} as const;

export default ToolsBackendConfig;
