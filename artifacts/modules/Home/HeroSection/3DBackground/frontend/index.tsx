// ============================================================================
// FILE: Home/HeroSection/3DBackground/frontend/index.tsx
// PURPOSE: Lightweight animated background layer for the hero section.
// ============================================================================

export default function Background3DFrontend() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -right-12 top-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
    </div>
  );
}
