// @ts-nocheck
// ============================================================================
// FILE: NotFound/frontend/ParticleField.tsx
// PURPOSE: Three.js R3F particle system for the 404 page background.
//          Creates a field of floating particles that drift slowly,
//          giving the page a cosmic, immersive feel (like Immersive Garden
//          or Lusion's 404 pages). Particles gently move and the user
//          can interact by moving their mouse.
// TECH: React Three Fiber, Three.js, Drei
// ISOLATION: Only used on the 404 page.
// ============================================================================

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Particles Component — The floating dots inside the 3D canvas
// ---------------------------------------------------------------------------

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500; // Number of particles

  // Generate random positions for all particles (computed once)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;      // X: -10 to 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;  // Y: -10 to 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;  // Z: -10 to 10
    }
    return pos;
  }, []);

  // Animate particles — gentle drift upward with slow rotation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slowly rotate the entire particle cloud
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.01;

    // Make particles drift upward slightly
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * 0.05; // Move up slowly

      // Reset particles that drift too high — creates infinite loop effect
      if (posArray[i * 3 + 1] > 10) {
        posArray[i * 3 + 1] = -10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Main Export: ParticleField — The full canvas with particles
// ---------------------------------------------------------------------------

/**
 * ParticleField wraps the Three.js particle system in a Canvas.
 * Renders with a transparent background so the CSS gradient shows through.
 */
export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <Particles />
    </Canvas>
  );
}
