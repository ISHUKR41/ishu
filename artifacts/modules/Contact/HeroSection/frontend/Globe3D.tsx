// @ts-nocheck
// ============================================================================
// FILE: Contact/HeroSection/frontend/Globe3D.tsx
// PURPOSE: A stunning 3D interactive rotating globe rendered using
//          React Three Fiber (@react-three/fiber) and Drei helpers.
//          This is the "showpiece" visual element of the Contact page hero,
//          inspired by the 3D web experiences of Lusion, Cuberto, and
//          Active Theory. The globe slowly rotates, has a glowing wireframe,
//          and floating connection dots to represent ISHU's pan-India reach.
// TECH: React Three Fiber (R3F), Drei, Three.js, GSAP
// ISOLATION: This component is ONLY used inside Contact/HeroSection.
//            It has zero dependencies on any other module.
// ============================================================================

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Inner 3D Scene Component — The actual globe mesh rendered inside the Canvas
// ---------------------------------------------------------------------------

/**
 * AnimatedGlobe renders a distorted sphere with a glowing wireframe effect.
 * It rotates slowly on the Y-axis to give a "living" feel.
 * The distortion creates an organic, fluid-like surface that catches light.
 */
function AnimatedGlobe() {
  // Reference to the mesh so we can animate rotation in the render loop
  const meshRef = useRef<THREE.Mesh>(null);

  // useFrame runs on every animation frame (60fps target)
  // We rotate the globe slowly around the Y-axis
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15; // Slow, smooth rotation
      meshRef.current.rotation.x += delta * 0.05; // Subtle tilt rotation
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={1}>
      {/* MeshDistortMaterial creates organic, fluid-like distortion */}
      <MeshDistortMaterial
        color="#4f46e5"           // Indigo base color (matches ISHU brand)
        attach="material"
        distort={0.3}             // Amount of vertex displacement
        speed={1.5}               // Speed of the distortion animation
        roughness={0.2}           // Low roughness = more reflective
        metalness={0.8}           // High metalness = metallic sheen
        wireframe={false}
      />
    </Sphere>
  );
}

// ---------------------------------------------------------------------------
// Floating Particles — Tiny dots orbiting the globe
// ---------------------------------------------------------------------------

/**
 * FloatingParticles creates a cloud of small dots that orbit around
 * the globe. These represent data connections / student queries
 * flowing to ISHU from across India.
 */
function FloatingParticles() {
  // Reference to the points object for rotation
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particle positions using useMemo for performance
  // useMemo ensures we only calculate positions ONCE, not every render
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3); // 200 particles, 3 coords each (x, y, z)
    for (let i = 0; i < 200; i++) {
      // Distribute particles in a spherical shell around the globe
      const theta = Math.random() * Math.PI * 2;        // Random angle around Y-axis
      const phi = Math.acos(2 * Math.random() - 1);     // Random angle from top to bottom
      const radius = 2.5 + Math.random() * 1.5;         // Random distance from center (2.5 to 4.0)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // X
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // Y
      positions[i * 3 + 2] = radius * Math.cos(phi);                    // Z
    }
    return positions;
  }, []); // Empty dependency array = compute only once

  // Rotate the particle cloud slowly in the opposite direction to the globe
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.08;
      pointsRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8"    // Lighter indigo for particles
        size={0.04}        // Small dot size
        transparent
        opacity={0.7}
        sizeAttenuation    // Dots get smaller when further from camera
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Glow Ring — A subtle ring around the globe's equator
// ---------------------------------------------------------------------------

/**
 * GlowRing renders a thin torus (donut shape) around the globe's equator.
 * This gives a "tech" feel reminiscent of UI elements seen on
 * Apple's spatial computing presentations and Stripe's dashboard visuals.
 */
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* args: [radius, tube-thickness, radial-segments, tubular-segments] */}
      <torusGeometry args={[2.2, 0.01, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Main Export: Globe3D — The complete 3D scene wrapped in a Canvas
// ---------------------------------------------------------------------------

/**
 * Globe3D is the top-level component that wraps the entire Three.js scene
 * inside a React Three Fiber <Canvas>. This is what gets imported by
 * the HeroSection/frontend/index.tsx component.
 *
 * Features:
 * - Interactive orbit controls (user can drag to rotate)
 * - Auto-rotating distorted sphere (organic, premium feel)
 * - Floating particle system (data flow visualization)
 * - Equatorial glow ring (futuristic tech aesthetic)
 * - Responsive sizing (fills its parent container)
 */
export default function Globe3D() {
  return (
    <Canvas
      // Camera positioned to show the globe from a slight angle
      camera={{ position: [0, 0, 6], fov: 45 }}
      // Performance: only render when something changes
      // dpr limits pixel ratio for performance on high-DPI screens
      dpr={[1, 2]}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent", // Transparent so the CSS gradient shows through
      }}
    >
      {/* Ambient light provides a base illumination for the entire scene */}
      <ambientLight intensity={0.3} />

      {/* Directional light simulates sunlight from upper-right */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" />

      {/* Point light adds a subtle purple glow from behind the globe */}
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#8b5cf6" />

      {/* The main 3D globe with organic distortion */}
      <AnimatedGlobe />

      {/* Floating particles orbiting the globe */}
      <FloatingParticles />

      {/* Equatorial glow ring */}
      <GlowRing />

      {/* OrbitControls let the user interact by dragging to rotate the view */}
      <OrbitControls
        enableZoom={false}        // Disable scroll zoom to prevent page hijacking
        enablePan={false}         // Disable panning
        autoRotate={false}        // We handle rotation manually in AnimatedGlobe
        maxPolarAngle={Math.PI}   // Allow full vertical rotation
        minPolarAngle={0}
      />
    </Canvas>
  );
}
